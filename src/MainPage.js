function MainPage({ setCurrentPage }) {
  return (
    <>
      <h1 className="m-5">Snake Clone</h1>
      <button
        className="btn btn-primary m-2"
        onClick={() => setCurrentPage("option")}
      >
        Play
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => setCurrentPage("theme")}
      >
        Themes
      </button>
    </>
  );
}

export default MainPage;
