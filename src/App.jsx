import { BrowserRouter, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import HomePage from "./pages/HomePage"
import MoviesPage from "./pages/MoviesPage"
import SingleMoviePage from "./pages/SingleMoviePage"
import CreateMoviePage from "./pages/CreateMoviePage";

function App() {

  return (

    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:slug" element={<SingleMoviePage />} />
            <Route path="/movies/create" element={<CreateMoviePage />} /> 
          </Route>
        </Routes>
      </BrowserRouter>
    </>

  )
  
} 

export default App;
