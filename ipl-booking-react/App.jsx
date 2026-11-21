import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import { MATCHES_DATA } from "./data/matches";
import "./App.css";

const TEAMS = ["ALL", "RCB", "CSK", "MI", "KKR", "SRH", "RR"];

function App() {
  // State for team filter, selected match object, and ticket quantity
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Filter matches based on active team button
  const filteredMatches =
    selectedTeam === "ALL"
      ? MATCHES_DATA
      : MATCHES_DATA.filter((match) => match.teamCodes.includes(selectedTeam));

  const totalPrice = selectedMatch ? selectedMatch.startingPrice * quantity : 0;

  return (
    <div className="app">
      <Navbar />
      <Hero selectedMatch={selectedMatch} />

      <main className="main-wrapper">
        {/* Match Schedule Section */}
        <section id="schedule" className="section">
          <div className="section-header">
            <div>
              <h2>Upcoming Match Schedule</h2>
              <p className="subtitle">
                Rendered dynamically by mapping over match data into MatchCard components
              </p>
            </div>
          </div>

          {/* Team Filter Buttons */}
          <div className="filter-bar">
            {TEAMS.map((team) => (
              <button
                key={team}
                className={`filter-btn ${selectedTeam === team ? "active" : ""}`}
                onClick={() => setSelectedTeam(team)}
              >
                {team === "ALL" ? "All Teams" : team}
              </button>
            ))}
          </div>

          {/* Mapping over filteredMatches to render reusable MatchCard components */}
          <div className="match-grid">
            {filteredMatches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={selectedMatch?.id === match.id}
                onSelectMatch={setSelectedMatch}
              />
            ))}
          </div>
        </section>

        {/* Live State Summary Preview */}
        <section id="booking" className="section">
          <div className="summary-card">
            <h2>Live Selection Summary</h2>
            {selectedMatch ? (
              <>
                <div className="summary-row">
                  <span>Match:</span>
                  <strong>{selectedMatch.teams}</strong>
                </div>
                <div className="summary-row">
                  <span>Venue:</span>
                  <strong>{selectedMatch.venue}</strong>
                </div>
                <div className="summary-row">
                  <span>Base Ticket Price:</span>
                  <strong>₹{selectedMatch.startingPrice.toLocaleString("en-IN")}</strong>
                </div>
                <div className="summary-row">
                  <label htmlFor="qtyInput">Quantity (1–10):</label>
                  <input
                    id="qtyInput"
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.min(10, Math.max(1, Number(e.target.value) || 1)))
                    }
                  />
                </div>
                <div className="summary-total">
                  <span>Estimated Total:</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </>
            ) : (
              <p className="subtitle">
                Click <strong>Select Match</strong> on any card above to update React state.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;