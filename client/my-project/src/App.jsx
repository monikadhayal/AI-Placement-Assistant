import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  function App() {
 
    return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
            <h1>Lakshay</h1>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    );
  }
}

export default App;
