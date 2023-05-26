import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
function App() {
  return (
    <>
    <NoteState>
    <BrowserRouter>
        <Navbar /> 
        <Alert message="This is amazing react app" />
        <div className="container">       
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
export default App;
