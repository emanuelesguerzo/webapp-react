import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"

function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
  
} 

export default App;
