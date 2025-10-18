import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/Herosection/HeroSection'
import { ThemeProvider } from "@/components/theme-provider"
import SignupPage from './Pages/Signup'


function App() {
  

  return (
    <>

       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/signup" element={<SignupPage />} />
            
          </Routes>
      </ThemeProvider>
     
    </>
  )
}

export default App