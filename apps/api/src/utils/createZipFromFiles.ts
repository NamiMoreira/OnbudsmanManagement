import fs from "fs";
import archiver from "archiver";
import path from "path";

export function createZipFromFiles(files, outputFolder , zipName) {
  return new Promise((resolve, reject) => {
    
    const outputZipPath = path.join(outputFolder, zipName);
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => resolve(outputZipPath));
    archive.on("error", err => reject(err));

    archive.pipe(output);
    
    files.forEach(filePath => {
      const fileName = path.basename(filePath); 
      console.log(fileName);
      
      archive.file(filePath, { name: `${fileName.split("-")[3]}.${fileName.split(".")[1]}` });
    });
    
    
    archive.finalize();
  });
}