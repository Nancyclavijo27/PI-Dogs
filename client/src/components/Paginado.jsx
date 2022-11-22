import React from "react";
import "./Paginado.css";


export default function paginado({dogsPerPage, allDogs,currentPage, paginado}){
    const pageNumbers=[]
    for(let i=0;i<=Math.ceil(allDogs/dogsPerPage) -1; i++){
        pageNumbers.push(i+1)//para que inicie en 1
    }

    //renderizar y me deja paginas de 8 perros
    return ( 
       
    <nav className="paginated">
        <ul className='paginated li'>
            <button className={ currentPage === 1 ? "disabled" : "enabled" } disabled={currentPage === 1 ? true : false} onClick={() => paginado(currentPage - 1)}>
                Prev
            </button>
            {pageNumbers && 
            pageNumbers.map(number =>(        
                    <button onClick = { () => paginado(number)} key={number} className='num'>{number}</button>    
            )) }
           <button className={ currentPage === pageNumbers.length ? "disabled" : "enabled" } disabled={currentPage === pageNumbers.length ? true : false} onClick={() => paginado(currentPage + 1)}>
                Next
            </button>
        </ul>
    </nav>
    )
}



