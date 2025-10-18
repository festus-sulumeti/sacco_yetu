import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/Herosection/HeroSection'
import { ThemeProvider } from "@/components/theme-provider"


function App() {
  

  return (
    <>

       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            
          </Routes>
      </ThemeProvider>
     
    </>
  )
}

export default App