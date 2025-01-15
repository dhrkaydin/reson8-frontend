import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { RoutinePage } from './pages';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Header />
      <main className="flex-1 bg-white p-6">
        <Routes>
          <Route path="/routines" element={<RoutinePage />} />
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;