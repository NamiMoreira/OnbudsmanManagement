import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../../components/modal/Modal'
import './styles/Login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 controle modal
  const [showModal, setShowModal] = useState(false);

  // 🔹 recuperação
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [recoveryLoading, setRecoveryLoading] = useState(false);
  const [recoveryError, setRecoveryError] = useState(null);
  const [recoverySuccess, setRecoverySuccess] = useState(false);
  

  const { login } = useAuth();

  // 🔹 login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login(credentials.email, credentials.password);

      if (response.token) {
        window.location.href = '/';
      }
    } catch (err) {
      setError(err.message || 'Erro ao realizar login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 recovery
  const handleRecovery = async (e) => {
    e.preventDefault();
    setRecoveryLoading(true);
    setRecoveryError(null);

    try {
      const response = await fetch('http://192.168.30.26:8090/recoveryPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail })
      });

      if (!response.ok) throw new Error('Erro ao solicitar recuperação');

      setRecoverySuccess(true);
    } catch (err) {
      setRecoveryError(err.message || 'Erro inesperado');
    } finally {
      setRecoveryLoading(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setRecoveryEmail('');
    setRecoveryError(null);
    setRecoverySuccess(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src="\logo-unimed.png" alt="Unimed Logo" className="logo" />
          <p>Plataforma de Gerenciamento de Ocorrências</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}

          <button className="login-button" disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className="login-footer">
            <span
              className="forgot-password"
              onClick={openModal}
              style={{ cursor: 'pointer' }}
            >
              Esqueci minha senha
            </span>
          </div>
        </form>

        <div className="security-badge">
          🔒 Ambiente Seguro
        </div>
      </div>

      {/* 🔹 MODAL REACT */}
      <Modal isOpen={showModal} onClose={closeModal}>
        {!recoverySuccess ? (
          <>
            {/* 🔹 Título */}
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ marginBottom: '8px' }}>Recuperar senha</h2>
              <p style={{ fontSize: '14px', color: '#666' }}>
                Informe seu e-mail cadastrado. Você receberá um link para redefinir sua senha.
              </p>
            </div>

            {/* 🔹 Formulário */}
            <form onSubmit={handleRecovery} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="form-group">
                <label>E-mail cadastrado</label>
                <input
                  type="email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="seu.email@empresa.com"
                  required
                  disabled={recoveryLoading}
                />
              </div>

              {recoveryError && (
                <div className="error-message">
                  ⚠️ {recoveryError}
                </div>
              )}

              {/* 🔹 Botões */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="login-button"
                  style={{ background: '#ccc', color: '#000', flex: 1 }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="login-button"
                  disabled={recoveryLoading}
                  style={{ flex: 1 }}
                >
                  {recoveryLoading ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* 🔹 Estado de sucesso */}
            <div style={{ textAlign: 'center' }}>
              <h2>Email enviado</h2>
              <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
                <br />
                Caso o email esteja cadastrado, seré enviado um email com as instruções para recuperação
                <br/>
                Verifique sua caixa de entrada e spam.

              </p>
            </div>

            <button
              onClick={closeModal}
              className="login-button"
              style={{ marginTop: '8px' }}
            >
              Voltar para login
            </button>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Login;