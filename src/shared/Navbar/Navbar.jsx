import "./Navbar.css";

function Navbar() {
  const currentPath = window.location.pathname;

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const getRoute = () => {
    if (
      currentPath === basePath ||
      currentPath === `${basePath}/`
    ) {
      return "/";
    }

    return currentPath.replace(basePath, "") || "/";
  };

  const route = getRoute();

  const isActive = (path) => {
    return route === path ? "active" : "";
  };

  const getLink = (path) => {
    if (path === "/") {
      return `${basePath}/`;
    }

    return `${basePath}${path}`;
  };

  return (
    <header className="navbar">

      {/* LOGO */}
      <div className="navbar-logo">

        <div className="logo-core">
          <span className="logo-ring ring-one"></span>
          <span className="logo-ring ring-two"></span>
          <span className="logo-letter">A</span>
        </div>

        <div className="logo-text">
          <strong>ARRAYVERSE</strong>
          <small>ARRAY LEARNING UNIVERSE</small>
        </div>

      </div>

      {/* NAVIGATION */}
      <nav className="navbar-links">

        <a
          href={getLink("/")}
          className={`nav-link ${isActive("/")}`}
        >
          <span className="nav-number">01</span>
          <span>HOME</span>
        </a>

        <a
          href={getLink("/learn")}
          className={`nav-link ${isActive("/learn")}`}
        >
          <span className="nav-number">02</span>
          <span>LEARN</span>
        </a>

        <a
          href={getLink("/practice")}
          className={`nav-link ${isActive("/practice")}`}
        >
          <span className="nav-number">03</span>
          <span>PRACTICE</span>
        </a>

        <a
          href={getLink("/challenges")}
          className={`nav-link ${isActive("/challenges")}`}
        >
          <span className="nav-number">04</span>
          <span>CHALLENGES</span>
        </a>

        <a
          href={getLink("/playground")}
          className={`nav-link ${isActive("/playground")}`}
        >
          <span className="nav-number">05</span>
          <span>PLAYGROUND</span>
        </a>

      </nav>

      {/* SYSTEM STATUS */}
      <div className="navbar-status">

        <div className="status-core">
          <span></span>
        </div>

        <div className="status-text">
          <small>SYSTEM</small>
          <strong>ONLINE</strong>
        </div>

        <div className="status-access">
          FREE
        </div>

      </div>

      {/* MOBILE MENU */}
      <button
        type="button"
        className="mobile-menu-button"
        aria-label="Open menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </header>
  );
}

export default Navbar;