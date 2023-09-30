import './App.css';
import { Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import ToDoPage from './pages/ToDoPage';
function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/todo" element={<ToDoPage/>} />
        <Route path='*' element={<h1>Nothing to show</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
