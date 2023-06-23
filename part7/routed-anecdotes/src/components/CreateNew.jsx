import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.atributes.value,
      author: author.atributes.value,
      info: info.atributes.value,
      votes: 0,
    });
    navigate('/');
  };

  const handleReset = () => {
    [content, author, info].map((atr) => atr.resetter());
  };

  return (
    <>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset} id='newForm'>
        <div>
          <label htmlFor='content'>
            content:
            <input {...content.atributes} name='content' />
          </label>
        </div>
        <div>
          <label htmlFor='author'>
            author:
            <input {...author.atributes} name='author' />
          </label>
        </div>
        <div>
          <label htmlFor='info'>
            url for more info
            <input {...info.atributes} name='info' />
          </label>
        </div>
        <button type='submit'>create</button>
        <button type='reset'>reset</button>
      </form>
    </>
  );
};

export default CreateNew;
