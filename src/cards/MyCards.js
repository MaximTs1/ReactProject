// import "./MyCards.css";
// import Button from "@mui/material/Button";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Card from "./Card";
// import { TOKEN } from "../config";

// export default function MyCards() {
//   const navigate = useNavigate();
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data) => setCards(data));
//   }, []);

//   return (
//     <div className="Cards">
//       {cards.map((crd) => (
//         <Card key={crd.id} card={crd} />
//       ))}
//       <Button
//         type="submit"
//         size="large"
//         variant="contained"
//         onClick={() => navigate("../addcard")}
//         sx={{ mt: 3, mb: 2 }}
//       >
//         add card
//       </Button>
//     </div>
//   );
// }














// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import CallIcon from '@mui/icons-material/Call';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Typography from '@mui/material/Typography';
// import { useContext, useEffect, useState } from 'react';
// import { GeneralContext } from '../App';
// import { Link } from 'react-router-dom';
// import './Cards.css';
// import { TOKEN } from '../config';




// export default function MyCards() {
//   const [myCards, setmyCards] = useState([]);
//   const { setLoader, user, roleType } = useContext(GeneralContext);


//   useEffect(() => {
//     setLoader(true);
//         fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
//           credentials: "include",
//         })
//           .then((res) => res.json())
//           .then((data) => setmyCards(data))
//           .finally(() => setLoader(false));
//       }, []);

      

//   return (
//     <div className='Cards'>
//             <header>
//                 <h1>Truly for every occasion</h1>
//                 <p>Here you can find business cards from all categories</p>
//             </header>

//             <div className='row'>

//                 {
//                     myCards.map(c =>
//                         <Card className='column' sx={{ width: 300, mb: 5, boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px' }} key={c.title}>
//                             <CardMedia
//                                 component="img"
//                                 height="190"
//                                 image={c.imgUrl}
//                                 alt={c.imgAlt}
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h1" component="h1" sx={{ fontFamily: "Oswald, sans-serif", fontWeight: 500, color: "black", fontSize: 32 }}>
//                                     {c.title}
//                                 </Typography>
//                                 <Typography style={{ marginTop: 20, fontSize: 16 }}>
//                                     <b>Phone:</b> {c.phone}<br />
//                                     <b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip} <br />
//                                     <b>Card Number:</b> 0000000{c.id}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
//                                 {roleType === 3 && <IconButton className='trash-icon' sx={{ position: 'absolute', left: '5px', }} onClick={() => adminRemoveCard(c.id)} aria-label="delete">
//                                     <DeleteIcon style={{ color: "grey" }} />
//                                 </IconButton>}

//                                 {user && <IconButton className='heart-icon' aria-label="add to favorites" onClick={() => redHeart ? unfavorite(c.id) : favorite(c.id)}>
//                                     <FavoriteIcon style={{ color: "grey" }} />
//                                 </IconButton>}
//                                 <IconButton className='phone-icon' aria-label="call">
//                                     <CallIcon style={{ color: "grey" }} />
//                                 </IconButton>
//                             </CardActions>
//                         </Card>
//                     )
//                 }

//             </div>
//             {user && <button className='addCard'><Link to={'/business/cards/new'}>+</Link></button>}

//         </div>
    
//   );
// }





// // export default function Cards() {
// //   return <div>Cards</div>;
// // }







// import { TOKEN } from "../config";
// import "./Cards.css";
// import { useState, useEffect } from "react";
// import Card from "./Card";

// export default function Cards() {
//   const [cards, setCards] = useState([]);

//   useEffect(() => {
//     fetch(`https://api.shipap.co.il/cards?token=${TOKEN}`)
//       .then((res) => res.json())
//       .then((data) => setCards(data));
//   }, []);

//   return (
//     <div className="Cards">
//       {cards.map((crd) => (
//         <Card key={crd.id} card={crd} />
//       ))}
//     </div>

//   );
// }















// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import IconButton from '@mui/material/IconButton';
// import CallIcon from '@mui/icons-material/Call';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Typography from '@mui/material/Typography';
// import { useContext, useEffect, useState } from 'react';
// import { GeneralContext } from '../App';
// import { Link, Navigate } from 'react-router-dom';
// import search from '../components/Searchbar'
// import './Cards.css';
// import { TOKEN } from '../config';

