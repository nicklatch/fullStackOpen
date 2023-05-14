const Header = ({ user }) => {
  const handleLogout = (event) => {
    window.localStorage.clear();
    window.location.reload();
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
