import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import axios from 'axios';
import useAuthStore from './store/authStore';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import QuizList from './pages/QuizList';
import QuizPage from './pages/Quiz';
import ScorePage from './pages/Score';

function App() {
  const { login, logout } = useAuthStore();

  axios.defaults.withCredentials = true;

  // Check user authentication status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/api/auth/self`);
        if (response.status === 200) {
          login(response.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        } else {
          console.error('Error checking authentication status:', error);
          logout();
        }
      } finally {
        useAuthStore.getState().setLoading(false); // Ensure loading is set to false
      }
    };

    checkAuthStatus();
  }, [login, logout]);
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-violet-50">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<QuizList />} />
            <Route path="/quizzes/:id" element={<QuizPage />} />
            <Route path="/quizzes/:id/score" element={<ScorePage />} />
          </Routes>
        </main>
      </div>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </Router>
  );
}

export default App;
