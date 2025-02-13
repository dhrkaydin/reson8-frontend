import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../../components';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import useApi from '../../hooks/useApi';

const RoutineOverview: React.FC = () => {
  const [filteredRoutines, setFilteredRoutines] = useState<PracticeRoutineDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data, loading, error, execute } = useApi<PracticeRoutineDTO[]>();
  const [routines, setRoutines] = useState<PracticeRoutineDTO[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch data using the execute method from useApi
    const fetchData = async () => {
      try {
        await execute('GET', '/routines');
      } catch (err) {
        console.error("Error during fetch", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setRoutines(data);
      const categoryNames = [...new Set(data.map((routine) => routine.category))]; // Ensure unique categories
      setCategories(['all', ...categoryNames]);
    }
  }, [data]);

  // Synchronize filtered routines with routines and selectedCategory
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredRoutines(routines);
    } else {
      setFilteredRoutines(
        routines.filter((routine) => routine.category.toLowerCase() === selectedCategory.toLowerCase())
      );
    }
  }, [routines, selectedCategory]);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle the form submission
  const handleSubmit = async (updatedRoutine: PracticeRoutineDTO) => {
    try {
      await execute('POST', '/routines', updatedRoutine);
      setRoutines((prevRoutines) => [...prevRoutines, updatedRoutine]);
      setShowForm(false);
    } catch (error) {
      console.error('Error creating routine:', error);
    }
  };

  return (
    <div className="flex flex-grow flex-col bg-resonYellow sm:px-4 pb-4">
      {/* Filter + Button Container */}
      <div className="sticky bg-resonYellow top-0 flex flex-col sm:flex-row sm:justify-center items-center sm:pt-4 pb-4 gap-4 sm:gap-10 sm:px-36">
        <div className="flex flex-col sm:flex-row justify-center items-center font-pixelify text-2xl">
          <label htmlFor="categoryFilter" className="mr-2 text-black">filter:</label>
          
          <div className="relative">
            <select
              id="categoryFilter"
              value={selectedCategory}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="bg-resonGreen h-10 w-52 text-black text-2xl text-center font-pixelify px-4 py-0 border appearance-none cursor-pointer focus:outline-none"
            >
              {categories.map((category, index) => (
                <option key={index} value={category} className="text-black bg-resonGreen">
                  {category}
                </option>
              ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
              ⌄
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-resonPurple flex justify-center items-center font-pixelify h-10 w-52 text-2xl hover:bg-resonPurple-800"
        >
          {showForm ? 'close' : 'add routine'}
        </button>
      </div>

      {/* Routine Form */}
      {showForm && (
        <RoutineForm
          onClose={() => setShowForm(false)}
          initialData={{
            id: null,
            title: '',
            description: '',
            createdDate: '',
            category: '',
            targetBPM: null,
            targetFrequencyInterval: null,
            targetFrequencyUnit: null,
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* Routine Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 sm:gap-24 mx-auto place-items-center overflow-y-auto scrollbar-hidden">
        {filteredRoutines.map((routine, index) => (
          <Link to={`/routines/${routine.id.toString()}`} key={routine.id} className="w-full">
            <div className={`flex flex-col text-center justify-center items-center p-4 sm:aspect-square sm:w-60 shadow-sm text-black ${
                index % 2 === 0 ? "bg-resonGreen" : "bg-resonPurple"
              }`}>
              <h2 className="flex font-semibold text-4xl text-black font-handjet">{routine.title}</h2>
              <p className="flex text-sm text-gray-600">{routine.category}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutineOverview;