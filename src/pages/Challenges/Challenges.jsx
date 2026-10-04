import { useEffect, useState } from "react";
import "./Challenges.css";

import SpaceBackground from "../../shared/SpaceBackground/SpaceBackground";
import "../../shared/SpaceBackground/SpaceBackground.css";

import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

const challenges = [
  {
    id: 1,
    level: "01",
    title: "ARRAY ROOKIE",
    subtitle: "ARRAY BASICS",
    difficulty: "BASIC",
    xp: 50,
    icon: "🟢",
    description:
      "Enter the Arrayverse and prove that you understand the fundamentals of arrays.",
  },
  {
    id: 2,
    level: "02",
    title: "INDEX HUNTER",
    subtitle: "INDEX & POSITION",
    difficulty: "EASY",
    xp: 75,
    icon: "🔵",
    description:
      "Track down the correct index and master the relationship between position and data.",
  },
  {
    id: 3,
    level: "03",
    title: "MEMORY RUNNER",
    subtitle: "MEMORY REPRESENTATION",
    difficulty: "EASY",
    xp: 100,
    icon: "🟣",
    description:
      "Navigate through memory blocks and understand how array elements are stored.",
  },
  {
    id: 4,
    level: "04",
    title: "OPERATION MASTER",
    subtitle: "INSERT • DELETE • UPDATE",
    difficulty: "MEDIUM",
    xp: 150,
    icon: "🟡",
    description:
      "Control the array using core operations and make every modification count.",
  },
  {
    id: 5,
    level: "05",
    title: "SEARCH COMMANDER",
    subtitle: "SEARCHING",
    difficulty: "MEDIUM",
    xp: 175,
    icon: "🔴",
    description:
      "Locate hidden elements and prove your understanding of array searching.",
  },
  {
    id: 6,
    level: "06",
    title: "SORT WARRIOR",
    subtitle: "SORTING",
    difficulty: "HARD",
    xp: 200,
    icon: "🟠",
    description:
      "Rearrange chaotic data and master the logic behind array sorting.",
  },
  {
    id: 7,
    level: "07",
    title: "2D MATRIX",
    subtitle: "TWO-DIMENSIONAL ARRAYS",
    difficulty: "HARD",
    xp: 250,
    icon: "⚡",
    description:
      "Enter the matrix and solve challenges involving rows, columns and 2D arrays.",
  },
  {
    id: 8,
    level: "08",
    title: "ARRAY MASTER",
    subtitle: "FINAL BOSS",
    difficulty: "BOSS",
    xp: 500,
    icon: "👑",
    description:
      "The ultimate Arrayverse challenge. Combine everything you have learned.",
  },
];

