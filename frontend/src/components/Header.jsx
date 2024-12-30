import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    QuizApp
                </Link>

                {/* Navigation Links */}
                <nav className="flex space-x-4">
                    {/* <Link
                        to="/"
                        className="text-gray-600 hover:text-gray-800 font-medium"
                    >
                        Quizzes
                    </Link> */}
                </nav>
            </div>
        </header>
    );
};

export default Header;
