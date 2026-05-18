import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function New() {
  const navigate = useNavigate();
  const recaptchaLoaded = useRef(false);
  const recaptchaWidgetId = useRef(null);
  const retryCount = useRef(0);
  const maxRetries = 3;

  const [formData, setFormData] = useState({
    reanalise: false,
    unidade_id: "",
    descricao: "",
    cartao_beneficiario: "",
    manifestacao_ant: "",
    nome: "",
    nome_cliente: "",
    email: "",
    cpf: "",
    telefone: "",
    tp_atend_id: "",
    objetivo: "",
    unimed_id: ""
  });

  const [loading, setLoading] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedTerms1, setAcceptedTerms1] = useState(false);
  const [acceptedTerms2, setAcceptedTerms2] = useState(false);

  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [recaptchaError, setRecaptchaError] = useState("");
  const [recaptchaReady, setRecaptchaReady] = useState(false);
  const requiredFields = [
    "cartao_beneficiario"
  ];

  // 🧠 Função genérica para atualizar os campos
  const handleChange = async(e) => {
    const { name, type, value, checked } = e.target;
    const response =  await fetch('/unimeds.json');
    const data = await response.json()
    
    const codigoCartao = value.slice( 4);   
       console.log(codigoCartao);
      
    if (codigoCartao in data ) {
      
        setFormData(prev => ({
        ...prev,
        tp_atend_id: "2" 
    }));
    }else{ if ('') {
        setFormData(prev => ({
        ...prev,
        tp_atend_id: "1" 
    
    }))}else{
        setFormData(prev => ({
        ...prev,
        tp_atend_id: "3" 
    
    }))

    }}
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };




 const formatCPF = (value) => {
    const cpf = value.replace(/\D/g, ""); // remove tudo que não é número

    if (cpf.length <= 3) return cpf;
    if (cpf.length <= 6) return `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
    if (cpf.length <= 9)
      return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9,
    )}-${cpf.slice(9, 11)}`;
  };

  // 🔧 Atualizar CPF no estado sem máscara (backend recebe limpo)
  const handleCpfChange = (e) => {
    const onlyNumbers = e.target.value.replace(/\D/g, "");

    // limitar a 11 dígitos
    if (onlyNumbers.length > 11) return;

    setFormData((prev) => ({
      ...prev,
      cpf: onlyNumbers, // sempre sem máscara no estado
    }));
  };
  // 🔧 Função para esperar um tempo
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 🔧 Carregar script do reCAPTCHA com Promise
  const loadRecaptchaScript = () => {
    return new Promise((resolve, reject) => {
      if (window.grecaptcha && window.grecaptcha.render) {
        resolve();
        return;
      }

      if (document.querySelector('script[src*="recaptcha"]')) {
        // Script já está carregando, esperar ele ficar pronto
        const checkInterval = setInterval(() => {
          if (window.grecaptcha && window.grecaptcha.render) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        resolve();
      };

      script.onerror = () => {
        reject(new Error("Falha ao carregar reCAPTCHA"));
      };

      document.head.appendChild(script);
      recaptchaLoaded.current = true;
    });
  };

  // 🔧 Esperar pela API do reCAPTCHA
  const waitForRecaptchaAPI = async () => {
    let attempts = 0;
    const maxAttempts = 50; // 5 segundos no total

    while (attempts < maxAttempts) {
      if (window.grecaptcha && window.grecaptcha.render) {
        return true;
      }
      await delay(100);
      attempts++;
    }

    throw new Error("reCAPTCHA API não carregou dentro do tempo esperado");
  };

  // 🔧 Inicializar reCAPTCHA
  const initializeRecaptcha = async () => {
    try {
      setRecaptchaError("");

      // Verificar se já existe um widget
      if (recaptchaWidgetId.current !== null) {
        return;
      }

      // Verificar se o container existe
      const container = document.getElementById("recaptcha-container");
      if (!container) {
        throw new Error("Container do reCAPTCHA não encontrado");
      }

      // Limpar container
      container.innerHTML = "";

      // Carregar script se necessário
      await loadRecaptchaScript();

      // Esperar API ficar pronta
      await waitForRecaptchaAPI();

      // Renderizar reCAPTCHA
      recaptchaWidgetId.current = window.grecaptcha.render(container, {
        sitekey: "6LdqZvorAAAAAFz1y_2N_xDFmjy4QoEZoH7HbjZG",
        callback: onRecaptchaSuccess,
        "error-callback": onRecaptchaError,
        "expired-callback": onRecaptchaExpired,
        theme: "light",
        size: "normal",
      });

      setRecaptchaReady(true);
      retryCount.current = 0;
    } catch (error) {
      setRecaptchaError(`Falha ao carregar o reCAPTCHA: ${error.message}`);
      setRecaptchaReady(false);

      // Tentar novamente se não excedeu o limite
      if (retryCount.current < maxRetries) {
        retryCount.current++;
        await delay(1000 * retryCount.current); // Backoff exponencial
        await initializeRecaptcha();
      }
    }
  };

  // 🔧 Callback de sucesso do reCAPTCHA
  const onRecaptchaSuccess = (token) => {
    setRecaptchaToken(token);
    setRecaptchaError("");
  };

  // 🔧 Callback de erro do reCAPTCHA
  const onRecaptchaError = () => {
    setRecaptchaError("Erro na validação do reCAPTCHA. Tente novamente.");
    setRecaptchaToken("");
  };

  // 🔧 Callback de expiração do reCAPTCHA
  const onRecaptchaExpired = () => {
    setRecaptchaToken("");
    resetRecaptcha();
  };

  // 🔧 Resetar reCAPTCHA
  const resetRecaptcha = () => {
    if (window.grecaptcha && recaptchaWidgetId.current !== null) {
      try {
        window.grecaptcha.reset(recaptchaWidgetId.current);
        setRecaptchaToken("");
        setRecaptchaError("");
      } catch (error) {
      }
    }
  };

  // 🔧 Efeito principal para inicializar o reCAPTCHA
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      await delay(500); // Esperar o DOM renderizar
      if (mounted) {
        await initializeRecaptcha();
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, []);

  // 🔧 Recarregar quando a página ficar visível novamente
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && !recaptchaReady) {
        await initializeRecaptcha();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [recaptchaReady]);

  // 🚀 Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    
    

    if (!acceptedTerms || !acceptedTerms1 || !acceptedTerms2) {
      alert("É necessário aceitar as políticas de privacidade.");
      return;
    }

    // if (!recaptchaToken) {
    //   setRecaptchaError("Por favor, complete o reCAPTCHA.");

    //   // Se o reCAPTCHA não está pronto, tentar reinicializar
    //   if (!recaptchaReady) {
    //     await initializeRecaptcha();
    //   }
    //   return;
    // }

    setLoading(true);

    try {
      const response = await fetch("http://192.168.30.26:8090/ocurrence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptcha_token: recaptchaToken,
        }),
      });


      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      navigate("/response", { state: { data } });
    } catch (error) {
      console.error("Erro no envio:", error);
      alert("Falha ao enviar o formulário. Tente novamente.");
      resetRecaptcha(); // Resetar reCAPTCHA em caso de erro
    } finally {
      setLoading(false);
    }
  };

  // 🔧 Recarregar manualmente o reCAPTCHA
  const reloadRecaptcha = async () => {
    setRecaptchaReady(false);
    setRecaptchaToken("");
    setRecaptchaError("");
    recaptchaWidgetId.current = null;
    retryCount.current = 0;

    await initializeRecaptcha();
  };

  // 🔧 Forçar recriação do container
  const recreateRecaptchaContainer = async () => {
    const container = document.getElementById("recaptcha-container");
    if (container) {
      container.innerHTML = "";
      // Adicionar um pequeno delay para garantir que o DOM foi atualizado
      await delay(100);
    }
    await reloadRecaptcha();
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Nova Ocorrência</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Seções do formulário mantidas iguais */}
        {/* =========================
            CARD - DADOS DO MANIFESTANTE
        ========================== */}
        <div className="card p-3 shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title text-success">
              👤 Dados do Manifestante
            </h5>
            <p className="text-muted small mb-4">
              Informe quem está registrando a manifestação e os dados do cliente
              atendido.
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome do Manifestante</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted">
                  Nome completo do manifestante.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label">Nome do Cliente Atendido</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome_cliente"
                  value={formData.nome_cliente}
                  onChange={handleChange}
                />
                <small className="text-muted">
                  Beneficiário ou paciente envolvido.
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label">Cartão do Beneficiário</label>
                <input
                  type="text"
                  className="form-control"
                  name="cartao_beneficiario"
                  value={formData.cartao_beneficiario}
                  onChange={handleChange}
                />
                <small className="text-muted">
                  Número do cartão plano (se houver).
                </small>
              </div>

              <div className="col-md-6">
                <label className="form-label">CPF</label>
                <input
                  type="text"
                  className="form-control"
                  name="cpf"
                  value={formatCPF(formData.cpf)} // mostra formatado
                  onChange={handleCpfChange} // salva sem máscara
                  maxLength={14} // 000.000.000-00
                />
                <small className="text-muted">Apenas números.</small>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            CARD - CONTATO
        ========================== */}
        <div className="card p-3 shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title text-success">
              ☎️ Informações de Contato
            </h5>
            <p className="text-muted small mb-4">
              Preencha como prefere ser contatado.
            </p>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                />
                <small className="text-muted">Ex: (12) 99999-9999</small>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            CARD - DETALHES
        ========================== */}
        <div className="card p-3 shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title text-success">
              📝 Detalhes da Ocorrência
            </h5>
            <p className="text-muted small mb-4">
              Escolha as opções que descrevem melhor a manifestação.
            </p>

            <div className="row g-3">
              {/* Unidade */}
              <div className="col-md-4">
                <label className="form-label">Serviço Utilizado</label>
                <select
                  className="form-select"
                  name="unidade_id"
                  value={formData.unidade_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="1">Unidade Central</option>
                  <option value="2">Clínica Sul</option>
                  <option value="3">Hospital Unimed</option>
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Tipo de atendimento</label>
                <select
                  className="form-select"
                  name="tp_atend_id"
                  value={formData.tp_atend_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione</option>
                  <option value="1">Particular</option>
                  <option value="2">Unimed</option>
                  <option value="3">Outros</option>
                </select>
              </div>

              <div className="col-md-4">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="reanalise"
                    checked={formData.reanalise}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="reanaliseCheck">
                    Reanálise
                  </label>
                </div>
              </div>
              {/* Manifestação anterior */}
              <div className="col-md-6">
                <label className="form-label">Manifestação Anterior</label>
                <input
                  type="text"
                  className="form-control"
                  name="manifestacao_ant"
                  value={formData.manifestacao_ant}
                  onChange={handleChange}
                />
                <small className="text-muted">
                  Informe o protocolo anterior (se houver).
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            CARD - DESCRIÇÃO
        ========================== */}
        <div className="card p-3 shadow-sm border-0">
          <div className="card-body">
            <h5 className="card-title text-success">
              🗒️ Descrição da Ocorrência
            </h5>
            <p className="text-muted small mb-3">
              Descreva o ocorrido de forma clara e detalhada.
            </p>

            <textarea
              className="form-control"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              rows="4"
            ></textarea>
            <br></br>
            <p className="text-muted small mb-3">
              Descreva o seu objetivo com a abertura da manifestação.
            </p>

            <textarea
              className="form-control"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              rows="4"
            ></textarea>
          </div>
        </div>

        {/* =========================
            POLÍTICA + RECAPTCHA + BOTÃO
        ========================== */}
        <div className="col-12 mt-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
              id="termsCheck"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Li e aceito as{" "}
              <a
                href="/politicas-de-privacidade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                políticas de privacidade
              </a>
            </label>
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={acceptedTerms1}
              onChange={() => setAcceptedTerms1(!acceptedTerms1)}
              id="termsCheck1"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Concordo em receber e-mails e mensagens, via celular, da Unimed
              Pinda, sobre este protocolo
            </label>
          </div>
        </div>
        <div className="col-12 mt-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={acceptedTerms2}
              onChange={() => setAcceptedTerms2(!acceptedTerms2)}
              id="termsCheck2"
            />
            <label className="form-check-label" htmlFor="termsCheck">
              Estou ciente que a Ouvidoria da Unimed Pindamonhangaba obterá informações sigilosas ou restritas, constantes dos registros da operadora, referentes ao cliente atendido e ao seu plano.;
            </label>
          </div>
        </div>
        {/* reCAPTCHA melhorado */}
        <div className="col-12 text-center mt-4">
          <div className="mb-3">
            <div
              id="recaptcha-container"
              className="d-flex justify-content-center mb-2"
              style={{ minHeight: "78px" }}
            ></div>

            {!recaptchaReady && !recaptchaError && (
              <div className="text-muted small">
                <div
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></div>
                Carregando reCAPTCHA...
              </div>
            )}
          </div>

          {recaptchaError && (
            <div
              className="alert alert-warning d-inline-flex align-items-center"
              role="alert"
            >
              <small>{recaptchaError}</small>
              <div className="ms-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-warning me-1"
                  onClick={reloadRecaptcha}
                >
                  ↻ Tentar Novamente
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={recreateRecaptchaContainer}
                >
                  🔄 Recriar Container
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-success px-5 mt-3"
            disabled={loading || !recaptchaReady}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                ></span>
                Enviando...
              </>
            ) : (
              "Enviar"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
