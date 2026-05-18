import { useOcorrencia } from "../hooks/useOcorrencia"
import { ocorrenciaService } from "../services/ocorrenciaService";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from "react";
import ModalFinalizarDemanda from '../components/modal/Finish.tsx';


export default function Manage() {
  const {
    // States
    showUserMenu, setShowUserMenu,
    loading, setLoading,
    updating, setUpdating,
    searching, setSearching,
    ocorrenciaId, setOcorrenciaId,
    searchResults, setSearchResults,
    showResults, setShowResults,
    documentos, setDocumentos,
    loadingDocumentos, setLoadingDocumentos,
    protocolo, setProtocolo,
    showSendToSectorModal, setShowSendToSectorModal,
    showResponderComentariosModal, setShowResponderComentariosModal,
    showQuestionarBeneficiarioModal, setShowQuestionarBeneficiarioModal,
    sendToSectorData, setSendToSectorData,
    responderComentariosData, setResponderComentariosData,
    questionarBeneficiarioData, setQuestionarBeneficiarioData,
    comentarios, setComentarios,
    loadingComentarios, setLoadingComentarios,
    searchFilters, setSearchFilters,
    formData, setFormData,


    // Handlers
    handleChange,
    handleFilterChange,
    handleSendToSectorChange,
    handleResponderComentariosChange,
    handleQuestionarBeneficiarioChange,
    handleAdicionarArquivos,
    handleRemoverArquivo,
    clearFilters,
  } = useOcorrencia();
  const [notificationCount, setNotificationCount] = useState(0);
  const [showFinalizarModal, setShowFinalizarModal] = useState(false);

  // Callbacks para os serviços
  const callbacks = {
    setLoading,
    setProtocolo,
    setOcorrenciaId,
    setFormData,
    setSearching,
    setShowResults,
    setSearchResults,
    setLoadingDocumentos,
    setDocumentos,
    setUpdating,
    setLoadingComentarios,
    setComentarios,
    setShowSendToSectorModal,
    setSendToSectorData,
    setShowResponderComentariosModal,
    setResponderComentariosData,
    setShowQuestionarBeneficiarioModal,
    setQuestionarBeneficiarioData,
  };

  // Dados estáticos (mantidos do código original)
  const userInfo = {

    name: "Carlos Silva",
    group: "Ouvidoria",
    email: "carlos.silva@unimed.com.br",
  };

  const statusOptions = [
    { value: "", label: "Todos os status" },
    { value: "aberto", label: "Aberto" },
    { value: "pendente_documentos", label: "Pendente Documentos" },
    { value: "pendente_setor", label: "Pendente Setor" },
    { value: "pendente_demandante", label: "Pendente Demandante" },
    { value: "finalizado", label: "Finalizado" },
  ];

  const classificacaoOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Urgente" },
    { value: "2", label: "Normal" },
    { value: "3", label: "Baixa Prioridade" },
  ];

  const unidadeOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Unidade Central" },
    { value: "2", label: "Clínica Sul" },
    { value: "3", label: "Hospital Unimed" },
  ];

  const identificacaoOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Beneficiário" },
    { value: "2", label: "Prestador" },
    { value: "3", label: "Outros" },
  ];

  const formaRespostaOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "E-mail" },
    { value: "2", label: "Telefone" },
    { value: "3", label: "Carta" },
  ];

  const assuntoOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Atendimento" },
    { value: "2", label: "Cobrança" },
    { value: "3", label: "Autorização" },
  ];

  const subAssuntoOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Demora no atendimento" },
    { value: "2", label: "Erro de fatura" },
    { value: "3", label: "Problema de sistema" },
  ];

  const canalOptions = [
    { value: "", label: "Selecione" },
    { value: "1", label: "Telefone" },
    { value: "2", label: "E-mail" },
    { value: "3", label: "Presencial" },
  ];

  // Novas opções para Dados Internos
  const tipoContratoOptions = [
    { value: "", label: "Selecione o tipo de contrato" },
    { value: "1", label: "Individual" },
    { value: "empresarial", label: "Empresarial" },
    { value: "familiar", label: "Familiar" },
    { value: "coletivo", label: "Coletivo" },
  ];

  const tipoDemandanteOptions = [
    { value: "", label: "Selecione o tipo de demandante" },
    { value: "1", label: "Beneficiário" },
    { value: "dependente", label: "Dependente" },
    { value: "prestador", label: "Prestador" },
    { value: "fornecedor", label: "Fornecedor" },
    { value: "outros", label: "Outros" },
  ];

  const canalInternoOptions = [
    { value: "", label: "Selecione o canal interno" },
    { value: "1", label: "Ouvidoria" },
    { value: "central_atendimento", label: "Central de Atendimento" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "site", label: "Site" },
    { value: "presencial", label: "Presencial" },
  ];

  // Opções para os setores
  const setorOptions = [
    { value: "", label: "Selecione o setor" },
    { value: "atendimento", label: "Atendimento ao Cliente" },
    { value: "financeiro", label: "Financeiro" },
    { value: "juridico", label: "Jurídico" },
    { value: "ti", label: "Tecnologia da Informação" },
    { value: "operacional", label: "Operacional" },
    { value: "comercial", label: "Comercial" },
    { value: "medico", label: "Setor Médico" },
    { value: "enfermagem", label: "Enfermagem" },
  ];

  // Funções wrapper para os serviços
  const fetchOcorrencia = async () => {

    // Usar ocorrenciaId se disponível
    const idParaBuscar = ocorrenciaId || document.querySelector('input[placeholder*="Protocolo"]')?.value;

    if (!idParaBuscar || idParaBuscar.trim() === '') {
      alert("Por favor, digite um protocolo para buscar");
      return;
    }


    try {
      // Atualizar o estado antes de buscar
      setOcorrenciaId(idParaBuscar);
      setProtocolo(idParaBuscar);

      // Chamar o serviço
      const resultado = await ocorrenciaService.carregarOcorrencia(idParaBuscar, {
        ...callbacks,
        fetchDocumentos,
        onSuccess: (data) => {
          console.log(data)
        }
      });
      const result =  await ocorrenciaService.fetchNotifications(idParaBuscar);
      
      setNotificationCount(result.total);


    } catch (error) {
      console.error('❌ Erro na busca:', error);
      // O alert já foi mostrado pelo serviço
    }
  };

  const fetchDocumentos = (protocoloParam) => {
    ocorrenciaService.carregarDocumentos(protocoloParam || protocolo, callbacks);
  };

  const searchOcorrencias = () => {
    ocorrenciaService.buscarOcorrencias(searchFilters, callbacks);
  };

  const updateOcorrencia = () => {
    ocorrenciaService.atualizarOcorrencia(ocorrenciaId, formData, callbacks);
  };

  const fetchComentarios = () => {
    ocorrenciaService.carregarComentarios(ocorrenciaId, callbacks);
  };

  const handleSendToSector = () => {
    ocorrenciaService.enviarParaSetor(ocorrenciaId, protocolo, sendToSectorData, userInfo, callbacks);
  };

  const handleResponderComentarios = () => {
    ocorrenciaService.responderComentarios(ocorrenciaId, responderComentariosData, userInfo, {
      ...callbacks,
      fetchComentarios
    });
    setNotificationCount(0);
  };

  const handleQuestionarBeneficiario = () => {

    const payload = {
      ...questionarBeneficiarioData,
      nomeManifestante: formData.nome,
    };

    ocorrenciaService.questionarBeneficiario(
      ocorrenciaId,
      payload,
      userInfo,
      callbacks
    );
  };
  
  // Funções auxiliares que permanecem no componente
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleMenuClick = (menuName) => {
    alert(`${menuName} clicado!`);
  };

  const handleUserAction = (action) => {
    alert(`${action} clicado!`);
    setShowUserMenu(false);
  };

  const loadOcorrenciaFromResults = async  (ocorrencia) => {
    setOcorrenciaId(ocorrencia.protocolo || ocorrencia._id);
    setProtocolo(ocorrencia.protocolo || ocorrencia._id);
    setFormData({
      reanalise: ocorrencia.reanalise || "false",
      unidade_id: ocorrencia.unidade_id || "",
      descricao: ocorrencia.descricao || "",
      cartao_beneficiario: ocorrencia.cartao_beneficiario || "",
      manifestacao_ant: ocorrencia.manifestacao_ant || "",
      nome: ocorrencia.nome || "",
      nome_cliente: ocorrencia.nome_cliente || "",
      email: ocorrencia.email || "",
      cpf: ocorrencia.cpf || "",
      telefone: ocorrencia.telefone || "",
      canal_id: ocorrencia.canal_id || "",
      tipo_contrato: ocorrencia.tipo_contrato || "",
      canal_interno: ocorrencia.canal_interno || "",
      observacoes_internas: ocorrencia.observacoes_internas || "",
      objetivo: ocorrencia.objetivo ,
    });
    fetchDocumentos(ocorrencia.protocolo || ocorrencia._protocolo);
    setShowResults(false);
    alert("Ocorrência carregada para edição!");
    console.log('Verificando ocorrenciaId:', ocorrenciaId);
    console.log('Verificando protocolo:', protocolo);

    const result =  await  ocorrenciaService.fetchNotifications(protocolo);
    setNotificationCount(result.total);
  };

  const handleOpenResponderComentarios = () => {


    const idValido = ocorrenciaId || protocolo;

    if (!idValido) {
      alert("Por favor, carregue uma ocorrência primeiro");
      return;
    }
    fetchComentarios();
    setShowResponderComentariosModal(true);
  };

  const handleOpenQuestionarBeneficiario = () => {
    if (!ocorrenciaId) {
      alert("Por favor, carregue uma ocorrência primeiro");
      return;
    }
    setShowQuestionarBeneficiarioModal(true);
  };

    const handleOpenFinalizarDemanda = () => {
    if (!ocorrenciaId && !protocolo) {
      alert("Por favor, carregue uma ocorrência primeiro");
      return;
    }
    setShowFinalizarModal(true);
  };
    const handleFinalizarSucesso = (data) => {
    console.log('Demanda finalizada com sucesso:', data);
    alert('Demanda finalizada com sucesso!');
    setShowFinalizarModal(false);
    
    // Opcional: recarregar a ocorrência para atualizar o status
    if (ocorrenciaId || protocolo) {
      fetchOcorrencia(); // Recarrega os dados da ocorrência
    }
  };
  const downloadDocumento = (documentoId, fileName) => {
    ocorrenciaService.baixarDocumento(protocolo, documentoId, fileName);
  };

  const formatCPF = (cpf) => {
    if (!cpf) return "Não informado";
    const cleaned = cpf.replace(/\D/g, "");
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  };

  const getStatusBadgeClass = (status) => {
    const statusConfig = {
      aberto: "bg-primary",
      pendente_documentos: "bg-warning text-dark",
      pendente_setor: "bg-info",
      pendente_demandante: "bg-secondary",
      finalizado: "bg-success",
    };
    return statusConfig[status] || "bg-dark";
  };
