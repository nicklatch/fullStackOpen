import NoteForm from './NoteForm';
import { useResource } from '../hooks';
import { useEffect } from 'react';

const Notes = () => {
  const [notes, noteService] = useResource('notes');

  useEffect(() => {
    noteService.getAll();
  }, []);

  return (
    <>
      <h2>notes</h2>
      <NoteForm noteService={noteService} />
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
    </>
  );
};

export default Notes;
