import NoteForm from './NoteForm';
import { useResource } from '../hooks';

const Notes = () => {
  const [notes, noteService] = useResource('http://localhost:3005/notes');

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
