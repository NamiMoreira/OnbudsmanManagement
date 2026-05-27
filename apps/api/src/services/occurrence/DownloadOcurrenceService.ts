const path = require("path");
import { readdir } from "fs/promises";
import { createZipFromFiles } from "../../utils/createZipFromFiles";



class DownloadOcurrenceService {
  async execute(protocolo) {
    try {
      var files = []
      const dir = path.resolve(__dirname, "../../uploads/occurrence");
      const dirZip = path.resolve(__dirname, "../../uploads/zip")
      const doc = await readdir(dir);
      
      
      for (let i = 0; i < doc.length; i++) {
          let element = doc[i];          
          if (element.split('-')[0] == protocolo ) {
            let filePath = path.resolve(__dirname,"../../uploads/occurrence",element )
            console.log(filePath);
            
            files.push(filePath); 
          }   
      }    
  
      const zipPath = await createZipFromFiles(files,dirZip, `${protocolo}.zip`);
      
      return {status: 'success', content: zipPath, err:""};
    } catch (error) {
      return { status: "error",content:"", err: error };
    }
  } 
}
 
export { DownloadOcurrenceService };
