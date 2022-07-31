import React from "react";
import "./Paginado.css";


export default function paginado({dogsPerPage, allDogs, paginado}){//perros por pagina, todos los perros y const paginado
    const pageNumbers=[]
    for(let i=0;i<=Math.ceil(allDogs/dogsPerPage) -1; i++){//redondea los perros/ los perros por pagina
        pageNumbers.push(i+1)//para que inicie en 1
    }
    //renderizar y me deja paginas de 8 perros
    return ( 
       
    <nav className="paginado">
        <ul className="paginado">
            {pageNumbers && 
            pageNumbers.map(number =>( 
              
                    <button onClick = { () => paginado(number)} key={number}>{number}</button>
                    
                
            )) }
        </ul>
    </nav>
    )
}


