import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getDogs, filterCreated, ordenByName, getTemperaments, filterTemperament, ordenByWeight,  filterMayorMenor} from "../actions";
import {Link} from "react-router-dom"
//importo los componentes que voy a usar
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import notRaza from "../Imagenes/noPerro.jpg";
import Footer from "../components/Footer";
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
const [charge, setCharge] = useState(false); // variable para saber si esta cargando
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

function handleFilterMaMe(e){
    e.preventDefault(e);
    dispatch(filterMayorMenor(e.target.value))
    setCurrentPage(1);//para que inicie en la pagina 1
    setOrden(`Ordenado ${e.target.value}`)
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
 <Link className="link"  to="/dog">Añadir nueva raza</Link>

 <h1>Busca y conoce a tu mejor amigo</h1>
 <button  className="btn" onClick={e=>{handleClick(e)}}>
    volver a cargar todas las razas de perros
 </button>

 <Link className="link"  to="/Admin">Admin</Link>
 
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
    <select  className="selec" onChange={e=>handleFilterMaMe(e)}>
        <option value= "All">Todos</option>
        <option value= "mayor">vida mayor 15</option>
        <option value= "menor">vida menor  15</option>
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
    currentPage={currentPage}
    paginado={paginado}
    />
    </div>
    <SearchBar setCurrentPage={setCurrentPage}/>

    <div className="cards">
          {charge ? (
            <div>
              <img className="loading" src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />
            </div>
          ) : currentDogs.length ? (
          currentDogs.map((dog) => (
            <Card
              key={dog.id}
              id={dog.id}
              name={dog.name}
              image={dog.image}
              temperament={dog.temperament}
              weightMin={dog.weightMin}
              weightMax={dog.weightMax}
            />
          ))
        ) : (
          <div className="noDogs">
            <h1>No se han encontrado perros</h1>
            <img src={notRaza} alt="not_raza" />
          </div>
        )}
      </div>
 </div>
 <Footer/>
    </div>
)

}