import React from "react";
import {Link} from "react-router-dom"

//pagina inicial,  boton para ingresar

export default function LandinPage(){ //componente de funcion 
    return (
        <div>
            <h1>Bienvenidos a mi pagina</h1>
            <Link to ="/home">
                <button>Ingresar</button>
            </Link>
        </div>
    )
}