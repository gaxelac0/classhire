import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Onboard from './pages/Onboard/Onboard'
import Search from './pages/Search/Search'
import Clase from './pages/Clase/Clase'
import Profile from './pages/Profile/Profile'
import Principal from './pages/Principal/Principal'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import CompleteOnboardStudentFrm from './pages/Onboard/CompleteOnboardStudentFrm'
import CompleteOnboardTeacherFrm from './pages/Onboard/CompleteOnboardTeacherFrm'
import NotFound from './pages/NotFound/NotFound'
import Footer from './components/Footer/Footer'
import CrearClase from './pages/Clase/CrearClase'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  return (
    <>

      <NavBar user={user} handleLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route path="/onboard" element={<Onboard user={user} />}
        />
        <Route path="/complete-onboard/student" element={<CompleteOnboardStudentFrm user={user} />}
        />
        <Route path="/complete-onboard/profesor" element={<CompleteOnboardTeacherFrm user={user} />}
        />
        <Route path="/search" element={<Search user={user} />}
        />
        <Route path="/clase" element={<Clase user={user} />}
        />
        <Route path="/clase/add" element={<CrearClase user={user} />}
        />
        <Route path="/profile" element={<Navigate to="/profile/1"/>}
        />
        <Route
          path="/profile/:page"
          element={user
            ? !user.role
              ? <Navigate to="/onboard" />
              : <Profile user={user} />
            : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Principal user={user} />}
        />
        <Route path="*" element={<NotFound user={user} />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
