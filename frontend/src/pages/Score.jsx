import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ScorePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { score, total, results } = location.state || {};

    // useEffect to navigate back to quiz list if no score
    useEffect(() => {
        if (score === undefined || score === null) {
            // If score is not provided, navigate to the quiz list
            navigate('/');
        }
    }, [score, navigate]);

    // If no score exists, navigate back immediately and return null
    if (score === undefined || score === null) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
            <div className="bg-white shadow-md p-6 rounded-lg">
                <h2 className="text-xl font-medium text-gray-700 mb-4">
                    Your Score: {score || 0}/{total}
                </h2>
                <h3 className="text-lg text-gray-600 mb-4">Question Results:</h3>
                <div>
                    {results?.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index} className="mb-4">
                                <div>
                                    <strong>Question {index + 1}:</strong> {result.question}
                                </div>
                                <div>
                                    <strong>Your Answer:</strong> {result.userAnswer || 'No answer selected'}
                                </div>
                                <div>
                                    <strong>Correct Answer:</strong> {result.correctAnswer}
                                </div>
                                <div>
                                    <span
                                        className={`inline-block px-2 py-1 mt-1 text-sm ${result.isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                            }`}
                                    >
                                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>No answers selected</div>
                    )}
                </div>
            </div>
            <button
                onClick={() => navigate('/')}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
                Back to Quiz List
            </button>
        </div>
    );
};

export default ScorePage;
