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
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Routines</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-pastelPink text-white px-4 py-2 rounded hover:bg-pink-500"
        >
          {showForm ? 'Close Form' : 'Create New Routine'}
        </button>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-4 items-end">
        <label htmlFor="categoryFilter" className="mr-2 text-black">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRoutines.map((routine) => (
          <Link to={`/routines/${routine.id.toString()}`} key={routine.id}>
            <div className="p-4 border rounded shadow-sm bg-white">
              <h2 className="font-semibold text-lg text-black">{routine.title}</h2>
              <p className="text-sm text-black">{routine.category}</p>
              <p className="text-sm text-gray-600">
                <strong>Created on:</strong> {routine.createdDate != null ? formatDate(routine.createdDate) : 'N/A'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutineOverview;