function MatchCard({ match, isSelected, onSelectMatch }) {
  return (
    <article className={`match-card ${isSelected ? "selected-card" : ""}`}>
      <div>
        <div className="match-badge">{match.badge}</div>
        <h3>{match.teams}</h3>
        <p className="venue">{match.venue}</p>
        <p className="date-time">{match.dateTime}</p>
        <p className="price-tag">
          Tickets from <strong>₹{match.startingPrice.toLocaleString("en-IN")}</strong>
        </p>
      </div>

      <button
        type="button"
        className={`card-cta ${isSelected ? "selected-btn" : ""}`}
        onClick={() => onSelectMatch(match)}
      >
        {isSelected ? "Selected ✓" : "Select Match"}
      </button>
    </article>
  );
}

export default MatchCard;