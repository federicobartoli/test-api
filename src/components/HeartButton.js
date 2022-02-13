import '../assets/css/HeartButton.css';

const HeartButton = ({ active }) => {
  return (
    <button className={`heart-button ${active && 'active'}`}>
      <div className="heart-flip"></div>
      <span>
        Like<span>d</span>
      </span>
    </button>
  );
};

export default HeartButton;
