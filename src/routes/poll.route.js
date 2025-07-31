import { Router } from "express";
import pollControllers from "../controllers/poll.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";

const router = Router();

router.get('/api/poll',pollControllers.getAllPolls);
router.get('/api/poll/:id', pollControllers.getPollById);
router.post('/api/poll', validateMiddleware.authenticate, validateMiddleware.isAdmin,pollControllers.createPoll);
router.put('/api/poll/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, pollControllers.updatePoll);
router.delete('/api/poll/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, pollControllers.deletePoll);

export default router;