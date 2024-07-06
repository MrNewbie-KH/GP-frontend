function Loader({ small }) {
  return (
    <>{small ? <p className="loader-small loader"></p> : <p className="loader"></p>}</>
  );
}
export default Loader;
