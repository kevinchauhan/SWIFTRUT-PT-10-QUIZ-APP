import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuizList = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/quiz`);
                setQuizzes(response.data);
            } catch (error) {
                console.error('Error fetching quizzes:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading quizzes...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Quizzes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition-shadow"
                    >
                        <h2 className="text-xl font-semibold text-gray-700">{quiz.title}</h2>
                        <p className="text-gray-600 mt-2">{quiz.description}</p>
                        <Link
                            to={`/quizzes/${quiz._id}`}
                            className="text-blue-500 hover:text-blue-600 mt-4 inline-block"
                        >
                            Start Quiz
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuizList;
