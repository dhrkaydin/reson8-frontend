import { useState } from 'react';
import { Header } from './components';  // Assuming the Header component is inside the components folder
import './styles/App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <main className="flex-1 bg-white p-6">
        {/* Your other components will go here */}
        <h1 className="text-center text-4xl font-bold">Welcome to Reson8</h1>
        <div className="text-center mt-4">
          <button onClick={() => setCount(count + 1)} className="bg-pastel-pink text-white py-2 px-4 rounded">
            Count is {count}
          </button>
        </div>
      </main>
    </>
  );
}

export default App;