// Função para pegar a classe do badge baseado no status_id
const getStatusBadgeClassByStatusId = (statusId) => {
  const statusConfig = {
    1: "bg-primary",
    2: "bg-info",
    3: "bg-warning text-dark",
    4: "bg-secondary",
    5: "bg-danger",
    6: "bg-purple",
  };
  return statusConfig[statusId] || "bg-secondary";
};

// Função para pegar o progresso baseado no status_id
const getStatusProgress = (statusId) => {
  const progressMap = {
    1: 25,  // Aberto - 25%
    2: 50,  // Encaminhada - 50%
    3: 75,  // Pendente - 75%
    4: 100, // Finalizado - 100%
    5: 60,  // Pendente Ouvidoria - 60%
    6: 40,  // Questionamento Benef. Pendente - 40%
  };
  return progressMap[statusId] || 0;
};

// Função para pegar a classe da barra de progresso
const getProgressBarClass = (statusId) => {
  const classMap = {
    1: "bg-primary",
    2: "bg-info",
    3: "bg-warning",
    4: "bg-success",
    5: "bg-danger",
    6: "bg-purple",
  };
  return classMap[statusId] || "bg-secondary";
};
  const getStatusLabel = (status) => {
    const statusLabels = {
      1: "Aberto",
      2: "Encaminhada outro setor",
      6: "Questionamento Benef. Pendente",
      5: "Pendente Ouvidoria",
      3: "Pendente Manifestante",
    };
    return statusLabels[status] || status || "N/A";
  };

  return (
    <div className="d-flex">
      {/* Sidebar Lateral */}
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
                  handleMenuClick("Consultar Processos");
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
                  handleMenuClick("Relatórios");
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
                  handleMenuClick("Configurações");
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
                  handleMenuClick("Usuários");
                }}
              >
                <i className="bi bi-people me-2"></i>
                Usuários
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-grow-1">
        {/* Header Superior */}
        <div className="bg-white border-bottom p-3">
          <div className="row align-items-center">
            <div className="col">
              <h4 className="mb-0">Gerenciamento de Ocorrências</h4>
            </div>
            <div className="col-auto position-relative">
              <div
                className="d-flex align-items-center cursor-pointer p-2 rounded"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="bg-light border rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="bi bi-person text-dark fs-5"></i>
                </div>
                <i
                  className={`bi bi-chevron-down ms-1 ${showUserMenu ? "rotate-180" : ""
                    }`}
                ></i>
              </div>

              {showUserMenu && (
                <div
                  className="position-absolute end-0 mt-2 bg-white rounded shadow-lg border"
                  style={{ width: "250px", zIndex: 1000 }}
                >
                  <div className="p-3 border-bottom">
                    <div className="d-flex align-items-center">
                      <div
                        className="bg-light border rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{ width: "45px", height: "45px" }}
                      >
                        <i className="bi bi-person text-dark fs-5"></i>
                      </div>
                      <div>
                        <h6 className="mb-0">{userInfo.name}</h6>
                        <small className="text-muted">{userInfo.group}</small>
                        <br />
                        <small className="text-muted">{userInfo.email}</small>
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
                      <i className="bi bi-key me-3"></i>
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
                      <i className="bi bi-box-arrow-right me-3"></i>
                      <div>
                        <div>Sair</div>
                        <small className="text-muted">Encerrar sessão</small>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card de Ações */}
        <div className="container-fluid mt-3">
          <div className="card bg-success text-white mb-4">
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h5 className="card-title mb-0">Ações da Ocorrência</h5>
                </div>
                <div className="col-auto">
                  <div
                    className="btn-group"
                    role="group"
                    style={{ overflow: "visible" }}
                  >                    <button
                    type="button"
                    className="btn btn-light btn-sm me-1 border"
                    onClick={() => setShowSendToSectorModal(true)}
                  >
                      <i className="bi bi-send me-1"></i>
                      Enviar Demanda para outro setor
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm me-1 border"
                      onClick={scrollToBottom}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Alterar dados
                    </button>
                    <div className="position-relative d-inline-block">
  <button
    type="button"
    className="btn btn-light btn-sm me-1 border"
    onClick={handleOpenResponderComentarios}
  >
    <i className="bi bi-chat me-1"></i>
    Responder Comentários
  </button>

  {notificationCount > 0 && (
    <span
      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      style={{ zIndex: 10 }}
    >
      {notificationCount}
    </span>
  )}
</div>
                    <button
                      type="button"
                      className="btn btn-light btn-sm me-1 border"
                      onClick={handleOpenQuestionarBeneficiario}
                    >
                      <i className="bi bi-question-circle me-1"></i>
                      Questionar o Manifestante
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm me-1"
                      onClick={handleOpenFinalizarDemanda}
                    >
                      <i className="bi bi-check-circle me-1"></i>
                      Finalizar demanda
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal para Responder Comentários */}
          {showResponderComentariosModal && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">
                      <i className="bi bi-chat-dots me-2"></i>
                      Responder Comentários
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowResponderComentariosModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Seção de Comentários Existentes */}
                    <div className="mb-4">
                      <h6 className="text-success mb-3">
                        <i className="bi bi-chat-square-text me-2"></i>
                        Comentários do Beneficiário
                      </h6>

                      {loadingComentarios ? (
                        <div className="text-center py-3">
                          <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Carregando comentários...</span>
                          </div>
                          <p className="mt-2 text-muted">Carregando comentários...</p>
                        </div>
                      ) : comentarios.length > 0 ? (
                        <div className="border rounded p-3 bg-light">
                          {comentarios.map((comentario, index) => (
                            <div key={index} className="mb-3 pb-3 border-bottom">
                              <div className="d-flex justify-content-between align-items-start mb-2">
                                <strong className="text-primary">
                                  {comentario.name || "Beneficiário"}
                                </strong>
                                <small className="text-muted">
                                  {comentario.created_at ?
                                    new Date(comentario.created_at).toLocaleString('pt-BR') :
                                    "Data não disponível"}
                                </small>
                              </div>
                              <p className="mb-0">{comentario.content}</p>

                              {/* Respostas anteriores */}
                              {comentario.respostas && comentario.respostas.length > 0 && (
                                <div className="mt-2 ms-4 p-2 bg-white rounded border">
                                  <small className="text-success fw-bold">Respostas anteriores:</small>
                                  {comentario.respostas.map((resposta, respIndex) => (
                                    <div key={respIndex} className="mt-1">
                                      <small className="text-muted">
                                        <strong>{resposta.usuario}</strong> ({new Date(resposta.data).toLocaleString('pt-BR')}):
                                      </small>
                                      <p className="mb-0 small">{resposta.resposta}</p>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 border rounded bg-light">
                          <i className="bi bi-chat-square text-muted" style={{ fontSize: "2rem" }}></i>
                          <p className="text-muted mt-2">Nenhum comentário encontrado para esta ocorrência.</p>
                        </div>
                      )}
                    </div>

                    {/* Seção de Resposta */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Sua Resposta</label>
                      <textarea
                        className="form-control"
                        name="resposta"
                        value={responderComentariosData.resposta}
                        onChange={handleResponderComentariosChange}
                        rows="6"
                        placeholder="Digite sua resposta para o beneficiário..."
                        required
                      ></textarea>
                    </div>
                    <div className="alert alert-info">
                      <small>
                        <i className="bi bi-info-circle me-2"></i>
                        A resposta será enviada para o beneficiário através do canal de comunicação preferencial.
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowResponderComentariosModal(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleResponderComentarios}
                      disabled={!responderComentariosData.resposta.trim()}
                    >
                      <i className="bi bi-send me-1"></i>
                      Enviar Resposta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Questionar Beneficiário */}
          {showQuestionarBeneficiarioModal && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">
                      <i className="bi bi-question-circle me-2"></i>
                      Questionar o Manifestante
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowQuestionarBeneficiarioModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* Informações da Ocorrência */}
                    <div className="mb-4">
                      <h6 className="text-info mb-3">
                        <i className="bi bi-info-circle me-2"></i>
                        Informações da Ocorrência
                      </h6>
                      <div className="border rounded p-3 bg-light">
                        <div className="row">
                          <div className="col-md-6">
                            <strong>Protocolo:</strong> {protocolo || ocorrenciaId}
                          </div>
                          <div className="col-md-6">
                            <strong>Manifestante:</strong> {formData.nome || "Não informado"}
                          </div>
                          <div className="col-md-6 mt-2">
                            <strong>CPF:</strong> {formatCPF(formData.cpf)}
                          </div>
                          <div className="col-md-6 mt-2">
                            <strong>Cartão:</strong> {formData.cartao_beneficiario || "Não informado"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Seção de Pergunta */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Seu questionamento</label>
                      <textarea
                        className="form-control"
                        name="pergunta"
                        value={questionarBeneficiarioData.pergunta}
                        onChange={handleQuestionarBeneficiarioChange}
                        rows="6"
                        placeholder="Digite seu questionamento para o beneficiário..."
                        required
                      ></textarea>
                    </div>

                    {/* Seção de Anexos */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Anexos (Opcional)</label>

                      <input
                        type="file"
                        className="form-control mb-2"
                        multiple
                        onChange={handleAdicionarArquivos}
                      />

                      {/* Lista de arquivos selecionados */}
                      {questionarBeneficiarioData.arquivos.length > 0 && (
                        <div className="mt-3">
                          <h6 className="text-muted mb-2">Arquivos selecionados:</h6>
                          <div className="border rounded p-2 bg-light">
                            {questionarBeneficiarioData.arquivos.map((arquivo, index) => (
                              <div key={index} className="d-flex justify-content-between align-items-center py-1 border-bottom">
                                <div className="d-flex align-items-center">
                                  <i className="bi bi-file-earmark me-2 text-primary"></i>
                                  <span className="small">{arquivo.name}</span>
                                  <span className="badge bg-secondary ms-2">
                                    {(arquivo.size / 1024 / 1024).toFixed(2)} MB
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleRemoverArquivo(index)}
                                >
                                  <i class="bi bi-trash"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                          <small className="text-muted">
                            Total de arquivos: {questionarBeneficiarioData.arquivos.length}
                          </small>
                        </div>
                      )}
                    </div>

                    <div className="alert alert-info">
                      <small>
                        <i className="bi bi-info-circle me-2"></i>
                        A pergunta será enviada para o manifestante através do Email.
                        O manifestante será notificado para responder sua dúvida.
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowQuestionarBeneficiarioModal(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn bg-success text-white"
                      onClick={handleQuestionarBeneficiario}
                      disabled={!questionarBeneficiarioData.pergunta.trim()}
                    >
                      <i className="bi bi-send me-1"></i>
                      Enviar Pergunta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Modal para Enviar para Outro Setor */}
          {showSendToSectorModal && (
            <div
              className="modal show d-block"
              tabIndex="-1"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-success text-white">
                    <h5 className="modal-title">
                      <i className="bi bi-send me-2"></i>
                      Enviar Demanda para Outro Setor
                    </h5>
                    <button
                      type="button"
                      className="btn-close btn-close-white"
                      onClick={() => setShowSendToSectorModal(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Selecione o Setor</label>
                      <select
                        className="form-select"
                        name="setor"
                        value={sendToSectorData.setor}
                        onChange={handleSendToSectorChange}
                        required
                      >
                        {setorOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Observações</label>
                      <textarea
                        className="form-control"
                        name="observacao"
                        value={sendToSectorData.observacao}
                        onChange={handleSendToSectorChange}
                        rows="4"
                        placeholder="Digite observações sobre o encaminhamento para o setor..."
                      ></textarea>
                    </div>
                    <div className="alert alert-info">
                      <small>
                        <i className="bi bi-info-circle me-2"></i>A demanda será
                        encaminhada para o setor selecionado e ficará disponível
                        para análise.
                      </small>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowSendToSectorModal(false)}
                    >
                      <i className="bi bi-x-circle me-1"></i>
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleSendToSector}
                      disabled={!sendToSectorData.setor}
                    >
                      <i className="bi bi-send me-1"></i>
                      Enviar para Setor
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formulário de Ocorrência */}
          <div className="container my-4">
            <h2 className="mb-4 text-center">Dados da Ocorrência</h2>

            {/* Buscar Ocorrência - Com Filtros */}
            <div
              style={{ backgroundColor: "#cadbcf" }}
              className="card p-3 shadow-sm border-0 mb-4"
            >
              <div className="card-body">
                <h5 className="card-title text-success">
                  🔍 Buscar Ocorrência
                </h5>

                {/* Busca por ID */}
                <div className="row g-3 align-items-end mb-4">
                  <div className="col-md-8">
                    <label className="form-label">
                      Protocolo da Ocorrência
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Digite o Protocolo da ocorrência"
                      value={ocorrenciaId}
                      onChange={(e) => setOcorrenciaId(e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <button
                      type="button"
                      className="btn btn-success w-100"
                      onClick={fetchOcorrencia}
                      disabled={loading || !ocorrenciaId}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Carregando...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-search me-2"></i>
                          Buscar por ID
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Filtros de Busca */}
                <div className="border-top pt-3">
                  <h6 className="text-muted mb-3">Buscar por Filtros</h6>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">CPF</label>
                      <input
                        type="text"
                        className="form-control"
                        name="cpf"
                        placeholder="Digite o CPF"
                        value={searchFilters.cpf}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Cartão do Beneficiário
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="cartao_beneficiario"
                        placeholder="Digite o cartão"
                        value={searchFilters.cartao_beneficiario}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Status</label>
                      <select
                        className="form-select"
                        name="status"
                        value={searchFilters.status}
                        onChange={handleFilterChange}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control"
                        name="nome"
                        placeholder="Digite o nome"
                        value={searchFilters.nome}
                        onChange={handleFilterChange}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">E-mail</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Digite o e-mail"
                        value={searchFilters.email}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>

                  {/* Botões de Ação dos Filtros */}
                  <div className="row g-3 mt-2">
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-outline-success w-100"
                        onClick={searchOcorrencias}
                        disabled={searching}
                      >
                        {searching ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Buscando...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-funnel me-2"></i>
                            Buscar com Filtros
                          </>
                        )}
                      </button>
                    </div>
                    <div className="col-md-6">
                      <button
                        type="button"
                        className="btn btn-outline-secondary w-100"
                        onClick={clearFilters}
                      >
                        <i className="bi bi-eraser me-2"></i>
                        Limpar Filtros
                      </button>
                    </div>
                  </div>
                </div>

                {/* Resultados da Busca */}
                {showResults && searchResults.length > 0 && (
                  <div className="mt-4">
                    <h6 className="text-success mb-3">
                      Resultados da Busca ({searchResults.length} ocorrência
                      {searchResults.length !== 1 ? "s" : ""} encontrada
                      {searchResults.length !== 1 ? "s" : ""})
                    </h6>

                    {searchResults.length === 1 ? (
                      <div className="table-responsive">
                        <table className="table table-sm table-hover">
                          <thead>
                            <tr>
                              <th>Protocolo</th>
                              <th>Nome</th>
                              <th>CPF</th>
                              <th>Cartão</th>
                              <th>Status</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchResults.map((ocorrencia, index) => (
                              <tr key={index}>
                                <td>
                                  {ocorrencia.protocolo || ocorrencia._id}
                                </td>
                                <td>{ocorrencia.nome}</td>
                                <td>{formatCPF(ocorrencia.cpf)}</td>
                                <td>
                                  {ocorrencia.cartao_beneficiario ||
                                    "Não informado"}
                                </td>
                                <td>
                                  <span
                                    className={`badge ${getStatusBadgeClass(
                                      ocorrencia.status
                                    )}`}
                                  >
                                    {getStatusLabel(ocorrencia.status_id)}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-outline-primary"
                                    onClick={() =>
                                      loadOcorrenciaFromResults(ocorrencia)
                                    }
                                  >
                                    <i className="bi bi-pencil"></i> Editar
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="row g-3">
                        {searchResults.map((ocorrencia, index) => (
                          <div key={index} className="col-md-6 col-lg-4">
                            <div className="card h-100 border-0 shadow-sm">
                              <div className="card-body">
                                <div className="d-flex justify-content-between align-items-start mb-2">
                                  <h6 className="card-title text-primary mb-0">
                                    #{ocorrencia.protocolo || ocorrencia._id}
                                  </h6>
                                  <span
                                    className={`badge ${getStatusBadgeClass(
                                      ocorrencia.status
                                    )}`}
                                  >
                                    {getStatusLabel(ocorrencia.status_id)}
                                  </span>
                                </div>

                                <div className="mb-3">
                                  <small className="text-muted">
                                    Paciente Atendido:
                                  </small>
                                  <p className="mb-1 fw-semibold">
                                    {ocorrencia.nome_cliente || "Não informado"}
                                  </p>
                                </div>

                                <div className="mb-3">
                                  <small className="text-muted">
                                    Manifestante:
                                  </small>
                                  <p className="mb-1 fw-semibold">
                                    {ocorrencia.nome || "Não informado"}
                                  </p>
                                </div>

                                <div className="row g-2">
                                  <div className="col-6">
                                    <small className="text-muted">CPF:</small>
                                    <p className="mb-0 small">
                                      {formatCPF(ocorrencia.cpf)}
                                    </p>
                                  </div>
                                  <div className="col-6">
                                    <small className="text-muted">
                                      Cartão:
                                    </small>
                                    <p className="mb-0 small">
                                      {ocorrencia.cartao_beneficiario || "N/I"}
                                    </p>
                                  </div>
                                </div>

                                {ocorrencia.email && (
                                  <div className="mt-2">
                                    <small className="text-muted">
                                      E-mail:
                                    </small>
                                    <p className="mb-0 small text-truncate">
                                      {ocorrencia.email}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="card-footer bg-transparent border-top-0 pt-0">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-primary w-100"
                                  onClick={() =>
                                    loadOcorrenciaFromResults(ocorrencia)
                                  }
                                >
                                  <i className="bi bi-pencil me-1"></i>
                                  Selecionar para Editar
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
{/* Card de Status da Ocorrência */}
{ocorrenciaId && (
  <div className="card shadow-sm border-0 mb-4">
    <div className="card-body">
      <div className="row align-items-center">
        <div className="col-md-8">
          <h5 className="card-title text-success mb-3">
            <i className="bi bi-info-circle-fill me-2"></i>
            Status da Ocorrência
          </h5>
          
          <div className="d-flex align-items-center">
            <div className="me-4">
              <span className="text-muted">Protocolo:</span>
              <strong className="ms-2">{protocolo || ocorrenciaId}</strong>
            </div>
            
            <div>
              <span className="text-muted">Status Atual:</span>
              <span className={`badge ${getStatusBadgeClassByStatusId(formData.status_id)} ms-2 fs-6 p-2`}>
                <i className="bi bi-circle-fill me-1" style={{ fontSize: "0.7rem" }}></i>
                {getStatusLabel(formData.status_id)}
              </span>
            </div>
          </div>
          
          {/* Barra de Progresso do Status */}
          <div className="mt-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-muted">Progresso</small>
              <small className="text-muted">{getStatusProgress(formData.status_id)}%</small>
            </div>
            <div className="progress" style={{ height: "8px" }}>
              <div 
                className={`progress-bar ${getProgressBarClass(formData.status_id)}`}
                role="progressbar"
                style={{ width: `${getStatusProgress(formData.status_id)}%` }}
                aria-valuenow={getStatusProgress(formData.status_id)}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
          <div className="bg-light rounded p-3">
            <small className="text-muted d-block">Última atualização</small>
            <strong className="text-success">
              {formData.updated_at ? new Date(formData.updated_at).toLocaleString('pt-BR') : 'Não informado'}
            </strong>
          </div>
        </div>
      </div>
      
      {/* Timeline de Status */}
      <div className="mt-4 pt-2">
        <h6 className="text-muted mb-3">
          <i className="bi bi-clock-history me-2"></i>
          Histórico de Status
        </h6>
        <div className="timeline">
          <div className={`timeline-item ${formData.status_id >= 1 ? 'completed' : ''}`}>
            <div className="timeline-icon">
              <i className="bi bi-file-text"></i>
            </div>
            <div className="timeline-content">
              <strong>Abertura da Ocorrência</strong>
              <p className="mb-0 small text-muted">
                {formData.created_at ? new Date(formData.created_at).toLocaleString('pt-BR') : 'Data não informada'}
              </p>
            </div>
          </div>
          
          <div className={`timeline-item ${formData.status_id >= 2 ? 'completed' : formData.status_id === 1 ? 'active' : ''}`}>
            <div className="timeline-icon">
              <i className="bi bi-send"></i>
            </div>
            <div className="timeline-content">
              <strong>Análise Inicial</strong>
              <p className="mb-0 small text-muted">Em andamento</p>
            </div>
          </div>
          
          <div className={`timeline-item ${formData.status_id >= 3 ? 'completed' : formData.status_id === 2 ? 'active' : ''}`}>
            <div className="timeline-icon">
              <i className="bi bi-chat"></i>
            </div>
            <div className="timeline-content">
              <strong>Em Tratamento</strong>
              <p className="mb-0 small text-muted">Setor responsável</p>
            </div>
          </div>
          
          <div className={`timeline-item ${formData.status_id >= 4 ? 'completed' : formData.status_id === 3 ? 'active' : ''}`}>
            <div className="timeline-icon">
              <i className="bi bi-check2-circle"></i>
            </div>
            <div className="timeline-content">
              <strong>Finalização</strong>
              <p className="mb-0 small text-muted">Aguardando conclusão</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
            {/* DADOS INTERNOS */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">🔒 Dados Internos</h5>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">Tipo de Contrato</label>
                    <select
                      className="form-select"
                      name="tipo_contrato"
                      value={formData.tipo_contrato}
                      onChange={handleChange}
                    >
                      {tipoContratoOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Tipo de Demandante</label>
                    <select
                      className="form-select"
                      name="tipo_demandante"
                      value={formData.tipo_demandante}
                      onChange={handleChange}
                    >
                      {tipoDemandanteOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Canal Previamente Responsavel</label>
                    <select
                      className="form-select"
                      name="canal_interno"
                      value={formData.setor_interno}
                      onChange={handleChange}
                    >
                      {canalInternoOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label">Observações Internas</label>
                    <textarea
                      className="form-control"
                      name="observacoes_internas"
                      value={formData.observacoes_internas}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Digite observações internas sobre a ocorrência..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* DADOS DO MANIFESTANTE */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  👤 Dados do Manifestante
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nome do Manifestante </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      Nome do Cliente Atendido{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="nome_cliente"
                      value={formData.nome_cliente}
                      onChange={handleChange}
                      required
                    />
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
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">CPF</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cpf"
                      value={formData.cpf}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* CONTATO */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  ☎️ Informações de Contato
                </h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">E-mail </label>
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
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DETALHES DA OCORRÊNCIA */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  📝 Detalhes da Ocorrência
                </h5>
                <div className="row g-3">

                  <div className="col-md-4">
                    <label className="form-label">Unidade </label>
                    <select
                      className="form-select"
                      name="unidade_id"
                      value={formData.unidade_id}
                      onChange={handleChange}
                      required
                    >
                      {unidadeOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Canal </label>
                    <select
                      className="form-select"
                      name="canal_id"
                      value={formData.canal_id}
                      onChange={handleChange}
                      required
                    >
                      {canalOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
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
                        id="reanaliseCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="reanaliseCheck"
                      >
                        Reanálise
                      </label>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <label className="form-label">Manifestação Anterior</label>
                    <input
                      type="text"
                      className="form-control"
                      name="manifestacao_ant"
                      value={formData.manifestacao_ant}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DESCRIÇÃO */}
      
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  🗒️ Descrição da Ocorrência
                </h5>
                <textarea
                  className="form-control"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Descreva detalhadamente a ocorrência..."
                ></textarea>
              </div>
            </div>

            {/* OBJETIVO */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  🎯 Objetivo da Ocorrência
                </h5>
                <textarea
                  className="form-control"
                  name="objetivo"
                  value={formData.objetivo || ""}  
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* DOCUMENTOS ANEXOS */}
            <div className="card p-3 shadow-sm border-0 mb-4">
              <div className="card-body">
                <h5 className="card-title text-success">
                  📎 Documentos Anexos
                </h5>

                {loadingDocumentos ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">
                        Carregando documentos...
                      </span>
                    </div>
                    <p className="mt-2 text-muted">Carregando documentos...</p>
                  </div>
                ) : documentos.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <tbody>
                        {documentos.map((documento, index) => (
                          <tr
                            key={index}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <td className="border-0 flex-grow-1 d-flex align-items-center">
                              <i className="bi bi-file-earmark me-2"></i>
                              {documento.nome || `Documento ${index + 1}`}
                            </td>

                            <td className="border-0 text-end">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-success"
                                onClick={() =>
                                  downloadDocumento(
                                    documento.id || documento._id,
                                    documento.nome ||
                                    `documento-${documento.id || documento._id
                                    }`
                                  )
                                }
                              >
                                <i className="bi bi-download me-1"></i>
                                Baixar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <i
                      className="bi bi-folder-x text-muted"
                      style={{ fontSize: "3rem" }}
                    ></i>
                    <p className="text-muted mt-2">
                      Nenhum documento anexado a esta ocorrência.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="text-center mt-4">
              <button
                type="button"
                className="btn btn-success px-5 me-3"
                onClick={updateOcorrencia}
                disabled={updating || !ocorrenciaId}
              >
                {updating ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Atualizando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-2"></i>
                    Atualizar Ocorrência
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn btn-outline-secondary px-5"
                onClick={() => {
                  setOcorrenciaId("");
                  setFormData({
                    reanalise: "false",
                    classificacao_id: "",
                    unidade_id: "",
                    descricao: "",
                    cartao_beneficiario: "",
                    manifestacao_ant: "",
                    identificacao_id: "",
                    forma_resposta_id: "",
                    assunto_id: "",
                    sub_assunto_id: "",
                    nome: "",
                    nome_cliente: "",
                    email: "",
                    cpf: "",
                    telefone: "",
                    canal_id: "",
                    tipo_contrato: "",
                    tipo_demandante: "",
                    canal_interno: "",
                    observacoes_internas: "",
                    objetivo:"",
                   
                  });
                  setSearchFilters({
                    cpf: "",
                    cartao_beneficiario: "",
                    status: "",
                    nome: "",
                    email: "",
                  });
                  setSearchResults([]);
                  setShowResults(false);
                  setDocumentos([]);
                }}
              >
                <i className="bi bi-x-circle me-2"></i>
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      </div>
                     
      
      {/* MODAL DE FINALIZAR DEMANDA - ADICIONE AQUI */}
      <ModalFinalizarDemanda
        show={showFinalizarModal}
        onHide={() => setShowFinalizarModal(false)}
        protocolo={protocolo || ocorrenciaId || ""}
        demandaId={ocorrenciaId || ""}
        onSuccess={handleFinalizarSucesso}
      />


      <style jsx>{`
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
      `}</style>
    </div>
  );
}