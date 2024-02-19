import style from "./SearchBar.module.css";
function SearchBar() {
  return (
    <input
      type="text"
      className={style.searchBar}
      placeholder="What do you want to learn today?"
    />
  );
}
export default SearchBar;
