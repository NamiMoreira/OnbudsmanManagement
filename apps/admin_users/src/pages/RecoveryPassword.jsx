import React, { useState, useEffect } from 'react';
import '../pages/Login/styles/Login.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [token, setToken] = useState(null);

  // 🔹 pega token da URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get('token');
    setToken(tokenFromUrl);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔹 validações
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://192.168.30.26:8090/user-recovery ', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          password
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao redefinir senha');
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <img 
            src="\logo-unimed.png" 
            alt="Logo" 
            className="logo"
          />
          <p>Redefinição de Senha</p>
        </div>

        {!success ? (
          <form onSubmit={handleSubmit} className="login-form">

            <div className="form-group">
              <label>Nova senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Confirmar senha</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="error-message">
                ⚠️ {error}
              </div>
            )}

            {!token && (
              <div className="error-message">
                ⚠️ Token inválido ou ausente
              </div>
            )}

            <button
              type="submit"
              className="login-button"
              disabled={loading || !token}
            >
              {loading ? 'Salvando...' : 'Salvar nova senha'}
            </button>

            <div className="login-footer">
              <a href="/login" className="forgot-password">
                Voltar para login
              </a>
            </div>

          </form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h3>Senha atualizada</h3>
            <p>Sua senha foi redefinida com sucesso.</p>

            <button
              className="login-button"
              onClick={() => window.location.href = '/login'}
            >
              Ir para login
            </button>
          </div>
        )}

        <div className="security-badge">
          🔒 Ambiente Seguro
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;