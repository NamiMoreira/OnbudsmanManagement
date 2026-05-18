import { readdir } from "fs/promises";
import { stat } from "fs/promises";
const path = require("path");

class GetListDocumentsOcurrenceService {
  async execute(protocolo) {
    const dir = path.resolve(__dirname, "../../uploads");
    let listDocuments: any = {};

    try {
      const doc = await readdir(dir);
      const docData = await stat(dir)
     
      
      for (let i = 0; i < doc.length; i++) {
        const element = doc[i];
        listDocuments.nome = element.split("-")[2];
        listDocuments.tipo = element.split(".")[1]       
      }
    } catch (err) {
       listDocuments.status = "error";
    }
    
    return listDocuments;
  }
}

export { GetListDocumentsOcurrenceService };
