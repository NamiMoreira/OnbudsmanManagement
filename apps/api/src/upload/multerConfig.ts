import multer from "multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'uploads','occurrence'));
        
    },
    filename: function(req, file, cb) {

        const protocolo = req.body.protocol
        const extensaoArquivo = path.extname(file.originalname);
        const nomeArquivo = file.originalname.split(".")[0]
        const hex = crypto.randomBytes(64).toString('hex');
        cb(null, `${protocolo}-${nomeArquivo}-${hex}${extensaoArquivo}`);
    }   
});

const upload = multer({ 
    storage,
    limits: {
        fileSize: 8 * 1024 * 1024, // 8MB
    }
});



export { upload };