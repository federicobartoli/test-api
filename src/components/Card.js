import HeartButton from '../components/HeartButton';
//Context

const Card = (props) => {
  return (
    <div onClick={props.handleLike} className="card">
      {props.children}
      <HeartButton active={props.liked} />
    </div>
  );
};

export default Card;
