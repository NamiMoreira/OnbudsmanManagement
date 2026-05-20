
import { apiService } from './apiService';

export const ocorrenciaService = {
  async carregarOcorrencia(id, callbacks) {
    console.log('teste');
    
    const { 
      setLoading, 
      setProtocolo, 
      setOcorrenciaId, 
      setFormData, 
      fetchDocumentos 
    } = callbacks;
    
    try {
      setLoading(true);
      
      const response = await fetch(`http://192.168.30.26:8090/ocurrence/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      

      
      // Primeiro pegue como texto para debug
      const rawText = await response.text();
      
      let result;
      try {
        result = JSON.parse(rawText);
       
      } catch (jsonError) {
        throw new Error('Resposta da API não é JSON válido');
      }
      
      
      // Verifique se a resposta tem a estrutura esperada
      if (result.status && result.text && result.content) {
        
        if (result.status !== 200) {
          throw new Error(result.error || `Erro ${result.status}: ${result.text}`);
        }
        
        // Extraia os dados reais da ocorrência
        const data = result.content;
        
        if (!data) {
          throw new Error('Conteúdo da ocorrência está vazio');
        }
        
        // Atualizar estados com o protocolo
        const protocolo = data.protocolo || data.id || id;
        
        setOcorrenciaId(protocolo);
        setProtocolo(protocolo);
        
        // Mapear os dados para o formData - AJUSTE OS NOMES CONFORME SEU BANCO DE DADOS
        const formDataFormatado = {
          // Dados principais
          reanalise: data.reanalise ? "true" : "false",
          unidade_id: data.unidade_id?.toString() || "",
          descricao: data.descricao || "",
          cartao_beneficiario: data.cartao_beneficiario || "",
          manifestacao_ant: data.manifestacao_ant || "",
          identificacao_id: data.identificacao_id?.toString() || "",
          nome: data.nome || "",
          nome_cliente: data.nome_cliente || "",
          email: data.email || "",
          cpf: data.cpf || "",
          telefone: data.telefone || "",
          tipo_contrato_id: data.tipo_contrato || "",
          tipo_demandante: data.tipo_demandante || "",
          canal_interno: data.canal_interno || "",
          observacoes_internas: data.observacoes_internas || "",
          status_id: data.status_id?.toString() || "",
          created_at: data.created_at || "",
          updated_at: data.updated_at || "",
          objetivo: data.objetivo|| "",
        };
        
        
        // Atualizar o formData
        setFormData(formDataFormatado);
        
        // Buscar documentos se houver função e protocolo
        if (fetchDocumentos && protocolo) {
          fetchDocumentos(protocolo);
        }
        
        alert("Ocorrencia carregada com sucesso!")
        return data;
        
      } else if (result.error) {
        // Se for apenas uma mensagem de erro
        throw new Error(result.error);
      } else {

        const data = result;
        const protocolo = data.protocolo || data.id || id;
        
        setOcorrenciaId(protocolo);
        setProtocolo(protocolo);
        setFormData(data);
        
        if (fetchDocumentos && protocolo) {
          fetchDocumentos(protocolo);
        }
        
        return data;
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar ocorrência:', error);
      
      // Mensagem de erro amigável
      let errorMessage = 'Erro ao carregar ocorrência';
      if (error.message.includes('404') || error.message.includes('não encontrada')) {
        errorMessage = `Ocorrência com protocolo "${id}" não encontrada`;
      } else if (error.message.includes('JSON')) {
        errorMessage = 'Erro na comunicação com o servidor';
      } else {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  },
  

  async fetchNotifications(protocol) {
  try {
    
    const response = await fetch(
      `http://192.168.30.26:8090/occurrence/notification?protocol=${protocol}`
    );
        const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar notificações", error);
  }
},

// Novo método para processar dados da ocorrência
processarDadosOcorrencia(dadosOcorrencia, idOriginal, callbacks) {
  const {
    setProtocolo,
    setOcorrenciaId,
    setFormData,
    fetchDocumentos
  } = callbacks;
  
  
  // Verifica se dadosOcorrencia é válido
  if (!dadosOcorrencia || typeof dadosOcorrencia !== 'object') {
    console.error('❌ Dados da ocorrência inválidos:', dadosOcorrencia);
    throw new Error('Dados inválidos retornados pela API');
  }
  
  // Encontrar o identificador da ocorrência
  const protocoloEncontrado = this.encontrarProtocolo(dadosOcorrencia, idOriginal);
  
  // Atualizar estados
  setProtocolo(protocoloEncontrado);
  setOcorrenciaId(protocoloEncontrado);
  
  // Mapear e preencher formData
  const formDataMapeado = this.mapearFormData(dadosOcorrencia);
  
  setFormData(formDataMapeado);
  
  // Buscar documentos
  fetchDocumentos(protocoloEncontrado);
  
  
  return protocoloEncontrado;
},




// Método para mapear formData
mapearFormData(dados) {
  // Função auxiliar para extrair valor
  const extrair = (chaves, padrao = '') => {
    for (const chave of chaves) {
      if (dados[chave] !== undefined && dados[chave] !== null && dados[chave] !== '') {
        return dados[chave];
      }
    }
    return padrao;
  };
  
  return {
    // Dados básicos
    reanalise: extrair(['reanalise', 'reanalysis', 're_analise', 'is_reanalysis'], "false"),
    classificacao_id: extrair(['classificacao_id', 'classification_id', 'classificacao', 'classification']),
    unidade_id: extrair(['unidade_id', 'unit_id', 'unidade', 'unit']),
    descricao: extrair(['descricao', 'description', 'desc', 'details']),
    cartao_beneficiario: extrair(['cartao_beneficiario', 'beneficiary_card', 'cartao', 'card']),
    manifestacao_ant: extrair(['manifestacao_ant', 'previous_manifestation', 'manifestacao_anterior']),
    
    // Dados de identificação
    identificacao_id: extrair(['identificacao_id', 'identification_id', 'identificacao', 'identification']),
    forma_resposta_id: extrair(['forma_resposta_id', 'response_form_id', 'forma_resposta', 'response_form']),
    assunto_id: extrair(['assunto_id', 'subject_id', 'assunto', 'subject']),
    sub_assunto_id: extrair(['sub_assunto_id', 'sub_subject_id', 'sub_assunto', 'sub_subject']),
    
    // Dados pessoais
    nome: extrair(['nome', 'name', 'nome_manifestante', 'requester_name']),
    nome_cliente: extrair(['nome_cliente', 'client_name', 'nome_cliente_atendido', 'beneficiary_name']),
    email: extrair(['email', 'email_address', 'e_mail']),
    cpf: extrair(['cpf', 'cpf_number', 'document', 'cpf_cnpj']),
    telefone: extrair(['telefone', 'phone', 'telephone', 'phone_number']),
    canal_id: extrair(['canal_id', 'channel_id', 'canal', 'channel']),
    
    // Dados internos
    tipo_contrato: extrair(['tipo_contrato', 'contract_type', 'tipo_contract']),
    tipo_demandante: extrair(['tipo_demandante', 'requester_type', 'tipo_requester']),
    canal_interno: extrair(['canal_interno', 'internal_channel', 'canal_internal']),
    desmembrar: extrair(['desmembrar', 'split', 'desmembrado'], false),
    observacoes_internas: extrair(['observacoes_internas', 'internal_notes', 'observacoes', 'notes']),
  };
},




  

// Método para limpar estados
limparEstados(callbacks) {
  const {
    setProtocolo,
    setOcorrenciaId,
    setFormData
  } = callbacks;
  
  setProtocolo('');
  setOcorrenciaId('');
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
    desmembrar: false,
    observacoes_internas: "",
    objetivo: "",
  });
},

  async buscarOcorrencias(filters, callbacks) { 
    const { setSearching, setShowResults, setSearchResults } = callbacks;

    setSearching(true);
    setShowResults(false);

    try {
      const data = await apiService.searchOcorrencias(filters);
      if (data.status === 404) {
        throw new Error(data.error);
      }
      
      setSearchResults(Array.isArray(data) ? data : [data]);
      setShowResults(true);
      
      if (Array.isArray(data) && data.length === 0) {
        alert("Nenhuma ocorrência encontrada com os filtros informados.");
      }
    } catch (error) {
      console.error("Erro ao buscar ocorrências:", error);
      alert(`Erro ao buscar ocorrências: ${error.message}`);
    } finally {
      setSearching(false);
    }
  },

  async atualizarOcorrencia(ocorrenciaId, formData, callbacks) {
    const { setUpdating } = callbacks;

    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para atualizar");
      return;
    }

    setUpdating(true);
    try {
      await apiService.updateOcorrencia(ocorrenciaId, formData);
      alert("Ocorrência atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar ocorrência:", error);
      alert(`Erro ao atualizar ocorrência: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  },

  async carregarDocumentos(protocolo, callbacks) {
    const { setLoadingDocumentos, setDocumentos } = callbacks;

    if (!protocolo) return;

    setLoadingDocumentos(true);
    try {
      const data = await apiService.fetchDocumentos(protocolo);

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
  },

  async baixarDocumento(protocolo, documentoId, fileName) {
    try {
      const response = await apiService.downloadDocumento(protocolo);

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
  },

  async carregarComentarios(ocorrenciaId, callbacks) {
    const { setLoadingComentarios, setComentarios } = callbacks;

    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para visualizar comentários");
      return;
    }

    setLoadingComentarios(true);
    try {
      const data = await apiService.fetchComentarios(ocorrenciaId);
      
      
      
      setComentarios(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    } finally {
      setLoadingComentarios(false);
    }
  },

  async enviarParaSetor(ocorrenciaId, protocolo, sendToSectorData, userInfo, callbacks) {
    const { setShowSendToSectorModal, setSendToSectorData } = callbacks;

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
        
        protocol: protocolo,
        sector_destiny: Number(sendToSectorData.setor),
        sector_origin: userInfo.sector,
        observacao: sendToSectorData.observacao,
        user_send: userInfo.name,
        date_send: new Date(),
       
      };

      await apiService.SendAnotherSector(payload);

      alert(`Demanda enviada com sucesso para o setor.}`);

      setShowSendToSectorModal(false);
      setSendToSectorData({
        setor: "",
        observacao: "",
      });
    } catch (error) {
      console.error("Erro ao enviar para outro setor:", error);
      alert(`Erro ao enviar para outro setor: ${error.message}`);
    }
  },

  async responderComentarios(ocorrenciaId, responderComentariosData, userInfo, callbacks) {
    const { 
      setShowResponderComentariosModal, 
      setResponderComentariosData,
      fetchComentarios 
    } = callbacks;

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

      await apiService.enviarComentario(payload);
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
  },

  async questionarBeneficiario(ocorrenciaId, questionarBeneficiarioData, userInfo, callbacks) {
    const { 
      setShowQuestionarBeneficiarioModal, 
      setQuestionarBeneficiarioData 
    } = callbacks;

    if (!questionarBeneficiarioData.pergunta.trim()) {
      alert("Por favor, digite uma pergunta");
      return;
    }

    if (!ocorrenciaId) {
      alert("Nenhuma ocorrência carregada para questionar");
      return;
    }

    try {
      let arquivosUploaded = [];
      if (questionarBeneficiarioData.arquivos.length > 0) {
        arquivosUploaded = await apiService.uploadArquivosQuestionamento(
          ocorrenciaId, 
          questionarBeneficiarioData.arquivos
        );
      }

      const payload = {
        protocol: ocorrenciaId,
        question: questionarBeneficiarioData.pergunta,
        manifestante: questionarBeneficiarioData.nomeManifestante,
        user_question: userInfo.name,
        anexos: arquivosUploaded
      };

      await apiService.enviarQuestionamento(payload);
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
  }
}