// // import { RoleTypes, checkPermissions } from "../components/Roles";


// export default function Cards() {
//     const [cards, setCards] = useState([]);
//     const [favoriteCards, setFavoriteCards] = useState([]);
//     const [redHeart, setRedHeart] = useState(false);
//     const { setLoader, user, roleType, snackbar, searchWord } = useContext(GeneralContext);
//       const [myCards, setmyCards] = useState([]);


//     useEffect(() => {
//         setLoader(true);
//         fetch(`https://api.shipap.co.il/cards?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`)
//             .then(res => res.json())
//             .then(data => {
//                 setCards(data)
//             })
//             .finally(() => setLoader(false));
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [])


//      useEffect(() => {
//     setLoader(true);
//         fetch(`https://api.shipap.co.il/business/cards?token=${TOKEN}`, {
//           credentials: "include",
//         })
//           .then((res) => res.json())
//           .then((data) => setmyCards(data))
//           .finally(() => setLoader(false));
//       }, []);


//     const adminRemoveCard = (id) => {
//         if (!window.confirm('Are you sure you want to remove this card?')) {
//             return;
//         }
//         setLoader(true);
//         fetch(`https://api.shipap.co.il/admin/cards/${id}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
//             credentials: 'include',
//             method: 'DELETE',
//         })
//             .then(() => {
//                 setCards(cards.filter(c => c.id !== id));
//                 // snackbar("Card removed successfully");
//             })
//             .catch(err => console.log(err))
//             .finally(() => setLoader(false))
//     };

//     const favorite = (id) => {
//         fetch(`https://api.shipap.co.il/cards/${id}/favorite?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
//             credentials: 'include',
//             method: 'PUT',
//         })
//             .then(() => {
//                 setRedHeart(true);
//                 setFavoriteCards(cards.filter(c => c.id === id));
//                 Navigate('/favorite');
//                 // snackbar("Card added to favorites");
//             });
//     }

//     const unfavorite = (id) => {
//         setLoader(true);
//         fetch(`https://api.shipap.co.il/cards/${id}/unfavorite?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
//             credentials: 'include',
//             method: 'PUT',
//         })
//             .then(() => {
//                 setRedHeart(false);
//                 setFavoriteCards(favoriteCards.filter(c => c.id !== id));
//                 // snackbar("Card removed from favorites");
//             })
//             .finally(() => setLoader(false));
//     }

//     const filteredCards = cards.filter(c => myCards.map(mc => mc.id).includes(c.id));
//     return (
//         <div className='Cards'>
//             <header>
//                 <h1>Truly for every occasion</h1>
//                 <p>Here you can find business cards from all categories</p>
//             </header>

//             {searchWord && <p>חיפוש פעיל ({searchWord})</p>}

//             <div className='row'>
            
//                 {
//                     filteredCards.map(c => 
//                         <Card className='column' sx={{ width: 300, mb: 5, boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px' }} key={c.title}>
//                             <CardMedia
//                                 component="img"
//                                 height="190"
//                                 image={c.imgUrl}
//                                 alt={c.imgAlt}
//                             />
//                             <CardContent>
//                                 <Typography gutterBottom variant="h1" component="h1" sx={{ fontFamily: "Oswald, sans-serif", fontWeight: 500, color: "black", fontSize: 32 }}>
//                                     {c.title}
//                                 </Typography>
//                                 <Typography style={{ marginTop: 20, fontSize: 16 }}>
//                                     <b>Phone:</b> {c.phone}<br />
//                                     <b>Adress:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip} <br />
//                                     <b>Card Number:</b> 0000000{c.id}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
//                                 {roleType === 3 && <IconButton className='trash-icon' sx={{ position: 'absolute', right: '5px', }} onClick={() => adminRemoveCard(c.id)} aria-label="delete">
//                                     <DeleteIcon style={{ color: "grey" }} />
//                                 </IconButton>}

//                                 {user && <IconButton className='heart-icon' aria-label="add to favorites" onClick={() => redHeart ? unfavorite(c.id) : favorite(c.id)}>
//                                     <FavoriteIcon style={{ color: c.favorite ? "red" : "grey"}} />
//                                 </IconButton>}
//                                 <IconButton className='phone-icon' aria-label="call">
//                                     <CallIcon style={{ color: "grey" }} />
//                                 </IconButton>
//                             </CardActions>
//                         </Card>
//                     )
//                 }

