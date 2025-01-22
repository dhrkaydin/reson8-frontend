import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../../components';
import { PracticeRoutineDTO } from '../../generated/models/PracticeRoutineDTO';
import apiClient from '../../api/apiClient';

const RoutineOverview: React.FC = () => {
  const [routines, setRoutines] = useState<PracticeRoutineDTO[]>([]);
  const [filteredRoutines, setFilteredRoutines] = useState<PracticeRoutineDTO[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch routines and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routinesResponse, categoriesResponse] = await Promise.all([
          apiClient.get<PracticeRoutineDTO[]>('/routines'),
          apiClient.get<string[]>('/routines/categories'),
        ]);

        const routines: PracticeRoutineDTO[] = routinesResponse.data || [];
        const categories: string[] = ['All', ...categoriesResponse.data];

        setRoutines(routines);
        setFilteredRoutines(routines);
        setCategories(categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRoutines(routines);
    } else {
      setFilteredRoutines(
        routines.filter((routine) => routine.category.toLowerCase() === category.toLowerCase())
      );
    }
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
          categories={categories}
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