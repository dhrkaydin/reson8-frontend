import React, { useState } from 'react';
import { RoutineForm } from './../../components';

const RoutinePage = () => {
  // Mock data for routines
  const mockRoutines = [
    { id: 1, title: 'C Major Positions', category: 'Scales' },
    { id: 2, title: 'Steve Vai 10H Workout', category: 'Technique' },
    { id: 3, title: 'Chord Practice', category: 'Chords' },
    { id: 4, title: 'Improvisation', category: 'Improvisation' },
  ];

  // Mock data for categories
  const mockCategories = ['All', 'Scales', 'Technique', 'Chords', 'Improvisation'];

  const [routines, setRoutines] = useState(mockRoutines);
  const [filteredRoutines, setFilteredRoutines] = useState(mockRoutines);
  const [categories] = useState(mockCategories);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showForm, setShowForm] = useState(false);

  // Filter routines based on selected category
  const handleFilterChange = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredRoutines(routines);
    } else {
      setFilteredRoutines(routines.filter(routine => routine.category === category));
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
      <div className="mb-4 place-items-end">
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
            <h2 className="font-semibold text-lg">{routine.title}</h2>
            <p className="text-sm text-gray-500">{routine.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoutinePage;