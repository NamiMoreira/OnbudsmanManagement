import fs from "fs";
import archiver from "archiver";

export async function zipToBase64(files, outputZipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      // lê o zip gerado e converte para base64
      const base64 = fs.readFileSync(outputZipPath, { encoding: "base64" });
      resolve(base64);
    });

    archive.on("error", err => reject(err));

    archive.pipe(output);

    // adiciona arquivos ao zip
    files.forEach(file => {
      archive.file(file, { name: file.split("/").pop() });
    });

    archive.finalize();
  });
}