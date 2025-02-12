import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { RoutineOverview, RoutinePage, RoutineEditPage, HomePage, SessionSelection, SessionPage, StatisticsPage } from './pages';
import './styles/App.css';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="" element={<Layout />}>
            <Route path="/routines" element={<RoutineOverview />} />
            <Route path="/routines/:id" element={<RoutinePage />} />
            <Route path="/routines/edit/:id" element={<RoutineEditPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/sessions" element={<SessionSelection />} />
            <Route path="/sessions/active" element={<SessionPage />} />
            <Route path="/stats" element={< StatisticsPage />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;