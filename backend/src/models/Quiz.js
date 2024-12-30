import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    answerChoices: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [QuestionSchema],
});

const Quiz = mongoose.model('Quiz', QuizSchema);

export default Quiz;
