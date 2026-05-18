import React, { useState, useEffect } from "react";

export default function New() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [searching, setSearching] = useState(false);
  const [ocorrenciaId, setOcorrenciaId] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [documentos, setDocumentos] = useState([]);
  const [loadingDocumentos, setLoadingDocumentos] = useState(false);
  const [protocolo, setProtocolo] = useState("");
  const [showSendToSectorModal, setShowSendToSectorModal] = useState(false);
  const [showResponderComentariosModal, setShowResponderComentariosModal] = useState(false);
  const [showQuestionarBeneficiarioModal, setShowQuestionarBeneficiarioModal] = useState(false);
  
  const [sendToSectorData, setSendToSectorData] = useState({
    setor: "",
    observacao: "",
  });

  const [responderComentariosData, setResponderComentariosData] = useState({
    resposta: "",
    anexos: [],
  });

  const [questionarBeneficiarioData, setQuestionarBeneficiarioData] = useState({
    pergunta: "",
    arquivos: [],
  });

  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(false);

  const [searchFilters, setSearchFilters] = useState({
    cpf: "",
    cartao_beneficiario: "",
    status: 0,
    nome: "",
    email: "",
  });

  const [formData, setFormData] = useState({
    protocolo: "",
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
    // Novos campos para Dados Internos
    tipo_contrato: "",
    tipo_demandante: "",
    canal_interno: "",
    desmembrar: false,
    observacoes_internas: "",
  });

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
    { value: "individual", label: "Individual" },
    { value: "empresarial", label: "Empresarial" },
    { value: "familiar", label: "Familiar" },
    { value: "coletivo", label: "Coletivo" },
  ];

  const tipoDemandanteOptions = [
    { value: "", label: "Selecione o tipo de demandante" },
    { value: "beneficiario", label: "Beneficiário" },
    { value: "dependente", label: "Dependente" },
    { value: "prestador", label: "Prestador" },
    { value: "fornecedor", label: "Fornecedor" },
    { value: "outros", label: "Outros" },
  ];

  const canalInternoOptions = [
    { value: "", label: "Selecione o canal interno" },
    { value: "ouvidoria", label: "Ouvidoria" },
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Função para buscar documentos da ocorrência
  const fetchDocumentos = async (protocolo) => {
    if (!ocorrenciaId) return;

    setLoadingDocumentos(true);
    try {
      const response = await fetch(
        `http://192.168.30.26:8090/ocurrence/${protocolo}/documents`
      );
      const data = await response.json();

      if (data.status === 404) {
        setDocumentos([]);
        alert("Erro ao buscar os Documentos anexados!");
      } else {
        setDocumentos(Array.isArray(data) ? data : [data]);
      }
    } catch (error) {
      console.error("Erro ao buscar documentos:", error);
      setDocumentos([]);
    } finally {
      setLoadingDocumentos(false);
    }
  };

  // Função para baixar documento
  const downloadDocumento = async (documentoId, fileName) => {
    try {
      const response = await fetch(
        `http://192.168.30.26:8090/ocurrence/${protocolo}/download`
      );

      if (!response.ok) {
        throw new Error("Erro ao baixar arquivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = protocolo || `documento-${documentoId}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar documento:", error);
      alert(`Erro ao baixar documento: ${error.message}`);
    }
  };

  const fetchOcorrencia = async (id) => {
    if (!id) {
      alert("Por favor, informe o Protocolo da ocorrência");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://192.168.30.26:8090/ocurrence/${id}`);

      const data = await response.json();
      if (data.status === 404) {
        throw new Error(data.error);
      }

      setProtocolo(data.protocolo);
      setOcorrenciaId(data.protocolo); 

      setFormData({
        reanalise: data.reanalise || "false",
        classificacao_id: data.classificacao_id || "",
        unidade_id: data.unidade_id || "",
        descricao: data.descricao || "",
        cartao_beneficiario: data.cartao_beneficiario || "",
        manifestacao_ant: data.manifestacao_ant || "",
        identificacao_id: data.identificacao_id || "",
        forma_resposta_id: data.forma_resposta_id || "",
        assunto_id: data.assunto_id || "",
        sub_assunto_id: data.sub_assunto_id || "",
        nome: data.nome || "",
        nome_cliente: data.nome_cliente || "",
        email: data.email || "",
        cpf: data.cpf || "",
        telefone: data.telefone || "",
        canal_id: data.canal_id || "",
        // Novos campos para Dados Internos
        tipo_contrato: data.tipo_contrato || "",
        tipo_demandante: data.tipo_demandante || "",
        canal_interno: data.canal_interno || "",
        desmembrar: data.desmembrar || false,
        observacoes_internas: data.observacoes_internas || "",
      });

      // Buscar documentos em simultâneo
      fetchDocumentos(data.protocolo);

      alert("Ocorrência carregada com sucesso!");
    } catch (error) {
      console.error("Erro ao buscar ocorrência:", error);
      alert(`Erro ao carregar ocorrência: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const searchOcorrencias = async () => {
    setSearching(true);
    setShowResults(false);

    try {
      const queryParams = new URLSearchParams();

      if (searchFilters.cpf) queryParams.append("cpf", searchFilters.cpf);
      if (searchFilters.cartao_beneficiario)
        queryParams.append(
          "cartao_beneficiario",
          searchFilters.cartao_beneficiario
        );
      if (searchFilters.status)
        queryParams.append("status", searchFilters.status);
      if (searchFilters.nome) queryParams.append("nome", searchFilters.nome);
      if (searchFilters.email) queryParams.append("email", searchFilters.email);

      const queryString = queryParams.toString();
      const url = queryString
        ? `http://192.168.30.26:8090/ocurrence/filter/?${queryString}`
        : `http://192.168.30.26:8090/ocurrence/filter`;

      const response = await fetch(url);

      const data = await response.json();
      if (data.status === 404) {
        throw new Error(data.error);
      }
      setSearchResults(Array.isArray(data) ? data : [data]);
      setShowResults(true);
      setFormData.protocolo = data.protocolo
      if (Array.isArray(data) && data.length === 0) {
        alert("Nenhuma ocorrência encontrada com os filtros informados.");
      }
    } catch (error) {
      console.error("Erro ao buscar ocorrências:", error);
      alert(`Erro ao buscar ocorrências: ${error.message}`);
    } finally {
      setSearching(false);
    }
  };

  const updateOcorrencia = async () => {
    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para atualizar");
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch(
        `http://192.168.30.26:8090/ocurrence/${ocorrenciaId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      alert("Ocorrência atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar ocorrência:", error);
      alert(`Erro ao atualizar ocorrência: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // Função para carregar os comentários da ocorrência
  const fetchComentarios = async () => {
    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para visualizar comentários");
      return;
    }

    setLoadingComentarios(true);
    try {
      const response = await fetch(`http://192.168.30.26:8090/occurrence/${ocorrenciaId}/comments`);

      const data = await response.json();
      setComentarios(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoadingComentarios(false);
    }
  };

  const handleSendToSector = async () => {
    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para enviar para outro setor");
      return;
    }

    if (!sendToSectorData.setor) {
      alert("Por favor, selecione um setor para enviar a demanda");
      return;
    }

    try {
      const protocoloParaEnviar = protocolo || ocorrenciaId;
      
      if (!protocoloParaEnviar) {
        alert("Protocolo não encontrado. Por favor, recarregue a ocorrência.");
        return;
      }

      const payload = {
        protocolo: protocoloParaEnviar,
        observacao: sendToSectorData.observacao,
        usuario_envio: userInfo.name,
      };
          
      const response = await fetch(
        "http://192.168.30.26:8090/occurrence/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      alert(
        `Demanda enviada com sucesso para o setor: ${sendToSectorData.setor}`
      );

      setShowSendToSectorModal(false);
      setSendToSectorData({
        setor: "",
        observacao: "",
      });
    } catch (error) {
      console.error("Erro ao enviar para outro setor:", error);
      alert(`Erro ao enviar para outro setor: ${error.message}`);
    }
  };

  // Função para abrir o modal de responder comentários
  const handleOpenResponderComentarios = () => {
    if (!ocorrenciaId) {
      alert("Por favor, carregue uma ocorrência primeiro");
      return;
    }
    fetchComentarios();
    setShowResponderComentariosModal(true);
  };

  // Função para abrir o modal de questionar beneficiário
  const handleOpenQuestionarBeneficiario = () => {
    if (!ocorrenciaId) {
      alert("Por favor, carregue uma ocorrência primeiro");
      return;
    }
    setShowQuestionarBeneficiarioModal(true);
  };

  // Função para enviar a resposta
  const handleResponderComentarios = async () => {
    if (!responderComentariosData.resposta.trim()) {
      alert("Por favor, digite uma resposta");
      return;
    }

    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para responder");
      return;
    }

    try {
      const payload = {
        protocolo: ocorrenciaId,
        resposta: responderComentariosData.resposta,
        usuario_resposta: userInfo.name,
      };

      const response = await fetch("http://192.168.30.26:8090/occurrence/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      alert("Resposta enviada com sucesso!");

      setShowResponderComentariosModal(false);
      setResponderComentariosData({
        resposta: "",
        anexos: [],
      });

      fetchComentarios();
    } catch (error) {
      console.error("Erro ao enviar resposta:", error);
      alert("Erro ao enviar resposta");
    }
  };

  // NOVA FUNÇÃO: Upload de arquivos para questionamento
  const uploadArquivosQuestionamento = async (arquivos) => {
    if (!arquivos || arquivos.length === 0) return [];

    const uploadedFiles = [];
    
    for (let file of arquivos) {
      const formData = new FormData();
      formData.append("protocol", ocorrenciaId);
      formData.append("file", file);

      try {
        const response = await fetch("http://192.168.30.26:8090/upload/questions", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedFiles.push({
            nome: file.name,
            url: result.url || `http://192.168.30.26:8090/uploads/${result.filename}`
          });
        } else {
          console.error(`Erro ao enviar arquivo ${file.name}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Erro ao enviar arquivo ${file.name}:`, error);
      }
    }

    return uploadedFiles;
  };

  // NOVA FUNÇÃO: Questionar beneficiário com anexos
  const handleQuestionarBeneficiario = async () => {
    if (!questionarBeneficiarioData.pergunta.trim()) {
      alert("Por favor, digite uma pergunta");
      return;
    }

    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para questionar");
      return;
    }

    try {
      // Primeiro upload dos arquivos se houver
      let arquivosUploaded = [];
      if (questionarBeneficiarioData.arquivos.length > 0) {
        arquivosUploaded = await uploadArquivosQuestionamento(questionarBeneficiarioData.arquivos);
      }

      // Enviar o questionamento
      const payload = {
        protocol: ocorrenciaId,
        question: questionarBeneficiarioData.pergunta,
        user_question: userInfo.name,
        anexos: arquivosUploaded
      };

      const response = await fetch("http://192.168.30.26:8090/occurrence/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      alert("Questionamento enviado com sucesso para o beneficiário!");

      setShowQuestionarBeneficiarioModal(false);
      setQuestionarBeneficiarioData({
        pergunta: "",
        arquivos: [],
      });
    } catch (error) {
      console.error("Erro ao enviar pergunta:", error);
      alert("Erro ao enviar pergunta");
    }
  };

  // NOVA FUNÇÃO: Adicionar arquivos ao questionamento
  const handleAdicionarArquivos = (e) => {
    const files = Array.from(e.target.files);
    setQuestionarBeneficiarioData(prev => ({
      ...prev,
      arquivos: [...prev.arquivos, ...files]
    }));
  };

  // NOVA FUNÇÃO: Remover arquivo do questionamento
  const handleRemoverArquivo = (index) => {
    setQuestionarBeneficiarioData(prev => ({
      ...prev,
      arquivos: prev.arquivos.filter((_, i) => i !== index)
    }));
  };

  // Função para lidar com mudanças no formulário de resposta
  const handleResponderComentariosChange = (e) => {
    const { name, value } = e.target;
    setResponderComentariosData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com mudanças no formulário de questionar beneficiário
  const handleQuestionarBeneficiarioChange = (e) => {
    const { name, value } = e.target;
    setQuestionarBeneficiarioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadOcorrenciaFromResults = (ocorrencia) => {
    setOcorrenciaId(ocorrencia.protocolo || ocorrencia._id);
    setProtocolo(ocorrencia.protocolo || ocorrencia._id); 
    setFormData({
      reanalise: ocorrencia.reanalise || "false",
      classificacao_id: ocorrencia.classificacao_id || "",
      unidade_id: ocorrencia.unidade_id || "",
      descricao: ocorrencia.descricao || "",
      cartao_beneficiario: ocorrencia.cartao_beneficiario || "",
      manifestacao_ant: ocorrencia.manifestacao_ant || "",
      identificacao_id: ocorrencia.identificacao_id || "",
      forma_resposta_id: ocorrencia.forma_resposta_id || "",
      assunto_id: ocorrencia.assunto_id || "",
      sub_assunto_id: ocorrencia.sub_assunto_id || "",
      nome: ocorrencia.nome || "",
      nome_cliente: ocorrencia.nome_cliente || "",
      email: ocorrencia.email || "",
      cpf: ocorrencia.cpf || "",
      telefone: ocorrencia.telefone || "",
      canal_id: ocorrencia.canal_id || "",
      // Novos campos para Dados Internos
      tipo_contrato: ocorrencia.tipo_contrato || "",
      tipo_demandante: ocorrencia.tipo_demandante || "",
      canal_interno: ocorrencia.canal_interno || "",
      desmembrar: ocorrencia.desmembrar || false,
      observacoes_internas: ocorrencia.observacoes_internas || "",
    });

    fetchDocumentos(ocorrencia.protocolo || ocorrencia._protocolo);
    setShowResults(false);
    alert("Ocorrência carregada para edição!");
  };

  const clearFilters = () => {
    setSearchFilters({
      cpf: "",
      cartao_beneficiario: "",
      status: "",
      nome: "",
      email: "",
    });
    setSearchResults([]);
    setShowResults(false);
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

  const getStatusLabel = (status) => {
    const statusLabels = {
      1: "Aberto",
      pendente_documentos: "Pendente Documentos",
      pendente_setor: "Pendente Setor",
      pendente_demandante: "Pendente Demandante",
      finalizado: "Finalizado",
    };
    return statusLabels[status] || status || "N/A";
  };

  const handleSendToSectorChange = (e) => {
    const { name, value } = e.target;
    setSendToSectorData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  className={`bi bi-chevron-down ms-1 ${
                    showUserMenu ? "rotate-180" : ""
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
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={() => setShowSendToSectorModal(true)}
                    >
                      <i className="bi bi-send me-1"></i>
                      Enviar Demanda para outro setor
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={scrollToBottom}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Alterar dados
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={handleOpenResponderComentarios}
                    >
                      <i className="bi bi-chat me-1"></i>
                      Responder comentários
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={handleOpenQuestionarBeneficiario}
                    >
                      <i className="bi bi-question-circle me-1"></i>
                      Questionar o Beneficiário
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      onClick={() => handleMenuClick("Finalizar demanda")}
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

          {/* Modal para Questionar Beneficiário - REFEITO */}
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
                      Questionar o Beneficiário
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
                            <strong>Beneficiário:</strong> {formData.nome || "Não informado"}
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

                    {/* Seção de Anexos - REFEITA */}
                    <div className="mb-3">
                      <label className="form-label fw-bold">Anexos (Opcional)</label>
                      
                      <input
                        type="file"
                        className="form-control mb-2"
                        multiple
                        onChange={handleAdicionarArquivos}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
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
                                  <i className="bi bi-trash"></i>
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
                        A pergunta será enviada para o beneficiário através do canal de comunicação preferencial.
                        O beneficiário será notificado para responder sua dúvida.
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
                      className="btn btn-info text-white"
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

          {/* Resto do código permanece igual */}
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
                      onClick={() => fetchOcorrencia(ocorrenciaId)}
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
                    <label className="form-label">Canal</label>
                    <select
                      className="form-select"
                      name="canal_interno"
                      value={formData.canal_interno}
                      onChange={handleChange}
                    >
                      {canalInternoOptions.map((option) => (
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
                        name="desmembrar"
                        checked={formData.desmembrar}
                        onChange={handleChange}
                        id="desmembrarCheck"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="desmembrarCheck"
                      >
                        Desmembrar
                      </label>
                    </div>
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
                                      `documento-${
                                        documento.id || documento._id
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
                    // Novos campos para Dados Internos
                    tipo_contrato: "",
                    tipo_demandante: "",
                    canal_interno: "",
                    desmembrar: false,
                    observacoes_internas: "",
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