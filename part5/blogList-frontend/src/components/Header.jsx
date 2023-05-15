/* eslint-disable react/prop-types */
const Header = ({ user, setUser }) => {
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <header>
      <h1>Blogs</h1>
      {user ? (
        <>
          <p>
            {user.name} <button onClick={handleLogout}>Logout</button>
          </p>
        </>
      ) : null}
    </header>
  );
};

export default Header;
