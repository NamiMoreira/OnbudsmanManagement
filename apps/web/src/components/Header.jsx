// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <header className="bg-success text-white">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
        
        {/* Logo ORM à esquerda */}
        <div className="d-flex align-items-center" style={{ gap: "0.75rem" }}>
          
          
        </div>

        {/* Navbar central */}
        <nav className="my-3 my-md-0">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <a href="/" className="nav-link text-white fw-bold">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link text-white fw-bold">
                Sobre
              </a>
            </li>
            <li className="nav-item">
              <a href="/new" className="nav-link text-white fw-bold">
                Abertura Ocorrências
              </a>
            </li>
            <li className="nav-item">
              <a href="/ocurrence" className="nav-link text-white fw-bold">
                Consultar Ocorrências
              </a>
            </li>
          </ul>
        </nav>

        {/* Logo Unimed à direita */}
        <div>
          <img
            src="/logo.png"
            alt="Unimed"
            style={{ height: 100, objectFit: "contain" }}
          />
        </div>
      </div>
    </header>
  );
}
