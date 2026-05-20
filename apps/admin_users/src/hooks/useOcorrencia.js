import { useState, useEffect } from "react";

export const useOcorrencia = () => {
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
    tipo_contrato: "",
    tipo_demandante: "",
    canal_interno: "",
    desmembrar: false,
    observacoes_internas: "",
    objetivo: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFilterChange = (e) => {
    let { name, value } = e.target;
    if (name === 'cpf') {
      value = value.replace(/[.-]/g, "")
    }
    setSearchFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendToSectorChange = (e) => {
    const { name, value } = e.target;
    setSendToSectorData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResponderComentariosChange = (e) => {
    const { name, value } = e.target;
    setResponderComentariosData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionarBeneficiarioChange = (e) => {
    const { name, value } = e.target;
    setQuestionarBeneficiarioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdicionarArquivos = (e) => {
    const files = Array.from(e.target.files);
    setQuestionarBeneficiarioData(prev => ({
      ...prev,
      arquivos: [...prev.arquivos, ...files]
    }));
  };

  const handleRemoverArquivo = (index) => {
    setQuestionarBeneficiarioData(prev => ({
      ...prev,
      arquivos: prev.arquivos.filter((_, i) => i !== index)
    }));
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

  return {
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
  };
};