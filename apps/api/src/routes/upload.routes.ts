import { Router } from "express";
import { upload } from "../upload/multerConfig";
import { existProtocol } from "../middlewares/existProtocol";
import { UploadController } from "../controlers/upload/UploadController";
import { uploadQuestions } from "../upload/multerConfigQuestions"
import {FinishOcurrenceController} from '../controlers/occurrence/FinishOcurrenceController'

const uploadRoutes = Router();

uploadRoutes.post("/upload", upload.array("file", 10), new UploadController().handle);

uploadRoutes.post("/upload/questions", uploadQuestions.array("file", 10), new UploadController().handle);

uploadRoutes.post("/occurrence/finish", uploadQuestions.array("file", 10), new FinishOcurrenceController().handle);



export { uploadRoutes };
