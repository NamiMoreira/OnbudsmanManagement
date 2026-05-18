import React, { useState, useRef } from 'react';
import './OportunidadeMelhoria.css';

// Função para gerar ID único (fallback para crypto.randomUUID)
const gerarIdUnico = () => {
  // Tenta usar crypto.randomUUID primeiro
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback: gera ID usando timestamp + random
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const OportunidadeMelhoria = () => {
  const [formData, setFormData] = useState({
    nomeRespondente: '',
    dataNotificacao: '',
    protocoloOuvidoria: '',
    protocoloPrimeiraInstancia: '',
    nomeClienteDemandante: '',
    dataOcorrencia: '',
    tipoAtendimento: '',
    nomeClienteAtendido: '',
    dataNascimento: '',
    convenio: '',
    descricaoManifestacao: '',
    investigacaoOcorrido: '',
    ocorrenciaRecorrente: '',
    acaoImediata: '',
    areaEnvolvida: '',
    procede: '',
    justificativa: '',
    analiseCausaRaiz: '',
    planoAcao: [
      { id: gerarIdUnico(), oQueFazer: '', comoFazer: '', quandoFazer: '', ondeFazer: '', responsavel: '', statusPrevisto: '', statusRealizado: '', evidencias: '' }
    ],
    retornoCliente: '',
    nomeContato: '',
    dataRetorno: '',
    horaRetorno: '',
    canalRetorno: 'e-mail',
    feedbackCliente: '',
    pertinente: '',
  });

  const [arquivos, setArquivos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagemEnvio, setMensagemEnvio] = useState(null);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const adicionarLinhaPlano = () => {
    setFormData(prev => ({
      ...prev,
      planoAcao: [
        ...prev.planoAcao,
        { id: gerarIdUnico(), oQueFazer: '', comoFazer: '', quandoFazer: '', ondeFazer: '', responsavel: '', statusPrevisto: '', statusRealizado: '', evidencias: '' }
      ]
    }));
  };

  const removerLinhaPlano = (id) => {
    if (formData.planoAcao.length === 1) {
      alert('É necessário manter pelo menos uma linha no Plano de Ação');
      return;
    }
    setFormData(prev => ({
      ...prev,
      planoAcao: prev.planoAcao.filter(item => item.id !== id)
    }));
  };

  const atualizarPlanoAcao = (id, campo, valor) => {
    setFormData(prev => ({
      ...prev,
      planoAcao: prev.planoAcao.map(item =>
        item.id === id ? { ...item, [campo]: valor } : item
      )
    }));
  };

  const handleArquivosChange = (e) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setArquivos(prev => [...prev, ...fileList]);
    }
  };

  const removerArquivo = (index) => {
    setArquivos(prev => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validarFormulario = () => {
    if (!formData.nomeRespondente.trim()) {
      alert('Por favor, informe o nome de quem está respondendo');
      return false;
    }
    if (!formData.descricaoManifestacao.trim()) {
      alert('Por favor, preencha a Descrição da Manifestação');
      return false;
    }
    if (!formData.analiseCausaRaiz.trim()) {
      alert('Por favor, preencha a Análise de Causa Raiz');
      return false;
    }
    
    const temAcaoValida = formData.planoAcao.some(item => item.oQueFazer.trim() !== '');
    if (!temAcaoValida) {
      alert('Por favor, preencha pelo menos uma ação no Plano de Ação');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;
    
    setLoading(true);
    setMensagemEnvio(null);
    
    try {
      const submitFormData = new FormData();
      
      const jsonData = JSON.stringify(formData);
      submitFormData.append('dados', jsonData);
      
      arquivos.forEach((file, index) => {
        submitFormData.append(`anexo_${index}`, file);
      });
      
      submitFormData.append('quantidade_anexos', arquivos.length.toString());
      
      const response = await fetch('http://192.168.30.26:8090/sector/response', {
        method: 'POST',
        body: submitFormData,
      });
      
      if (response.ok) {
        const resultado = await response.json();
        setMensagemEnvio({ tipo: 'success', texto: '✓ Oportunidade de melhoria enviada com sucesso!' });
        console.log('Resposta do servidor:', resultado);
        
        // Opcional: limpar formulário após sucesso
        setTimeout(() => {
          // window.location.reload();
        }, 2000);
      } else {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('Erro no envio:', error);
      setMensagemEnvio({ 
        tipo: 'error', 
        texto: `✗ Erro ao enviar: ${error.message || 'Falha na comunicação com o servidor'}` 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="om-container">
      <div className="om-document">
        {/* CABEÇALHO COM CAMPO NOME RESPONDENTE */}
        <div className="om-header">
          <div className="om-logo-area">
            <div className="om-logo-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2c6e9e" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none"/>
                <path d="M12 2v20" stroke="currentColor"/>
              </svg>
            </div>
            <div className="om-title-box">
              <h1>OPORTUNIDADE DE MELHORIA</h1>
              <h3>Análise de Causa Raiz e Plano de Ação</h3>
            </div>
          </div>
          
          {/* CAMPO DESTACADO: NOME DE QUEM ESTÁ RESPONDENDO */}
          <div className="om-respondente-field">
            <label htmlFor="nomeRespondente"><strong>✍️ Responsável pela resposta (preenchimento):</strong></label>
            <input
              type="text"
              id="nomeRespondente"
              name="nomeRespondente"
              value={formData.nomeRespondente}
              onChange={handleChange}
              placeholder="Digite o nome completo de quem está respondendo esta oportunidade"
              required
              className="om-input-large"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* NOTIFICAÇÃO */}
          <fieldset className="om-section">
            <legend>📋 NOTIFICAÇÃO</legend>
            <div className="om-grid-2">
              <div className="om-field">
                <label>Data:</label>
                <input type="date" name="dataNotificacao" value={formData.dataNotificacao} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Protocolo Ouvidoria:</label>
                <input type="text" name="protocoloOuvidoria" value={formData.protocoloOuvidoria} onChange={handleChange} placeholder="Ex: OUV-2025-0012" />
              </div>
              <div className="om-field">
                <label>Protocolo 1ª instância:</label>
                <input type="text" name="protocoloPrimeiraInstancia" value={formData.protocoloPrimeiraInstancia} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Nome do Cliente demandante:</label>
                <input type="text" name="nomeClienteDemandante" value={formData.nomeClienteDemandante} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Data da ocorrência:</label>
                <input type="date" name="dataOcorrencia" value={formData.dataOcorrencia} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Atendimento:</label>
                <input type="text" name="tipoAtendimento" value={formData.tipoAtendimento} onChange={handleChange} placeholder="Ex: Telefônico, Presencial" />
              </div>
              <div className="om-field">
                <label>Nome do Cliente atendido:</label>
                <input type="text" name="nomeClienteAtendido" value={formData.nomeClienteAtendido} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Data Nascimento:</label>
                <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Convênio:</label>
                <input type="text" name="convenio" value={formData.convenio} onChange={handleChange} placeholder="Convênio / Plano" />
              </div>
            </div>
          </fieldset>

          {/* DESCRIÇÃO DA MANIFESTAÇÃO */}
          <fieldset className="om-section">
            <legend>📝 DESCRIÇÃO DA MANIFESTAÇÃO</legend>
            <textarea
              name="descricaoManifestacao"
              rows={4}
              value={formData.descricaoManifestacao}
              onChange={handleChange}
              placeholder="Descreva detalhadamente a manifestação recebida..."
              className="om-textarea-full"
            />
          </fieldset>

          {/* INVESTIGAÇÃO DO OCORRIDO */}
          <fieldset className="om-section">
            <legend>🔍 INVESTIGAÇÃO DO OCORRIDO (REGISTRO DA ÁREA RESPONSÁVEL)</legend>
            <textarea
              name="investigacaoOcorrido"
              rows={4}
              value={formData.investigacaoOcorrido}
              onChange={handleChange}
              placeholder="Registro detalhado da investigação realizada..."
              className="om-textarea-full"
            />
            <div className="om-inline-group">
              <label className="om-radio-label">A ocorrência é recorrente?</label>
              <label><input type="radio" name="ocorrenciaRecorrente" value="sim" checked={formData.ocorrenciaRecorrente === 'sim'} onChange={handleChange} /> SIM</label>
              <label><input type="radio" name="ocorrenciaRecorrente" value="nao" checked={formData.ocorrenciaRecorrente === 'nao'} onChange={handleChange} /> NÃO</label>
            </div>
            <div className="om-field">
              <label>Ação imediata:</label>
              <textarea rows={2} name="acaoImediata" value={formData.acaoImediata} onChange={handleChange} placeholder="Ações executadas imediatamente após a identificação..." />
            </div>
            <div className="om-grid-2">
              <div className="om-field">
                <label>Área Envolvida:</label>
                <input type="text" name="areaEnvolvida" value={formData.areaEnvolvida} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Data do registro:</label>
                <input type="date" name="dataRegistro" value={formData.dataRegistro || ''} onChange={handleChange} />
              </div>
            </div>
            <div className="om-inline-group">
              <label className="om-radio-label">Procede?</label>
              <label><input type="radio" name="procede" value="sim" checked={formData.procede === 'sim'} onChange={handleChange} /> Procede</label>
              <label><input type="radio" name="procede" value="nao" checked={formData.procede === 'nao'} onChange={handleChange} /> Não Procede</label>
            </div>
            {formData.procede === 'nao' && (
              <div className="om-field">
                <label>Justificativa:</label>
                <textarea rows={2} name="justificativa" value={formData.justificativa} onChange={handleChange} placeholder="Justificativa caso não proceda..." />
              </div>
            )}
          </fieldset>

          {/* ANÁLISE DE CAUSA RAIZ */}
          <fieldset className="om-section">
            <legend>🧠 ANÁLISE DE CAUSA RAIZ</legend>
            <textarea
              name="analiseCausaRaiz"
              rows={5}
              value={formData.analiseCausaRaiz}
              onChange={handleChange}
              placeholder="Utilizar ferramentas como 5 Porquês, Diagrama de Ishikawa, etc. Descrever a causa raiz identificada..."
              className="om-textarea-full"
            />
          </fieldset>

          {/* PLANO DE AÇÃO */}
          <fieldset className="om-section">
            <legend>📌 PLANO DE AÇÃO</legend>
            <div className="om-table-wrapper">
              <table className="om-plano-table">
                <thead>
                  <tr>
                    <th>O que fazer?</th>
                    <th>Como fazer?</th>
                    <th>Quando fazer?</th>
                    <th>Onde fazer?</th>
                    <th>Responsável</th>
                    <th>Status Previsto</th>
                    <th>Status Realizado</th>
                    <th>Evidências</th>
                    <th style={{ width: '60px' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {formData.planoAcao.map((item) => (
                    <tr key={item.id}>
                      <td><input type="text" value={item.oQueFazer} onChange={(e) => atualizarPlanoAcao(item.id, 'oQueFazer', e.target.value)} placeholder="Ação..." /></td>
                      <td><input type="text" value={item.comoFazer} onChange={(e) => atualizarPlanoAcao(item.id, 'comoFazer', e.target.value)} placeholder="Método..." /></td>
                      <td><input type="text" value={item.quandoFazer} onChange={(e) => atualizarPlanoAcao(item.id, 'quandoFazer', e.target.value)} placeholder="Prazo" /></td>
                      <td><input type="text" value={item.ondeFazer} onChange={(e) => atualizarPlanoAcao(item.id, 'ondeFazer', e.target.value)} placeholder="Local/Sistema" /></td>
                      <td><input type="text" value={item.responsavel} onChange={(e) => atualizarPlanoAcao(item.id, 'responsavel', e.target.value)} placeholder="Nome/Área" /></td>
                      <td><input type="text" value={item.statusPrevisto} onChange={(e) => atualizarPlanoAcao(item.id, 'statusPrevisto', e.target.value)} placeholder="Previsto" /></td>
                      <td><input type="text" value={item.statusRealizado} onChange={(e) => atualizarPlanoAcao(item.id, 'statusRealizado', e.target.value)} placeholder="Realizado" /></td>
                      <td><input type="text" value={item.evidencias} onChange={(e) => atualizarPlanoAcao(item.id, 'evidencias', e.target.value)} placeholder="Link/Registro" /></td>
                      <td><button type="button" className="om-btn-remove" onClick={() => removerLinhaPlano(item.id)}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button type="button" className="om-btn-add" onClick={adicionarLinhaPlano}>+ Adicionar linha no Plano de Ação</button>
          </fieldset>

          {/* REGISTRO DA OUVIDORIA */}
          <fieldset className="om-section">
            <legend>📞 REGISTRO DA OUVIDORIA - RETORNO AO CLIENTE</legend>
            <div className="om-field">
              <label>Retorno ao Cliente (descrição):</label>
              <textarea rows={2} name="retornoCliente" value={formData.retornoCliente} onChange={handleChange} placeholder="Descreva como foi realizado o retorno..." />
            </div>
            <div className="om-grid-3">
              <div className="om-field">
                <label>Nome do contato:</label>
                <input type="text" name="nomeContato" value={formData.nomeContato} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Data:</label>
                <input type="date" name="dataRetorno" value={formData.dataRetorno} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Hora:</label>
                <input type="time" name="horaRetorno" value={formData.horaRetorno} onChange={handleChange} />
              </div>
              <div className="om-field">
                <label>Canal:</label>
                <select name="canalRetorno" value={formData.canalRetorno} onChange={handleChange}>
                  <option value="e-mail">E-mail</option>
                  <option value="telefone">Telefone</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="presencial">Presencial</option>
                </select>
              </div>
            </div>
          </fieldset>

          {/* FEEDBACK DO CLIENTE */}
          <fieldset className="om-section">
            <legend>📢 FEEDBACK DO CLIENTE</legend>
            <textarea
              name="feedbackCliente"
              rows={3}
              value={formData.feedbackCliente}
              onChange={handleChange}
              placeholder="Registrar a resposta/recepcionamento do cliente após o retorno..."
              className="om-textarea-full"
            />
            <div className="om-inline-group">
              <label className="om-radio-label">Pertinente:</label>
              <label><input type="radio" name="pertinente" value="sim" checked={formData.pertinente === 'sim'} onChange={handleChange} /> Sim, reenviar a área</label>
              <label><input type="radio" name="pertinente" value="nao" checked={formData.pertinente === 'nao'} onChange={handleChange} /> Não, arquivar</label>
            </div>
          </fieldset>

          {/* ANEXOS */}
          <fieldset className="om-section">
            <legend>📎 ANEXOS (documentos, prints, evidências)</legend>
            <div className="om-file-area">
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleArquivosChange}
                className="om-file-input"
                accept=".pdf,.doc,.docx,.xlsx,.jpg,.jpeg,.png,.txt"
              />
              {arquivos.length > 0 && (
                <div className="om-file-list">
                  <strong>Arquivos selecionados:</strong>
                  <ul>
                    {arquivos.map((file, idx) => (
                      <li key={idx}>
                        {file.name} ({(file.size / 1024).toFixed(1)} KB)
                        <button type="button" onClick={() => removerArquivo(idx)} className="om-remove-file">✖</button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <small className="om-file-hint">Formatos permitidos: PDF, DOC, XLSX, JPG, PNG. Máximo 10MB por arquivo.</small>
            </div>
          </fieldset>

          {/* BOTÕES */}
          <div className="om-actions">
            <button type="submit" className="om-btn-submit" disabled={loading}>
              {loading ? 'Enviando...' : '📤 Enviar Oportunidade de Melhoria'}
            </button>
            <button type="button" className="om-btn-reset" onClick={() => window.location.reload()}>
              Limpar Formulário
            </button>
          </div>
          
          {mensagemEnvio && (
            <div className={`om-message ${mensagemEnvio.tipo}`}>
              {mensagemEnvio.texto}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OportunidadeMelhoria;