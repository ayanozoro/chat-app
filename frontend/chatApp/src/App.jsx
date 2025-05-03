import './App.css'
import Signup from './components/auth/signup/Signup.jsx';
import Login from './components/auth/login/Login.jsx';
import { useAuth } from './context/Auth.jsx';
import Front from './components/front/Front.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
function App() {
  const [authUser , setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <div className='h-screen bg-black'>
    <Routes>
      <Route path='/' element={
        authUser ? (
          <Front />
        ) : (
          <Navigate to={"/login"} /> 
        )
      } />
      <Route path='/signup' element={authUser? <Navigate to={'/'}/>:<Signup />} />
      <Route path='/login' element={authUser? <Navigate to={"/"} /> : <Login />} />
    </Routes>
    <Toaster position="top" reverseOrder={false} />
  </div>
  )
}

export default App;
