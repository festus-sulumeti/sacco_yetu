import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/Herosection/HeroSection'
import SignupPage from './Pages/Signup'
import LoginPage from './Pages/Login'
import About from './components/Herosection/About'
import Dashboard from './components/Dashboard/Dasboard'
import { ThemeProvider } from "@/components/theme-provider"
import Pendingpayment from './components/Dashboard/Pendingpayment'

function App() {
  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} /> 
        <Route path='/about' element={<About />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/payments/pending' element={<Pendingpayment />} />

      </Routes>

    </ThemeProvider>
     
    </>
  )
}

export default App