import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../../hooks/useApi";
import { PracticeSessionDTO } from "../../generated/models/PracticeSessionDTO";
import { PracticeRoutineDTO } from "../../generated/models/PracticeRoutineDTO";
import { Metronome } from "../../components";

const SessionPage = () => {
  const location = useLocation();
  const routineId = location.state?.routineId;
  const navigate = useNavigate();

  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [sessionDate, setSessionDate] = useState<string>("");
  const [averageBpm, setAverageBpm] = useState<number>(0);
  const [session, setSession] = useState<PracticeSessionDTO>();
  const [routine, setRoutine] = useState<PracticeRoutineDTO>();
  const { data, execute } = useApi<PracticeRoutineDTO>();

  const sessionStart = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (!routineId) return;

    const fetchRoutine = async () => {
      await execute("GET", `/routines/${routineId}`);
    };

    fetchRoutine();
  }, [routineId]);

  useEffect(() => {
    if (data) {
      setRoutine(data);
    }
  }, [data]);

  useEffect(() => {
    sessionStart.current = Date.now();
    setSessionDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setSessionDuration((prevDuration) => prevDuration + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSubmit = async (sessionData: PracticeSessionDTO) => {
    try {
      await execute("POST", "/sessions", sessionData);
      setSession(() => sessionData);
    } catch (error) {
      console.error("Error creating routine:", error);
    } finally {
      navigate("/sessions");
    }
  };

  const handleCancel = () => {
    navigate("/sessions");
  };

  const handlePauseToggle = () => {
    setIsPaused((prev) => !prev);
  };

  return (
    <div className="bg-resonGreen flex flex-1 flex-col sm:px-4 py-2 sm:p-6 gap-4 items-center">
      {/* Top Half */}
      <div className="flex sm:flex-row flex-col w-full sm:flex-1">
        <div className="flex flex-col sm:w-1/2 text-center justify-start p-4 gap-4 sm:gap-20">
          <span className="text-4xl font-silkscreen text-resonPurple">{routine?.title}</span>
          <p className="text-2xl font-handjet">{routine?.description}</p>
        </div>
        <div className="flex w-full sm:w-1/2 items-center justify-end">
          <Metronome onBpmUpdate={setAverageBpm} />
        </div>
      </div>

      {/* Bottom Half */}
      <div className="flex w-full flex-col items-center sm:justify-center flex-1">
        <p className="text-2xl font-pixelify text-black mb-3">
          {Math.floor(sessionDuration / 60)}:{(sessionDuration % 60).toString().padStart(2, "0")}
        </p>

        <div className="flex sm:flex-row flex-col gap-4 px-5 w-full items-center justify-center">
          <button
            onClick={handlePauseToggle}
            className="p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black bg-resonBlue"
          >
            {isPaused ? "resume" : "pause"}
          </button>

          <button
            onClick={() =>
              handleSubmit({
                id: null,
                sessionDate: sessionDate,
                bpm: averageBpm,
                duration: sessionDuration,
                practiceRoutineId: routineId,
              })
            }
            className="p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black bg-resonPurple"
          >
            end
          </button>
          
          <button
            onClick={() => handleCancel()}
            className="p-2 w-2/3 font-pixelify text-2xl sm:w-1/4 text-black bg-gray-300"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;