function ArrayCore() {
  const elements = [
    { index: 0, value: 42, address: "0x100" },
    { index: 1, value: 18, address: "0x104" },
    { index: 2, value: 73, address: "0x108" },
    { index: 3, value: 29, address: "0x10C" },
    { index: 4, value: 61, address: "0x110" },
  ];

  return (
    <section className="array-core-section">
      <div className="section-heading">
        <span>01 / CORE SYSTEM</span>

        <h2>
          UNDERSTAND THE
          <strong> ARRAY</strong>
        </h2>

        <p>
          See how array elements are stored using index, value and memory address.
        </p>
      </div>

      <div className="array-core-panel">

        <div className="core-topbar">
          <div>
            <span className="core-dot"></span>
            MEMORY VISUALIZER
          </div>

          <span>5 ELEMENTS</span>
        </div>

        <div className="core-array">
          {elements.map((element) => (
            <div className="core-element" key={element.index}>
              <div className="core-index">
                INDEX {element.index}
              </div>

              <div className="core-value">
                {element.value}
              </div>

              <div className="core-address">
                {element.address}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ArrayCore;