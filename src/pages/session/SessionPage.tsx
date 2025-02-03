import { useLocation } from "react-router-dom";
import { Metronome } from "../../components";

const SessionPage = () => {
  const location = useLocation();
  const routineId = location.state?.routineId; // Extract the ID from state

  return (
    <div>
      <h1>Session for Routine ID: {routineId}</h1>

      <Metronome />
    </div>
  );
};

export default SessionPage;
