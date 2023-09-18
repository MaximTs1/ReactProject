import { Link } from "react-router-dom";

export default function Card({ card }) {
  return (
    <Link to={`/cards/${card.id}`}>
      <div className="card">
        <div
          className="card-img"
          style={{ backgroundImage: `url('${card.imgUrl}')` }}
        ></div>

        <header>{card.description}</header>
        <footer>{card.title}</footer>
      </div>
    </Link>
  );
}
