import { Routes, Route } from 'react-router-dom'
import HeroSection from './components/Herosection/HeroSection'


function App() {
  

  return (
    <>
    
    <Routes>
        <Route path="/" element={<HeroSection />} />
        
      </Routes>

   
     
    </>
  )
}

export default App