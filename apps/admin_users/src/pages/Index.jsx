import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function New() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigate = useNavigate();
  const { user, logout, token } = useAuth();
  const [processos , setProcessos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total,setTotal] = useState()

  // Dados do usuário
  const userInfo = {
    name: user?.name || user?.email?.split("@")[0] || "Usuário",
    group: user?.role === 1 ? "Administrador" : "Ouvidoria",
    email: user?.email || "",
  };

  
  const handleUserAction = (action) => {
    
    if (action === "Trocar Senha") {
      navigate(`/Reset-password?token=${token}`);
    }
    
    if (action === "Sair") {
      logout();
      navigate("/login");
    }
    
    setShowUserMenu(false);
  };
  
  useEffect(() => {
    async function carregarUsuarios() {
      try {
        const response = await fetch("http://192.168.30.26:8090/occurrence-filter-status");
        
        if (!response.ok) {
          throw new Error("Erro ao buscar dados");
        }
        
        const data = await response.json();
        
        
        setProcessos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    
    carregarUsuarios();
      }, []);

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div
          className="bg-light border-end"
          style={{ width: "250px", minHeight: "100vh" }}
        >
          <div className="p-3">
            <h5 className="text-success mb-4">Ouvidoria</h5>

            <ul className="nav nav-pills flex-column">
              <li className="nav-item">
                <a
                  className="nav-link text-dark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/consult");
                  }}
                >
                  <i className="bi bi-search me-2"></i>
                  Consultar Processos
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link text-dark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/relatorios");
                  }}
                >
                  <i className="bi bi-bar-chart me-2"></i>
                  Relatórios
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link text-dark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/configuracoes");
                  }}
                >
                  <i className="bi bi-gear me-2"></i>
                  Configurações
                </a>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link text-dark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/usuarios");
                  }}
                >
                  <i className="bi bi-people me-2"></i>
                  Usuários
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="flex-grow-1">
          {/* Header */}
          <div className="bg-white border-bottom p-3">
            <div className="row align-items-center">
              <div className="col">
                <h4 className="mb-0">Gerenciamento de Ocorrências</h4>
              </div>

              <div className="col-auto position-relative">
                <div
                  className="d-flex align-items-center cursor-pointer p-2 rounded"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div
                    className="bg-light border rounded-circle d-flex align-items-center justify-content-center me-2"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <i className="bi bi-person text-dark fs-5"></i>
                  </div>

                  <div className="d-none d-md-block">
                    <small className="text-muted d-block">
                      {userInfo.name}
                    </small>

                    <small className="text-muted">
                      {userInfo.group}
                    </small>
                  </div>

                  <i
                    className={`bi bi-chevron-down ms-1 ${
                      showUserMenu ? "rotate-180" : ""
                    }`}
                  ></i>
                </div>

                {/* Dropdown usuário */}
                {showUserMenu && (
                  <div
                    className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border"
                    style={{ width: "280px", zIndex: 1000 }}
                  >
                    <div className="p-3 border-bottom">
                      <div className="d-flex align-items-center">
                        <div
                          className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3"
                          style={{ width: "50px", height: "50px" }}
                        >
                          <i className="bi bi-person text-white fs-4"></i>
                        </div>

                        <div>
                          <h6 className="mb-0 text-success">
                            {userInfo.name}
                          </h6>

                          <small className="text-muted">
                            {userInfo.group}
                          </small>

                          <br />

                          <small className="text-muted">
                            {userInfo.email}
                          </small>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <a
                        href="#"
                        className="dropdown-item d-flex align-items-center px-3 py-2 text-dark text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUserAction("Trocar Senha");
                        }}
                      >
                        <i className="bi bi-key me-3 text-success"></i>

                        <div>
                          <div>Trocar Senha</div>

                          <small className="text-muted">
                            Alterar senha de acesso
                          </small>
                        </div>
                      </a>

                      <hr className="my-1" />

                      <a
                        href="#"
                        className="dropdown-item d-flex align-items-center px-3 py-2 text-dark text-decoration-none"
                        onClick={(e) => {
                          e.preventDefault();
                          handleUserAction("Sair");
                        }}
                      >
                        <i className="bi bi-box-arrow-right me-3 text-danger"></i>

                        <div>
                          <div>Sair</div>

                          <small className="text-muted">
                            Encerrar sessão
                          </small>
                        </div>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="container-fluid mt-3">
            <div className="card bg-success text-white mb-4">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="card-title mb-0">
                      Bem-vindo, {userInfo.name}! 👋
                    </h5>

                    <small>
                      Você está logado como {userInfo.group}
                    </small>
                  </div>

                  <div className="col-auto"></div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Sistema de Ouvidoria Unimed
                </h5>

                <p className="card-text">
                  Utilize o menu lateral para navegar entre as
                  funcionalidades do sistema.
                </p>

                <hr />

                <div className="row">
                  <div className="col-md-4">
                    <div className="alert alert-info">
                      <i className="bi bi-info-circle me-2"></i>

                      <strong>Total de ocorrências:</strong>{processos.reduce((soma, p) => soma + p.count, 0)}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="alert alert-warning">
                      <i className="bi bi-clock me-2"></i>

                      <strong>Pendentes:</strong> {processos[1]?.count}

                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="alert alert-success">
                      <i className="bi bi-check-circle me-2"></i>

                      <strong>Finalizadas:</strong> {processos[2]?.count}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style>
        {`
          .cursor-pointer {
            cursor: pointer;
          }

          .rotate-180 {
            transform: rotate(180deg);
            transition: transform 0.2s ease;
          }

          .dropdown-item:hover {
            background-color: #f8f9fa;
          }

          .dropdown-item:hover i {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }
        `}
      </style>
    </>
  );
}