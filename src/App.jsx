import { BrowserRouter, Route, Routes } from "react-router-dom"
import CreateUserPage from "./pages/CreateUserPage"
import ListUserPage from "./pages/ListUserPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListUserPage />} />
        <Route path="/create" element={<CreateUserPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
