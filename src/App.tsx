import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "./hooks/useTheme";
import "bootstrap-icons/font/bootstrap-icons.css";

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div className="container py-3 ">
      <header className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <Link
          to="/"
          className="navbar-brand fw-bold text-primary fs-4 d-flex align-items-center gap-2"
        >
          <i className="bi bi-bounding-box rotate-logo"></i>
          Resource Explorer
        </Link>

        <div className="d-flex gap-3 align-items-center">
          <div className="form-check form-switch m-2">
            <input
              className="form-check-input btn btn-warning"
              type="checkbox"
              id="themeSwitch"
              checked={theme === "dark"}
              onChange={toggleTheme}
              style={{ cursor: "pointer" }}
            />
            <label className="form-check-label ms-2 mt-1" htmlFor="themeSwitch">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </label>
          </div>

          {/* Refresh button */}
          <button
            className="btn btn-sm btn btn-success"
            onClick={() => window.location.reload()}
          >
            Refresh
          </button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
