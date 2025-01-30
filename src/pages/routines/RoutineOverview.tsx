import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../../components';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import useApi from '../../hooks/useApi';

const RoutineOverview: React.FC = () => {
  const [filteredRoutines, setFilteredRoutines] = useState<PracticeRoutineDTO[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
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
      setRoutines(data); // Set routines with fetched data
      const categoryNames = data.map((routine) => routine.category);
      setCategories(['All', ...categoryNames]);
    }
  }, [data]); // Update when the data is available

  // Synchronize filtered routines with routines and selectedCategory
  useEffect(() => {
    if (selectedCategory === 'All') {
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

  // Format the date string directly using toLocaleDateString
  const formatDate = (createdDate: string): string => {
    const date = new Date(createdDate);
    return date.toLocaleDateString();
  };

  // Handle the form submission
  const handleSubmit = (updatedRoutine: any) => {
    // Send the updated routine to the backend (this is an example of a POST request)
    apiClient
      .post('/routines', updatedRoutine)
      .then((response) => {
        setRoutines((prevRoutines) => [...prevRoutines, response.data]);
        setShowForm(false); // Close the form after submitting
      })
      .catch((error) => {
        console.error('Error creating routine:', error);
      });
  };

  return (
    <div className="min-h-screen sm:overflow-y-auto bg-resonYellow sm:px-4 pb-4">
      {/* Filter + Button Container */}
      <div className="flex flex-col sm:flex-row sm:justify-center items-center pt-4 pb-10 gap-4 sm:gap-10 sm:px-36">
        {/* Filter Dropdown */}
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

        {/* Create Routine Button */}
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
            title: '',
            description: '',
            category: '',
            targetBPM: '',
            targetFrequencyInterval: '',
            targetFrequencyUnit: '',
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* Grid of Routines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 px-40 place-items-center">
        {filteredRoutines.map((routine, index) => (
          <Link to={`/routines/${routine.id.toString()}`} key={routine.id}>
            <div className={`flex flex-col text-center justify-center items-center aspect-square w-72 shadow-sm text-black ${
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