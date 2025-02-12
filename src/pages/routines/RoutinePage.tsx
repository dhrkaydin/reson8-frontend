import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import useApi from '../../hooks/useApi';

const RoutinePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [routine, setRoutine] = useState<PracticeRoutineDTO | null>(null);
  const { data, execute, loading, error } = useApi<PracticeRoutineDTO>();

  useEffect(() => {
    if (!id) return;
  
    const fetchRoutine = async () => {
      await execute('GET', `/routines/${id}`);
    };
  
    fetchRoutine();
  }, [id, location]);

  useEffect(() => {
    if (data) {
      setRoutine(data);
    }
  }, [data]);

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="w-full min-h-screen h-full bg-resonYellow flex-col items-center justify-center gap-10 p-8">
      {/* Title and description container */}
      <div className= "flex flex-col flex-grow-[2] w-full h-2/3 items-center gap-4">
        <span className="text-3xl sm:text-6xl font-silkscreen text-resonPurple text-center">{routine?.title}</span>
        <div className="flex h-full items-center sm:w-[85%] justify-center">
          <p className="text-black text-3xl font-handjet text-center">{routine?.description}</p>
        </div>
      </div>

      {/* Category and edit button container */}
      <div className='flex flex-col w-full sm:flex-row items-center justify-evenly gap-4'>
        <p className="text-sm text-center text-black">category: {routine?.category}</p>
        <div className='flex flex-row gap-4'>
          <button
            className=" bg-resonPurple text-2xl w-20 sm:w-32 text-black font-pixelify hover:text-pink-700 no-underline"
            onClick={() => navigate(`/routines/edit/${id}`)}
          >
            edit
          </button>
          <button
            className=" bg-resonPurple text-2xl w-20 sm:w-32 text-black font-pixelify hover:text-pink-700 no-underline"
            onClick={() => navigate(`/routines`)}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutinePage;