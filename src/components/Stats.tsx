const stats = [
  { value: "50,000+", label: "Consultations Completed" },
  { value: "500+", label: "Verified Doctors" },
  { value: "200+", label: "Villages Served" },
  { value: "4.9", label: "Patient Rating" },
];

const Stats = () => {
  return (
    <section className="py-16 md:py-24 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary-foreground mb-2">
                {stat.value}
              </div>
              <div className="text-primary-foreground/80 text-sm sm:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