function Challenges() {
  const [completedCount, setCompletedCount] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  useEffect(() => {
    const completedLevels = challenges.filter(
      (challenge) =>
        localStorage.getItem(`challenge${challenge.id}Completed`) === "true"
    );

    setCompletedCount(completedLevels.length);

    const earnedXp = completedLevels.reduce(
      (total, challenge) => total + challenge.xp,
      0
    );

    setTotalXp(earnedXp);
  }, []);

  const isCompleted = (id) => {
    return (
      localStorage.getItem(`challenge${id}Completed`) === "true"
    );
  };

  const isUnlocked = (id) => {
    if (id === 1) return true;

    return isCompleted(id - 1);
  };

  const getRank = () => {
    if (completedCount >= 8) return "ARRAY MASTER";
    if (completedCount >= 6) return "SORT WARRIOR";
    if (completedCount >= 4) return "ALGORITHM RUNNER";
    if (completedCount >= 2) return "INDEX EXPLORER";

    return "ROOKIE";
  };

  const startChallenge = (id) => {
    if (id >= 1 && id <= 8) {
      window.location.href = `${basePath}/challenges/level-${String(
        id
      ).padStart(2, "0")}`;

      return;
    }

    alert("This mission is coming soon.");
  };

  const progressPercent =
    (completedCount / challenges.length) * 100;

  return (
    <div className="challenges-page">
      <SpaceBackground />

      <div className="challenges-content">
        <Navbar />

        <main className="challenge-main">

          {/* HERO */}
          <section className="challenge-hero">
            <div className="challenge-eyebrow">
              ARRAYVERSE // CHALLENGE ARENA
            </div>

            <h1>
              PROVE YOUR
              <span> ARRAY LOGIC.</span>
            </h1>

            <p>
              Complete missions, earn XP and rise through the Arrayverse.
              Every challenge tests how well you understand arrays.
            </p>

            <div className="challenge-status-row">

              <div className="challenge-stat">
                <span className="stat-label">PROGRESS</span>

                <strong>
                  {completedCount} / {challenges.length}
                </strong>
              </div>

              <div className="challenge-stat">
                <span className="stat-label">TOTAL XP</span>

                <strong>
                  {totalXp} XP
                </strong>
              </div>

              <div className="challenge-stat">
                <span className="stat-label">RANK</span>

                <strong>
                  {getRank()}
                </strong>
              </div>

            </div>
          </section>

          {/* PROGRESS */}
          <section className="challenge-progress">

            <div className="progress-header">
              <div>
                <span>MISSION PROGRESS</span>

                <strong>
                  ARRAYVERSE TRAINING SEQUENCE
                </strong>
              </div>

              <b>
                {Math.round(progressPercent)}%
              </b>
            </div>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${progressPercent}%`,
                }}
              ></div>
            </div>

          </section>

          {/* CHALLENGES */}
          <section className="challenge-section">

            <div className="section-heading">
              <div>
                <span>SELECT YOUR MISSION</span>
                <h2>CHALLENGE ARENA</h2>
              </div>

              <div className="arena-line"></div>
            </div>

            <div className="challenge-grid">

              {challenges.map((challenge) => {

                const completed = isCompleted(challenge.id);
                const unlocked = isUnlocked(challenge.id);

                return (
                  <article
                    className={`challenge-card ${
                      !unlocked
                        ? "challenge-locked"
                        : completed
                        ? "challenge-completed"
                        : "challenge-unlocked"
                    }`}
                    key={challenge.id}
                  >

                    <div className="card-top">

                      <span className="challenge-level">
                        LVL {challenge.level}
                      </span>

                      <span className="challenge-icon">
                        {completed ? "⭐" : challenge.icon}
                      </span>

                    </div>

                    <div className="card-body">

                      <span className="challenge-subtitle">
                        {challenge.subtitle}
                      </span>

                      <h3>
                        {challenge.title}
                      </h3>

                      <p>
                        {challenge.description}
                      </p>

                    </div>

                    <div className="card-meta">

                      <span
                        className={`difficulty difficulty-${challenge.difficulty.toLowerCase()}`}
                      >
                        {challenge.difficulty}
                      </span>

                      <span className="xp-reward">
                        +{challenge.xp} XP
                      </span>

                    </div>

                    <button
                      className="challenge-button"
                      type="button"
                      disabled={!unlocked}
                      onClick={() =>
                        startChallenge(challenge.id)
                      }
                    >
                      {!unlocked
                        ? "🔒 LOCKED"
                        : completed
                        ? "✓ COMPLETED"
                        : "START CHALLENGE →"}
                    </button>

                    {completed && (
                      <div className="completion-badge">
                        MISSION CLEAR
                      </div>
                    )}

                    <div className="card-scanline"></div>

                  </article>
                );
              })}

            </div>
          </section>

          {/* RULES */}
          <section className="challenge-rules">

            <div className="rules-heading">
              <span>
                ARRAYVERSE // MISSION PROTOCOL
              </span>

              <h2>
                HOW THE ARENA WORKS
              </h2>
            </div>

            <div className="rules-grid">

              <div className="rule-item">
                <span>01</span>

                <div>
                  <strong>ENTER</strong>
                  <p>
                    Choose an unlocked challenge.
                  </p>
                </div>
              </div>

              <div className="rule-item">
                <span>02</span>

                <div>
                  <strong>SOLVE</strong>
                  <p>
                    Analyze the array and select the correct answer.
                  </p>
                </div>
              </div>

              <div className="rule-item">
                <span>03</span>

                <div>
                  <strong>EARN XP</strong>
                  <p>
                    Correct answers reward XP and unlock new levels.
                  </p>
                </div>
              </div>

              <div className="rule-item">
                <span>04</span>

                <div>
                  <strong>MASTER</strong>
                  <p>
                    Reach the final boss and become an Array Master.
                  </p>
                </div>
              </div>

            </div>
          </section>

          <Footer />

        </main>
      </div>
    </div>
  );
}

export default Challenges;