export    function gerarProtocolo() {
      const agora = new Date();
      const ano = agora.getFullYear().toString().slice(-2); // últimos 2 dígitos do ano
      const mes = String(agora.getMonth() + 1).padStart(2, "0");
      const dia = String(agora.getDate()).padStart(2, "0");
      const hora = String(agora.getHours()).padStart(2, "0");
      const min = String(agora.getMinutes()).padStart(2, "0");
      const seg = String(agora.getSeconds()).padStart(2, "0");
      const ms = String(agora.getMilliseconds()).padStart(3, "0");

      return `342343${ano}${mes}${dia}${hora}${min}${seg}${ms}`;
    }