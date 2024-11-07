import { BrowserRouter, Routes, Route } from "react-router-dom";
import Edit from './pages/Edit';
import Home from './pages/Home';
import Post from './pages/Post';
import Add from "./pages/Add";
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/add" element={<Add />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
