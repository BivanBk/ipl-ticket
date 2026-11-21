function Hero({ selectedMatch }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">Official Ticket Portal</span>
        <h1>Experience IPL 2026 Live in the Stadium</h1>
        <p>
          Browse upcoming fixtures, filter by your favorite franchise, and
          reserve your seats instantly.
        </p>

        {selectedMatch ? (
          <div className="hero-selection-pill">
            Currently Selected: <strong>{selectedMatch.teams}</strong> ({selectedMatch.venue})
          </div>
        ) : (
          <a href="#schedule" className="hero-btn">
            Explore Matches
          </a>
        )}
      </div>
    </section>
  );
}

export default Hero;