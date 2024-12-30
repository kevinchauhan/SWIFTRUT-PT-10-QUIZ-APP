# Quiz App

A full-stack Quiz Application that allows users to take quizzes, view results, and track their performance. The app features functionalities like viewing available quizzes, submitting answers, and viewing detailed quiz results, including correct and incorrect answers.

## Features

- **View Quizzes**: Browse a list of available quizzes with titles, descriptions, and the number of questions.
- **Take Quiz**: Users can start a quiz, answer multiple-choice questions, and submit their answers.
- **View Results**: After submitting the quiz, users can see their score and detailed results, including the correct answers for each question.
- **Correct and Incorrect Answers**: The app shows which questions were answered correctly or incorrectly.

## Tech Stack

- **Frontend**:

  - React.js
  - TailwindCSS
  - Axios (HTTP Requests)
  - React Router (Routing)

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB
  - Mongoose

## Endpoints

- **GET /api/quiz**: Fetch all quizzes.
- **GET /api/quiz/:id**: Fetch a specific quiz by ID.
- **POST /api/quiz/:id/submit**: Submit answers for a quiz and get results.

## Deployment

- Frontend: [https://swiftrut-pt-10-quiz-app.vercel.app](https://swiftrut-pt-10-quiz-app.vercel.app)
  - Backend: [https://swiftrut-pt-10-quiz-app.onrender.com](https://swiftrut-pt-10-quiz-app.onrender.com)
