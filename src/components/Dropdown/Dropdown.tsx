import { useState } from 'react';

interface CategoryDropdownProps {
  values: string[];
  onChange: (selectedCategory: string) => void;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ values, onChange }) => {
  const [selectedOption, setSelectedOption] = useState<string>(''); 

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      id="category"
      name="category"
      value={selectedOption} // Bind to internal state
      onChange={handleChange}
      className="mt-1 p-2 border rounded w-full bg-white"
    >
      <option value="">Select a category</option>
      {values.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropdown;