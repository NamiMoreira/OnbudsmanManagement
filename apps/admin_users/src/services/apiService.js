const BASE_URL = "http://192.168.30.26:8090";

export const apiService = {
  // Ocorrências
async fetchOcorrencia(id) {
  
  try {
    // Use apenas o endpoint que você sabe que existe
    const endpoint = `${BASE_URL}/ocurrence/${id}`;
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
  
    
    // Verifique o tipo de conteúdo
    const contentType = response.headers.get('content-type');
    
    if (!response.ok) {
      // Tenta ler o texto de erro
      const errorText = await response.text();
      
      // Se for JSON, tenta parsear
      if (contentType && contentType.includes('application/json')) {
        try {
          const errorJson = JSON.parse(errorText);
          return { status: response.status, error: errorJson.error || errorText };
        } catch {
          return { status: response.status, error: errorText };
        }
      }
      
      throw new Error(`Erro ${response.status}: ${errorText || 'Ocorrência não encontrada'}`);
    }
    
    // Verifica se a resposta é JSON
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      throw new Error('A API não retornou JSON válido');
    }
    
    // Tenta parsear como JSON
    let data;
    try {
      const responseText = await response.text();
      
      if (!responseText.trim()) {
        console.warn('⚠️ Resposta vazia!');
        throw new Error('Resposta vazia da API');
      }
      
 
    } catch (parseError) {
      throw new Error('Erro ao processar resposta da API');
    }
    
    // DEBUG completo

    
    if (data === null) {
      console.warn('⚠️ API retornou null');
      return null;
    }
    
    if (typeof data === 'string') {
      // Tenta converter string para objeto
      try {
        const parsedData = JSON.parse(data);
        return parsedData;
      } catch {
        return { mensagem: data };
      }
    }
    
    return data;
  } catch (error) {
    console.error('💥 [API] Erro na requisição:', error);
    throw error;
  }
},

  async updateOcorrencia(id, data) {
    const response = await fetch(`${BASE_URL}/ocurrence/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async searchOcorrencias(filters) {
    const queryParams = new URLSearchParams();
    
    if (filters.cpf) queryParams.append("cpf", filters.cpf);
    if (filters.cartao_beneficiario) queryParams.append("cartao_beneficiario", filters.cartao_beneficiario);
    if (filters.status) queryParams.append("status", filters.status);
    if (filters.nome) queryParams.append("nome", filters.nome);
    if (filters.email) queryParams.append("email", filters.email);

    const queryString = queryParams.toString();
    const url = queryString
      ? `${BASE_URL}/ocurrence/filter/?${queryString}`
      : `${BASE_URL}/ocurrence/filter`;

    const response = await fetch(url);
    return await response.json();
  },

  // Documentos
  async fetchDocumentos(protocolo) {
    const response = await fetch(`${BASE_URL}/ocurrence/${protocolo}/documents`);
    return await response.json();
  },

  async downloadDocumento(protocolo) {
    const response = await fetch(`${BASE_URL}/ocurrence/${protocolo}/download`);
    return response;
  },

  // Comentários
  async fetchComentarios(ocorrenciaId) {
    const response = await fetch(`${BASE_URL}/occurrence/${ocorrenciaId}/comments`);
    return await response.json();
  },

  async enviarComentario(data) {
    const response = await fetch(`${BASE_URL}/occurrence/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
    async SendAnotherSector(data) {
    const response = await fetch(`${BASE_URL}/ocurrence/send-to-sector`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  // Questionamentos
  async enviarQuestionamento(data) {
    const response = await fetch(`${BASE_URL}/occurrence/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },

  async uploadArquivosQuestionamento(protocolo, arquivos) {
    const uploadedFiles = [];
    
    for (let file of arquivos) {
      const formData = new FormData();
      formData.append("protocol", protocolo);
      formData.append("file", file);

      try {
        const response = await fetch(`${BASE_URL}/upload/questions`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          uploadedFiles.push({
            nome: file.name,
            url: result.url || `${BASE_URL}/uploads/${result.filename}`
          });
        }
      } catch (error) {
        console.error(`Erro ao enviar arquivo ${file.name}:`, error);
      }
    }

    return uploadedFiles;
  }
};