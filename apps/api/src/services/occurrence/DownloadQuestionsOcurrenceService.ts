const path = require("path");
import { readdir } from "fs/promises";
import { createZipFromFiles } from "../../utils/createZipFromFiles";

class DownloadOcurrenceService {
  async execute(protocolo) {
    try {
      let files
      const dir = path.resolve(__dirname, "../../uploads");
      const doc = await readdir(dir);
      const dirZip = path.resolve(__dirname, "../../uploads/zip")

      for (let i = 0; i < doc.length; i++) {
          const element = doc[i];
           
          if (`questions_${element.split("-")[0]}-${element.split("-")[1]}` == `questions_${protocolo}` ) {
            files = element 
            break
          }
         
      }

      const zipPath = await createZipFromFiles(files,dirZip, "arquivo.zip");
      
      
      return {status: 'success', content: zipPath, err:""};
    } catch (error) {
      return { status: "error",content:"", err: error };
    }
  }
}

export { DownloadOcurrenceService };
