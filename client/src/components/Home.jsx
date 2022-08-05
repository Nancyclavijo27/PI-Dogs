import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, filterCreated, ordenByName, getTemperaments, filterTemperament, ordenByWeight,} from "../actions";
import {Link} from "react-router-dom"
//importo los componentes que voy a usar
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import "./Home.css";
//inicia el componente
export default function Home(){

const dispatch = useDispatch() 
const allDogs = useSelector ((state)=>state.dogs) // trae todo lo que esta en el estado dogs
//para el paginado

const [currentPage,setCurrentPage]= useState(1)
const [dogsPerPage, setDogsPerPage] = useState(8)
const indexOfLastDog= currentPage * dogsPerPage
const indexOfFirstDog=indexOfLastDog- dogsPerPage
const currentDogs=allDogs.slice(indexOfFirstDog,indexOfLastDog)

const [orden, setOrden]=useState("")//ayuda a renderizar estado local que arranca vacio

//esta constante nos ayuda al renderizado
const paginado=(pageNumber)=>{
    setCurrentPage(pageNumber)
}

const temperaments =useSelector((state)=>state.temperaments)

useEffect(()=>{ //trae el estado cuando el componente se monta
    dispatch( getDogs())
    dispatch((getTemperaments()))
},[dispatch] )


function handleSelect(e){//logica del select
    e.preventDefault(e);
    dispatch(filterTemperament(e.target.value))
    setCurrentPage(1);//para que inicie en la pagina 1
    setOrden(`Ordenado ${e.target.value}`)

}

// recetea lo que se despacha funcion preventiva
function handleClick(e){
 e.preventDefault();
 dispatch(getDogs());//despacho la accion
}

function handleFilterCreate(e){
    dispatch(filterCreated(e.target.value))
}

function handleSort(e){//ordenamiento a-z
    e.preventDefault();
    dispatch(ordenByName(e.target.value))
    setCurrentPage(1);//para que inicie en la pagina 1
    setOrden(`Ordenado ${e.target.value}`)//modifica el estado local y se renderiza
    
}

function handleSortWeight(e) {
    e.preventDefault();
    dispatch(ordenByWeight(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }


//renderizar
//select para mis filtros
//option value es una istruccion dependiendo su valor toma una accion - siempre el value debe ser igual al de la api
return (
    <div className="home-container">
 <Link   to="/dog">Añadir nueva raza</Link>
 <h1>Busca y conoce a tu mejor amigo</h1>
 <button  className="btn" onClick={e=>{handleClick(e)}}>
    volver a cargar todas las razas de perros
 </button>
 <div>
        <select className="selec"  onChange={(e) => handleSortWeight(e)} >
          <option value="All">Todos </option>
          <option value="min">Peso Min</option>
          <option value="max">Peso Max</option>
        </select>
    
    <select className="selec" onChange={e=>handleSort(e)}>
        <option value= "All">Todos</option>  
        <option value= "asc">De la A-Z</option>
        <option value= "desc">De la Z-A</option>                                   
    </select>
   
    <select  className="selec" onChange={e=>handleFilterCreate(e)}>
        <option value= "All">Todos</option>
        <option value= "created">Creados</option>
        <option value= "api">De la api</option>
    </select>
    <select className="selec" onChange={(e)=>handleSelect(e)}>
         <option  value= "All">Temperamentos</option>
            {temperaments.map((tem)=>(
         <option key={tem.id} value={tem.name}>{tem.name}</option>
                    ))}
    </select>

    <div className="paginado">
    <Paginado
    dogsPerPage={dogsPerPage}//son las propiedades que se requiere para funcionar
    allDogs={allDogs.length}
    paginado={paginado}
    />
    </div>
    <SearchBar/>

    <div className="card-dogs">

    {currentDogs?.map((c)=>{//me trae la pagina con 8 perritos gracias al paginado
        return(
           <div>
            <Link to={`/home/${c.id}`}></Link>
           <Card   key={c.id}
                   id={c.id}
                   name={c.name} 
                   image={ c.image
                    ? c.image
                    : "https://i0.wp.com/imagendeperros.com/wp-content/uploads/2016/01/Raza-de-Perros-Pastor-Alem%C3%A1n.jpg"} 
                   temperament={c.temperament} 
                   weightMax={c.weightMax}  
                   weightMin={c.weightMin}/>
           
           </div>
    ) 
    
    })}
    </div>
 </div>
    </div>
)

}