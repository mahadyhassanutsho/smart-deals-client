const Hero = () => {
  return (
    <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/30 via-secondary/20 to-accent/20 text-base-content shadow-lg p-10 md:p-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight drop-shadow-sm">
          Smart Deals
        </h1>
        <p className="mt-5 text-lg md:text-xl opacity-80">
          Bid. Win. Save.
          <br />
          Discover premium products and compete for the best prices.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="btn btn-primary btn-wide text-primary-content">
            Start Bidding
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
