import React, { useState, useEffect, useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Typography from "@mui/material/Typography";
import { GeneralContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import { search } from "../components/Searchbar";
import "./Cards.css";

export default function Cards() {
  const [cards, setCards] = useState([]);
  const { setLoader, user, roleType, searchWord, snackbar } = useContext(GeneralContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://api.shipap.co.il/cards?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`
    )
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
      })
      .finally(() => setLoader(false));
  }, [searchWord]); // Update cards when searchWord changes

  const adminRemoveCard = (id) => {
    if (!window.confirm("Are you sure you want to remove this card?")) {
      return;
    }
    setLoader(true);
    fetch(
      `https://api.shipap.co.il/admin/cards/${id}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
      {
        credentials: "include",
        method: "DELETE",
      }
    )
      .then(() => {
        setCards(cards.filter((c) => c.id !== id));
        snackbar('The card was deleted');


      })
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  };

  const toggleFavorite = (id) => {
    setLoader(true);
    const updatedCards = [...cards];
    const cardIndex = updatedCards.findIndex((c) => c.id === id);

    if (cardIndex !== -1) {
      const isFavorite = updatedCards[cardIndex].favorite;

      // Toggle the favorite status
      updatedCards[cardIndex].favorite = !isFavorite;
      setCards(updatedCards);

      const method = isFavorite ? "unfavorite" : "favorite";

      fetch(
        `https://api.shipap.co.il/cards/${id}/${method}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,
        {
          credentials: "include",
          method: "PUT",
        }
      )
        .then(() => {
          if(method === "favorite"){
          snackbar('Card was added to favorite page');
          }else{
            snackbar('Card was removed from favorite page');

          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoader(false));
    }
  };

  const navigateToEditCard = (id) => {
    navigate(`/editCard`, { state: { cardId: id } });
  };

  const navigateToCardInfo = (id) => {
    navigate(`/cardInfo`, { state: { idd: id } });
  };

  return (
    <div className="Cards">
      <header>
        <h1>Truly for every occasion</h1>
        <p>Here you can find business cards from all categories</p>
      </header>

      {searchWord && <p>חיפוש פעיל ({searchWord})</p>}

      <div className="row">
        {cards
          .filter((c) => search(searchWord, c.title, c.description, c.subTitle))
          .map((c) => (
            <Card
              className="column"
              sx={{
                width: 300,
                mb: 5,
                boxShadow: "5px 5px 5px 5px rgba(0, 0, 0, 0.11)",
                borderRadius: "10px",
              }}
              key={c.title}
            >
              <CardMedia
                component="img"
                height="190"
                image={c.imgUrl}
                alt={c.imgAlt}
                onClick={() => navigateToCardInfo(c.id)}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h1"
                  component="h1"
                  sx={{
                    fontFamily: "Oswald, sans-serif",
                    fontWeight: 500,
                    color: "black",
                    fontSize: 32,
                  }}
                >
                  {c.title}
                </Typography>
                <Typography style={{ marginTop: 20, fontSize: 16 }}>
                  <b>Phone:</b> {c.phone}
                  <br />
                  <b>Address:</b> {c.houseNumber} {c.street} <br /> {c.country},{" "}
                  {c.city} {c.zip} <br />
                  <b>Card Number:</b> 0000000{c.id}
                </Typography>
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  position: "relative",
                }}
              >
                {user && (
                  <IconButton
                    className="heart-icon"
                    aria-label="add to favorites"
                    onClick={() => toggleFavorite(c.id)}
                  >
                    <FavoriteBorderIcon
                      style={{ color: c.favorite ? "red" : "grey" }}
                    />
                  </IconButton>
                )}
                {roleType === 3 && (
                  <IconButton
                    className="trash-icon"
                    sx={{ position: "absolute", right: "5px" }}
                    onClick={() => adminRemoveCard(c.id)}
                    aria-label="delete"
                  >
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                )}
                {roleType === 3 && (
                <IconButton
                  className="edit-icon"
                  aria-label="edit"
                  onClick={() => navigateToEditCard(c.id)}
                >
                  <EditIcon style={{ color: "orange" }} />
                </IconButton>
                )}
              </CardActions>
            </Card>
          ))}
      </div>
      {user && (
        <button className="addCard">
          <Link to={"/addcard"}>+</Link>
        </button>
      )}
    </div>
  );
}