//             </div>
//             {user && <button className='addCard'><Link to={'/addcard'}>+</Link></button>}

//         </div>
//     );
// }



import React, { useEffect, useState, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import { GeneralContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import search from '../components/Searchbar'
import './Cards.css';

export default function Cards() {
    const [cards, setCards] = useState([]);
    const { setLoader, user, roleType, snackbar, searchWord } = useContext(GeneralContext);

    const navigate = useNavigate();

    useEffect(() => {
              setLoader(true);
              fetch(`https://api.shipap.co.il/business/cards?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
                credentials: 'include', })          
                  .then(res => res.json())
                  .then(data => {
                      setCards(data)
                  })
                  .finally(() => setLoader(false));
              // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [])

    const adminRemoveCard = (id) => {
        if (!window.confirm('Are you sure you want to remove this card?')) {
            return;
        }
        setLoader(true);
        fetch(`https://api.shipap.co.il/admin/cards/${id}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
            credentials: 'include',
            method: 'DELETE',
        })
            .then(() => {
                setCards(cards.filter(c => c.id !== id));
            })
            .catch(err => console.log(err))
            .finally(() => setLoader(false));
    };

    const toggleFavorite = (id) => {
        setLoader(true);
        const updatedCards = [...cards];
        const cardIndex = updatedCards.findIndex(c => c.id === id);

        if (cardIndex !== -1) {
            const isFavorite = updatedCards[cardIndex].favorite;

            // Toggle the favorite status
            updatedCards[cardIndex].favorite = !isFavorite;
            setCards(updatedCards);

            const method = isFavorite ? 'unfavorite' : 'favorite';

            fetch(`https://api.shipap.co.il/cards/${id}/${method}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
                credentials: 'include',
                method: 'PUT',
            })
                .then(() => {
                    // snackbar(`Card ${method === 'favorite' ? 'added to' : 'removed from'} favorites`);
                    if (method === 'unfavorite') {
                        // Reload the page after unfavorite
                        window.location.reload();
                    }

                })
                .catch(err => console.log(err))
                .finally(() => setLoader(false));
        }
    };

    return (
        <div className='Cards'>
            <header>
                <h1>My cards !</h1>
            </header>


            <div className='row'>
                {cards
                    .map(c => (
                        <Card
                            className='column'
                            sx={{ width: 300, mb: 5, boxShadow: '5px 5px 5px 5px rgba(0, 0, 0, 0.11)', borderRadius: '10px' }}
                            key={c.title}
                        >
                            <CardMedia
                                component="img"
                                height="190"
                                image={c.imgUrl}
                                alt={c.imgAlt}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h1" component="h1" sx={{ fontFamily: "Oswald, sans-serif", fontWeight: 500, color: "black", fontSize: 32 }}>
                                    {c.title}
                                </Typography>
                                <Typography style={{ marginTop: 20, fontSize: 16 }}>
                                    <b>Phone:</b> {c.phone}<br />
                                    <b>Address:</b> {c.houseNumber} {c.street} <br /> {c.country}, {c.city}  {c.zip} <br />
                                    <b>Card Number:</b> 0000000{c.id}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                                {user && (
                                    <IconButton
                                        className='heart-icon'
                                        aria-label="add to favorites"
                                        onClick={() => toggleFavorite(c.id)}
                                    >
                                        <FavoriteBorderIcon style={{ color: c.favorite ? "red" : "grey" }} />
                                    </IconButton>
                                )}
                                {roleType === 3 && (
                                    <IconButton
                                        className='trash-icon'
                                        sx={{ position: 'absolute', right: '5px' }}
                                        onClick={() => adminRemoveCard(c.id)}
                                        aria-label="delete"
                                    >
                                        <DeleteIcon style={{ color: "grey" }} />
                                    </IconButton>
                                )}
                                <IconButton className='edit-icon' aria-label="edit" 
                                onClick={()=> navigate('/addcard')}>
                                    <EditIcon style={{ color: "orange" }} />
                                </IconButton>
                            </CardActions>
                        </Card>
                    ))}
            </div>
            {user && <button className='addCard'><Link to={'/addcard'}>+</Link></button>}
        </div>
    );
}

