// export default function Cards() {
//   return <div>Cards</div>;
// }

import { TOKEN } from "../config";
import "./Cards.css";
import { useState, useEffect } from "react";
import Card from "./Card";

export default function Cards() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`https://api.shipap.co.il/cards?token=${TOKEN}`)
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="Cards">
      {cards.map((crd) => (
        <Card key={crd.id} card={crd} />
      ))}
    </div>

  );
}
