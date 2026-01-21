-- Create enum for appointment status
CREATE TYPE public.appointment_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');

-- Create enum for consultation type
CREATE TYPE public.consultation_type AS ENUM ('scheduled', 'emergency');

-- Create profiles table for all users
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  is_doctor BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create doctors table for doctor-specific info
CREATE TABLE public.doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  specialization TEXT NOT NULL,
  qualification TEXT NOT NULL,
  qualification_document_url TEXT,
  experience_years INTEGER DEFAULT 0,
  consultation_fee DECIMAL(10,2) DEFAULT 0,
  bio TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  is_accepting_emergency BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create doctor availability slots
CREATE TABLE public.doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status appointment_status DEFAULT 'pending' NOT NULL,
  consultation_type consultation_type DEFAULT 'scheduled' NOT NULL,
  symptoms TEXT,
  notes TEXT,
  room_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create emergency requests table
CREATE TABLE public.emergency_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES public.doctors(id),
  symptoms TEXT NOT NULL,
  urgency_level INTEGER DEFAULT 5 CHECK (urgency_level >= 1 AND urgency_level <= 10),
  status TEXT DEFAULT 'pending' NOT NULL,
  room_id TEXT,
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_requests ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Doctors policies
CREATE POLICY "Anyone can view doctors" ON public.doctors FOR SELECT USING (true);
CREATE POLICY "Doctors can update own info" ON public.doctors FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can register as doctor" ON public.doctors FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Doctor availability policies
CREATE POLICY "Anyone can view availability" ON public.doctor_availability FOR SELECT USING (true);
CREATE POLICY "Doctors can manage own availability" ON public.doctor_availability FOR INSERT 
  WITH CHECK (EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()));
CREATE POLICY "Doctors can update own availability" ON public.doctor_availability FOR UPDATE 
  USING (EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()));
CREATE POLICY "Doctors can delete own availability" ON public.doctor_availability FOR DELETE 
  USING (EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()));

-- Appointments policies
CREATE POLICY "Patients can view own appointments" ON public.appointments FOR SELECT 
  USING (auth.uid() = patient_id OR EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()));
CREATE POLICY "Patients can create appointments" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Involved parties can update appointments" ON public.appointments FOR UPDATE 
  USING (auth.uid() = patient_id OR EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()));

-- Emergency requests policies
CREATE POLICY "Patients can view own emergency requests" ON public.emergency_requests FOR SELECT 
  USING (auth.uid() = patient_id OR EXISTS (SELECT 1 FROM public.doctors WHERE id = doctor_id AND user_id = auth.uid()) OR doctor_id IS NULL);
CREATE POLICY "Patients can create emergency requests" ON public.emergency_requests FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Doctors and patients can update emergency requests" ON public.emergency_requests FOR UPDATE 
  USING (auth.uid() = patient_id OR EXISTS (SELECT 1 FROM public.doctors WHERE user_id = auth.uid()));

-- Enable realtime for appointments and emergency requests
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.emergency_requests;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_doctors_updated_at BEFORE UPDATE ON public.doctors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();