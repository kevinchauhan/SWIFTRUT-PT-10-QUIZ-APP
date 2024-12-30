import express from 'express';
import QuizController from '../controllers/QuizController.js';

const router = express.Router();

router.get('/', QuizController.getAllQuizzes);
router.get('/:id', QuizController.getQuizById);
router.post('/:id/submit', QuizController.submitQuiz);

export default router;
