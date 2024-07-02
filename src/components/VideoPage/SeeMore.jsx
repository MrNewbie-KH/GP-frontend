function SeeMore({ children, changePage }) {
  return (
    <div className="see-more" onClick={changePage}>
      See more {children}
    </div>
  );
}
export default SeeMore;
