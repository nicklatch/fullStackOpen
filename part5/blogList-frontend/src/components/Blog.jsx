import Toggle from './Toggle';

const Blog = ({ blog }) => {
  const stylesMain = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '4px solid black',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '10px',
    maxWidth: '300px',
    flexWrap: 'none',
  };

  const toggledStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'ccenter',
    alignItems: 'start',
  };

  return (
    <div key={blog.id} style={stylesMain}>
      <h4
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {blog.title}, {blog.author}
        <Toggle buttonLabelOne='View' buttonLabelTwo={'Close'}>
          <h5 style={toggledStyle}>
            <div>
              URL: <a href={blog.url}>{blog.url}</a>
            </div>
            <div>
              Likes: {blog.likes}{' '}
              <button onClick={() => blog.likes + 1}>likes</button>
            </div>
          </h5>
        </Toggle>
      </h4>
    </div>
  );
};

export default Blog;
