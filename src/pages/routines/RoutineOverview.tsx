import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RoutineForm } from '../../components';
import apiClient from '../../api/apiClient';

interface Routine {
  id: number;
  title: string;
  category: string;
  createdDate: string | [number, number, number];
}

const RoutineOverview: React.FC = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [filteredRoutines, setFilteredRoutines] = useState<Routine[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showForm, setShowForm] = useState<boolean>(false);

  // Fetch routines and categories from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routinesResponse, categoriesResponse] = await Promise.all([
          apiClient.get<Routine[]>('/routines'),
          apiClient.get<string[]>('/routines/categories'),
        ]);

        const routines: Routine[] = routinesResponse.data || [];
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
        routines.filter((routine) => routine.category === category)
      );
    }
  };

  const formatDate = (createdDate: string | [number, number, number]): string => {
    if (typeof createdDate === 'string') {
      return new Date(createdDate).toLocaleDateString();
    } else {
      const [year, month, day] = createdDate;
      const date = new Date(year, month - 1, day); // Months are 0-indexed
      return date.toLocaleDateString();
    }
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
      {showForm && <RoutineForm onClose={() => setShowForm(false)} categories={categories}/>}

      {/* Grid of Routines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredRoutines.map((routine) => (
          <Link to={`/routines/${routine.id}`} key={routine.id}>
            <div className="p-4 border rounded shadow-sm bg-white">
              <h2 className="font-semibold text-lg text-black">{routine.title}</h2>
              <p className="text-sm text-black">{routine.category}</p>
              <p className="text-sm text-gray-600">
                <strong>Created on:</strong> {formatDate(routine.createdDate)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RoutineOverview;