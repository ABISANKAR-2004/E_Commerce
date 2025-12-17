import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthPages from './pages/AuthPages.jsx'



function App() {
  

  return (
    <>
      <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/signin" element={ <AuthPages/> } />
      </Routes>
    </>
  )
}

export default App
