import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    
    
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '..', 'uploads', 'questions'));
        
    },
    filename: function(req, file, cb) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const hours = String(today.getHours()).padStart(2, '0');
        const minutes = String(today.getMinutes()).padStart(2, '0');
        const seconds = String(today.getSeconds()).padStart(2, '0');

        const formattedDate = `${day}_${month}_${year}_${hours}_${minutes}`;
        
        const protocolo = req.body.protocol
        const extensaoArquivo = path.extname(file.originalname);
        const nomeArquivo = file.originalname.split(".")[0]
        cb(null, `${formattedDate}-${protocolo}-${nomeArquivo}${extensaoArquivo}`);
        
        
    }  

});

const uploadQuestions = multer({ 
    storage,
    limits: {
        fileSize: 8 * 1024 * 1024, // 8MB
    }
});



export { uploadQuestions };