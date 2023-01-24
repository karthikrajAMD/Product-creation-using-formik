import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Component/Home";
import FormikPage from "./Component/FormikPage";
import Product from "./Component/Product";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/add" element={<FormikPage />} />
      </Routes>
    </div>
  );
}

export default App;
