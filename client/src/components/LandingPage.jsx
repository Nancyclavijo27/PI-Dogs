import React from "react";
import {Link} from "react-router-dom"
import "./LandingPage.css"


//pagina inicial,  boton para ingresar

export default function LandinPage(){ //componente de funcion 
    return (
        
        <div className="container_text">
            <h1 className="title ">Bienvenidos a mi pagina</h1>
            <h2 className="title">!Los perros¡ los mejores amigos del hombre </h2>
            <img src="https://www.residenciacaninadebureba.com/wp-content/uploads/2019/09/cachorro-pastor-aleman-atento.jpg" alt="" width="600px"height="450px"border="5px"/>
            <h2 className="title">Conocer las diferentes rasas de perro, sus caracteristicas y temperamentos </h2>
            <Link to ="/home">
                <button className="button">Hacer clic</button>
            </Link>
           
        </div>
        
        
    )
}