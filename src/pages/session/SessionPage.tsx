import { useState, useEffect, useRef } from "react";
import { PracticeSessionDTO } from "../../generated/models/PracticeSessionDTO"; // Adjust the import path as necessary
import { useLocation, useNavigate } from "react-router-dom";
import { Metronome } from "../../components";
import useApi from "../../hooks/useApi";

const SessionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routineId = location.state?.routineId; // Extract the ID from state

  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [sessionDate, setSessionDate] = useState<string>("");
  const [averageBpm, setAverageBpm] = useState<number>(0);

  const [session, setSession] = useState<PracticeSessionDTO>();
  const { data, loading, error, execute } = useApi<PracticeSessionDTO[]>();

  // Use useRef to track sessionStart without causing re-renders
  const sessionStart = useRef<number | null>(null);

  useEffect(() => {
    sessionStart.current = Date.now(); // Set session start time
    setSessionDate(new Date().toISOString().split("T")[0]); // YYYY-MM-DD format
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionStart.current) {
        setSessionDuration(Math.floor((Date.now() - sessionStart.current) / 1000)); // Convert ms to seconds
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); // No dependencies needed here, since we only need to set the interval once

  const handleSubmit = async (sessionData: PracticeSessionDTO) => {
    try {
      // Create session API call
      await execute('POST', '/sessions', sessionData);
      setSession(() => sessionData); // Update session state with response
    } catch (error) {
      console.error('Error creating routine:', error);
    } finally {
      navigate('/sessions'); 
    }
  };

  const handleCancel = () => { 
    navigate('/sessions');
  }

  return (
    <div className="min-h-screen bg-resonGreen flex flex-col sm:px-4 py-2 sm:p-6 items-center">
      <span className="text-8xl font-micro5 text-resonPurple">session</span>
      
      <Metronome onBpmUpdate={setAverageBpm} />

      <p className="text-2xl font-pixelify text-black mb-3">{Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, '0')}</p>
      <button 
        onClick={() => handleSubmit({
          id: null,
          sessionDate: sessionDate,
          bpm: averageBpm,
          duration: sessionDuration,
          practiceRoutineId: routineId
        })} 
        className="p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black bg-resonBlue"
      >
        end session
      </button>
      <button 
        onClick={() => handleCancel()} 
        className="p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black bg-red-300 mt-4"
      >
        cancel session
      </button>
    </div>
  );
};

export default SessionPage;