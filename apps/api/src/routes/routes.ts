import { Router } from "express";
const router = Router();
import { AuthUserController } from "../controlers/user/AuthUserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {CreateUserController} from "../controlers/user/CreateUserController";
import {DeleteOcurrenceController}from "../controlers/occurrence/DeleteOcurrenceController"
import { UpdateOcurrenceController } from "../controlers/occurrence/UpdateOcurrenceConstroller"
import { GetAllOcurrenceController } from "../controlers/occurrence/GetAllOcurrenceController";
import {CreateOcurrenceController} from '../controlers/occurrence/CreateOcurrenceController'
import { GetOneOcurrenceController } from "../controlers/occurrence/GetOneOcurrenceController";
import { GetManyByFilterOcurrenceController } from "../controlers/occurrence/GetManyByFilterOcurrenceController";
import { GetListDocumentsOcurrenceController } from "../controlers/occurrence/GetListDocumentsOcurrenceController";
import { DownloadOcurrenceController } from "../controlers/occurrence/DownloadOcurrenceController";
import { ChangeSectorOcurrenceController } from "../controlers/occurrence/ChangeSectorOcurrenceController"
import { ShowCommentsOcurrenceController} from "../controlers/occurrence/ShowCommentsOcurrencecontroller"
import { AnswerCommentsOcurrenceController } from "../controlers/occurrence/AnswerCommentsOcurrenceController";
import { CreateQuestionsOcurrenceController } from "../controlers/occurrence/CreateQuestionsOcurrenceController";
import {DownloadQuestionsOcurrenceController} from "../controlers/occurrence/DownloadQuestionsOcurrenceController"
import { NotificationQuestionOcurrenceController } from "../controlers/occurrence/NotificationQuestionOcurrenceController";
import {RecoveryPasswordController} from "../controlers/user/RecoveryPasswordController";
import {SaveNewPasswordController} from "../controlers/user/SaveNewPasswordController";

router.post("/session", new AuthUserController().handle);

router.post("/user", new CreateUserController().handle);

router.delete("/ocurrence/:id",new DeleteOcurrenceController().handle);


router.post("/ocurrence",new CreateOcurrenceController().handle);

router.put("/ocurrence/:id" ,new UpdateOcurrenceController().handle);


router.get("/ocurrence/filter" ,new GetManyByFilterOcurrenceController().handle);

router.get("/ocurrence/:id/documents", new GetListDocumentsOcurrenceController().handle)

router.get("/ocurrence/:id/download", new DownloadOcurrenceController().handle)

router.get("/occurrence/:id/comments", new ShowCommentsOcurrenceController().handle)

router.get("/ocurrence/:id" ,new GetOneOcurrenceController().handle);

router.post("/occurrence/comments", new AnswerCommentsOcurrenceController().handle)

router.post("/ocurrence/send-to-sector", new ChangeSectorOcurrenceController().handle)

router.post("/occurrence/questions", new CreateQuestionsOcurrenceController().handle)

router.get("/ocurrence/:id/download/questions", new DownloadQuestionsOcurrenceController().handle)

router.get("/occurrence/notification", new NotificationQuestionOcurrenceController().handle)

router.post("/recoveryPassword", new RecoveryPasswordController().handle)

router.put("/user-recovery", new SaveNewPasswordController().handle)
export { router };
