import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const QuizPage = () => {
    const { id } = useParams(); // Get quiz ID from the route
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/quiz/${id}`);
                setQuiz(response.data);
            } catch (error) {
                toast.error("Failed to load quiz!");
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [id]);

    const handleAnswerSelect = (answer) => {
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: answer });
    };

    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API_URL}/api/quiz/${id}/submit`,
                { answers: userAnswers }
            );
            navigate(`/quizzes/${id}/score`, { state: response.data });
        } catch (error) {
            toast.error("Failed to submit quiz!");
        }
    };

    if (loading) {
        return <div className="text-center mt-10">Loading quiz...</div>;
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h1>
            <p className="text-gray-600 mb-6">{quiz.description}</p>

            {/* Current Question */}
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                    Question {currentQuestionIndex + 1}: {currentQuestion.questionText}
                </h2>
                <div className="space-y-4">
                    {currentQuestion.answerChoices.map((choice, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(choice)}
                            className={`block w-full text-left p-3 rounded-lg border ${userAnswers[currentQuestionIndex] === choice
                                ? "bg-blue-100 border-blue-500"
                                : "bg-gray-50 border-gray-300"
                                } hover:bg-gray-100`}
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
                >
                    Previous
                </button>
                {currentQuestionIndex === quiz.questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Submit Quiz
                    </button>
                ) : (
                    <button
                        onClick={handleNext}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default QuizPage;
