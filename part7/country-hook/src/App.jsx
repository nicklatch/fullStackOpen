import { useState } from 'react';
import Country from './components/Country';
import SearchForm from './components/SearchForm';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <SearchForm setName={setName} />
      <Country name={name} />
    </div>
  );
};

export default App;
