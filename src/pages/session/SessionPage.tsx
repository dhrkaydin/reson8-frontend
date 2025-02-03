import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Metronome } from "../../components";

const SessionPage = () => {
  const location = useLocation();
  const routineId = location.state?.routineId; // Extract the ID from state

  const [sessionStart, setSessionStart] = useState<number | null>(null);
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [sessionDate, setSessionDate] = useState<string>("");
  const [averageBpm, setAverageBpm] = useState<number>(0);

  useEffect(() => {
    setSessionStart(Date.now());
    setSessionDate(new Date().toISOString().split("T")[0]); // YYYY-MM-DD format
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStart) {
        setSessionDuration(Math.floor((Date.now() - sessionStart) / 1000)); // Convert ms to seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStart]);

  const handleSubmit = () => {
    const sessionData = {
      routineId,
      averageBpm,
      sessionDuration,
      sessionDate,
    };

    console.log("Submitting session:", sessionData);
    // Call your API here with sessionData
  };

  return (
    <div className="min-h-screen bg-resonGreen flex flex-col sm:px-4 py-2 sm:p-6 items-center">
      <span className="text-8xl font-micro5 font-resonPurple">session</span>
      
      <Metronome onBpmUpdate={setAverageBpm} />

      <p className="text-lg mt-4">Date: {sessionDate}</p>
      <p className="text-lg">Duration: {sessionDuration} seconds</p>
      <p className="text-lg">Average BPM: {averageBpm}</p>

      <button 
        onClick={handleSubmit} 
        className="mt-4 bg-resonPurple text-white px-4 py-2 rounded"
      >
        Submit Session
      </button>
    </div>
  );
};

export default SessionPage;