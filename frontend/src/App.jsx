import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Onboard from './pages/Onboard/Onboard'
import Search from './pages/Search/Search'
import Publicacion from './pages/Publicacion/Publicacion'
import Profile from './pages/Profile/Profile'
import Principal from './pages/Principal/Principal'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import CompleteOnboardStudentFrm from './pages/Onboard/CompleteOnboardStudentFrm'
import CompleteOnboardTeacherFrm from './pages/Onboard/CompleteOnboardTeacherFrm'
import NotFound from './pages/NotFound/NotFound'

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
      <NavBar user={user} handleLogout={handleLogout} >
      </NavBar>
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
        <Route path="/publicacion" element={<Publicacion user={user} />} 
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
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
    </>
  )
}

export default App
