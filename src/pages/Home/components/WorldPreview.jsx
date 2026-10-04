function WorldPreview() {
  const worlds = [
    {
      number: "01",
      title: "ARRAY ROOKIE",
      description: "Learn array basics, elements and indexes.",
      status: "START HERE",
      unlocked: true,
    },
    {
      number: "02",
      title: "INDEX EXPLORER",
      description: "Master indexing, traversal and direct access.",
      status: "LOCKED",
      unlocked: false,
    },
    {
      number: "03",
      title: "MEMORY HUNTER",
      description: "Explore how arrays are stored in memory.",
      status: "LOCKED",
      unlocked: false,
    },
  ];

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const startLearning = () => {
    window.location.href = `${basePath}/learn`;
  };

  return (
    <section className="world-section">
      <div className="section-heading">
        <span>02 / ARRAYVERSE MAP</span>

        <h2>
          CHOOSE YOUR
          <strong> PATH</strong>
        </h2>

        <p>
          Start learning and unlock new array missions.
        </p>
      </div>

      <div className="world-grid">
        {worlds.map((world) => (
          <div
            className={`world-card ${
              world.unlocked ? "unlocked" : "locked"
            }`}
            key={world.number}
          >
            <div className="world-number">
              {world.number}
            </div>

            <div className="world-status">
              {world.unlocked ? "● ONLINE" : "● LOCKED"}
            </div>

            <h3>{world.title}</h3>

            <p>{world.description}</p>

            <div className="world-bottom">
              <span>{world.status}</span>

              {world.unlocked && (
                <button
                  type="button"
                  className="world-arrow"
                  onClick={startLearning}
                  aria-label="Start learning"
                >
                  →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WorldPreview;