import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
import {getDetail} from "../actions/index"
import { useDispatch } from "react-redux";
//informacion que lleva la targeta y renderiza lo que se necesirta

export default function Card ({name, image, temperament, weightMin, weightMax,id , life_spanMin}){
    const dispatch=useDispatch

    return (
        
        <div className="card">
        <div className="cards">
          <div className="img-container">
            
              <img src={image} alt={name}></img>
            
          </div>
          <div className="info-container">
            <div className="card-info">
              <Link to={`/home/${id}`}> 
              <p className="title" onClick={() => dispatch(getDetail(id))}>{name}</p>
              </Link>
            </div>
            <div className="card-bio">
              <p>Peso: Min: {weightMin}kg - Max: {weightMax}kg</p>
              <p>Temperament: {temperament}</p>
              <p>Vida: {life_spanMin}</p>
            </div>
          </div>
        </div>
      </div>
    )
}

