import "../assets/css/Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__container" data-testid="screenLoad">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
