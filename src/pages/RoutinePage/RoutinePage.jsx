import { useEffect, useState } from 'react';
import { RoutineForm } from '../../components';
import apiClient from '../../api/apiClient';

console.log('Backend URL:', import.meta.env.VITE_RESON8_BACKEND_URL);
console.log('apiClient loaded:', apiClient);

const RoutinePage = () => {
  const [routines, setRoutines] = useState([]);
  const [filteredRoutines, setFilteredRoutines] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);

  // Fetch routines from backend
  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const response = await apiClient.get('/api/routines');
        const routines = response.data;

        console.log('Fetched response:', response);
        console.log('Fetched routines:', response.data);

        // Extract categories from the fetched routines
        const uniqueCategories = [
          'All',
          ...new Set(routines.map((routine) => routine.category)),
        ];

        setRoutines(routines);
        setFilteredRoutines(routines);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching routines:', error);
      }
    };

    fetchRoutines();
  }, []);

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRoutines(routines);
    } else {
      setFilteredRoutines(
        routines.filter((routine) => routine.category === category)
      );
    }
  };

  // Format the createdDate into a readable string
  const formatDate = (dateArray) => {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day); // Months are 0-indexed
    return date.toLocaleDateString(); // Format as per your locale
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
      {showForm && <RoutineForm onClose={() => setShowForm(false)} />}

      {/* Grid of Routines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRoutines.map((routine) => (
          <div key={routine.id} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="font-semibold text-lg text-black">{routine.title}</h2>
            <p className="text-sm text-black">{routine.category}</p>
            <p className="text-sm text-gray-600">
              <strong>Created on:</strong> {formatDate(routine.createdDate)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutinePage;