import React, { useEffect } from 'react'
import Footer from '../Footer/Footer'
import { useSelector, useDispatch } from "react-redux";
import Nav404 from '../Nav/Nav404';
import styles from "../CardDogs/cardDogs.module.css";
import sty from '../Error404/NotFound404.module.css'
import {Link} from 'react-router-dom';
import { getDetail, deleteFav } from "../../actions/actions";

function Favorites() {
    const { fav } = useSelector((state) => state);
    const dispatch = useDispatch();

    let favId = fav.map((dogfav) => {
        return dogfav.id;
    })

    const active = fav.find((dogfav) => dogfav.id === favId);
    const handleDeleteFav = (data) => {
        dispatch(deleteFav(data));
    }
    
    return (
        <div>
            <Nav404/>
                <div className={styles.favContainer}>
                    {
                        fav.length ? (
                            fav.map((dogfav) => {
                                return (
                                    <div className ="card">
                                    <div className="card_container">
                                        <div className="name">
                                            <h1>{dogfav.name}</h1>
                                        </div>
                                        <Link to={`/home/${dogfav.id}`}>
                                            <img src={dogfav.image} alt={dogfav.name} className="image" onClick={() => dispatch(getDetail(dogfav.id))}/> {/* Envio el id al reducer para crear la seccion de Description */}
                                        </Link>
                                        <div className="container__info">
                                            <p>Peso: Min: {dogfav.weightMin}kg - Max: {dogfav.weightMax}kg</p>
                                        </div>
                                        <div className={styles.temperament}>
                                            {
                                                dogfav.temperament.split(",").map((temps, index) => { // recorro el array de temperamentos, index es el indice del array
                                                    if( index < 6 ) {
                                                        return <p key={index}>{temps}</p> //solo muestro 6 temperamentos
                                                    }
                                                })
                                            }
                                        </div>
                                        <button 
                                            onClick={() => handleDeleteFav(dogfav)}
                                            className={active ? styles.fav : styles.favActive}
                                        >
                                        +
                                        </button>
                                    </div>
                                </div>
                                )}
                            )
                        ) : (
                            <div className={styles.favError}>
                                <h2>No dogs added to favorites have been found</h2>
                                <p>Go home and add a dog to favorites</p>
                                <Link to="/home">
                                    <button className={sty.notFound404_button}>Home</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            <Footer/>
        </div>
    )
}

export default Favorites