import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import { anecdotes as mockAnecdotes } from './mock/mockData';
import Menu from './components/Menu';
import About from './components/About';
import AnecdoteList from './components/AnecdoteList';
import Anecdote from './components/Anecdote';
import CreateNew from './components/CreateNew';
import Footer from './components/Footer';
import Notification from './components/Notification';

const App = () => {
  const [anecdotes, setAnecdotes] = useState(mockAnecdotes);
  const [notification, setNotification] = useState('');

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(anecdote.content);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find((anecdote) => anecdote.id === Number(match.params.id))
    : null;

  return (
    <>
      <header>
        <h1>Software anecdotes</h1>
        <Menu />
      </header>
      <main>
        <Notification notification={notification} />
        <Routes>
          <Route
            path='/anecdotes/:id'
            element={<Anecdote anecdote={anecdote} />}
          />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/about' element={<About />} />
          <Route path='/create' element={<CreateNew addNew={addNew} />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
