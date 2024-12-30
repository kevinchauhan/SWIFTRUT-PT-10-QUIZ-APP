import Quiz from '../models/Quiz.js';

class QuizController {
    // Fetch all quizzes
    static async getAllQuizzes(req, res) {
        try {
            const quizzes = await Quiz.find();
            res.status(200).json(quizzes);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quizzes', error: error.message });
        }
    }

    // Fetch a specific quiz by ID
    static async getQuizById(req, res) {
        try {
            const { id } = req.params;
            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }
            res.status(200).json(quiz);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching quiz', error: error.message });
        }
    }

    // Submit quiz and calculate score
    static async submitQuiz(req, res) {
        try {
            const { id } = req.params;
            const { answers } = req.body;

            const quiz = await Quiz.findById(id);
            if (!quiz) {
                return res.status(404).json({ message: 'Quiz not found' });
            }

            let score = 0;
            const results = quiz.questions.map((question, index) => {
                const isCorrect = answers[index] === question.correctAnswer;
                if (isCorrect) score++;
                return { question: question.questionText, isCorrect };
            });

            res.status(200).json({ score, total: quiz.questions.length, results });
        } catch (error) {
            res.status(500).json({ message: 'Error submitting quiz', error: error.message });
        }
    }
}

export default QuizController;
