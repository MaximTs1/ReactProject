import "./MyCards.css";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "./Card";
import { TOKEN } from "../config";

export default function MyCards() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  return (
    <div className="Cards">
      {cards.map((crd) => (
        <Card key={crd.id} card={crd} />
      ))}
      <Button
        type="submit"
        size="large"
        variant="contained"
        onClick={() => navigate("../addcard")}
        sx={{ mt: 3, mb: 2 }}
      >
        add card
      </Button>
    </div>
  );
}
