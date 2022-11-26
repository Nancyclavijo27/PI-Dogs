import React from 'react'
import { Link } from "react-router-dom";
import "./Card.css";

import { useDispatch, useSelector } from "react-redux";

//
import { getDetail, addFav, deleteFav } from "../actions/index";

function CardDogs(props) {
    const { name, weightMin, weightMax, image, temperament, id } = props;
    
    const temperamentTemp = !temperament ? ["N/A"] : temperament.split(",") ; // si no hay temperamento, lo pongo en N/A
    const dispatch = useDispatch();

    const { fav } = useSelector((state) => state);
    console.log(fav);
    const active = fav.find((dogfav) => dogfav.id === id);
    const handleFav = (data) => {
        const included = fav.find((dogfav) => dogfav.id === id);
        included && dispatch(deleteFav(data));
        !included && dispatch(addFav(data));
    };
    

    return (
        <div className ="card">
            <div className="card_container">
                <div className="name">
                    <h1>{name}</h1>
                </div>
                <Link to={`/home/${id}`}>
                    <img src={image} alt={name} className="image" onClick={() => dispatch(getDetail(id))}/> {/* Envio el id al reducer para crear la seccion de Description */}
                </Link>
                <div className="container__info">
                    <p>Peso: Min: {weightMin}kg - Max: {weightMax}kg</p>
                </div>
                <div className="temperament">
                    {
                        temperamentTemp.map((temps, index) => { // recorro el array de temperamentos, index es el indice del array
                            if( index < 6 ) {
                                return <p key={index}>{temps}</p> //solo muestro 6 temperamentos
                            } 
                        })
                    }
                </div>
                <button
                    onClick={() => handleFav(props)}
                    className={active ? "favActive" : "fav"}
                >
                *
                </button>
            </div>
        </div>
    )
}

export default CardDogs