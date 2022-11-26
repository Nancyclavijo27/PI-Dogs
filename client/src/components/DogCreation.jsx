import React, {useState, useEffect} from "react";
import {Link,  useHistory}from "react-router-dom";
import {postDog, getTemperaments, getDogs} from "../actions/index";
import {useDispatch, useSelector} from "react-redux"
import "./DogCreation.css";



function validate(input){
    let errors = {};//objeto errores
    if (!input.name) {
        errors.name = "Ingrese el nombre";
      } else if (input.name.search(/^[a-zA-Z\s]*$/)) {
        errors.name = "No se permiten números ni símbolos en el nombre";
      }
      if (!input.heightMin) {
        errors.heightMin = "Altura minima";
      } else if (parseInt(input.heightMin) > parseInt(input.heightMax)) {
        errors.heightMin =
          "Altura maxima";
      } else if (input.heightMin < 0) {
        errors.heightMin = "No se permiten números negativos";
      }
      if (!input.heightMax) {
        errors.heightMax = "Altura maxima";
      } else if (parseInt(input.heightMax) < parseInt(input.heightMin)) {
        errors.heightMax =
          "La altura maxima no puede ser menor que la alturaminima";
      }
      if (!input.weightMin) {
        errors.weightMin = "Peso minimo";
      } else if (parseInt(input.weightMin) > parseInt(input.weightMax)) {
        errors.weightMin =
          "El peso mínimo no puede ser mayor que el peso máximo";
           } else if (input.weightMin < 0) {
        errors.weightMin = "No se permiten números negativos";
      }
      if (!input.weightMax) {
        errors.weightMax = "peso maximo";
      } else if (parseInt(input.weightMax) < parseInt(input.weightMin)) {
        errors.weightMax =
          "La altura máxima no puede ser inferior a la altura mínima";
      }
      if (!input.life_spanMin) {
        errors.life_spanMin = "años minimos";
      } else if (parseInt(input.life_spanMin) > parseInt(input.life_spanMax)) {
        errors.minlife_span =
          "Los años mínimos no pueden ser mayores que los años máximos";
      } else if (input.life_spanMin < 0) {
          errors.life_spanMin = "No se permiten números negativos";
      }
      if (!input.life_spanMax) {
        errors.life_spanMax = "años maximos";
      } else if (parseInt(input.life_spanMax) < parseInt(input.life_spanMin)) {
        errors.life_spanMax =
          "Los años máximos no pueden ser menores que los años mínimos";
      }
      if (input.img && !/[a-z0-9-.]+\.[a-z]{2,4}\/?([^\s<>#%",{}\\|^[\]`]+)?$/.test(input.img) ){
        errors.img = "Debe ser una URL o estar vacía'";
     }
    return errors
}

export default  function DogCreate(){
    const dispatch= useDispatch()
    const history=useHistory()//metodo del router que me direcciona a donde yo quiera
    const temperaments =useSelector((state)=>state.temperaments)
    const [errors, setErrors]=useState({})
    

    const [input,setInput]=useState({
        name: "",
        heightMin:"",
        heightMax:"",
        weightMin:"",
        weightMax:"",
        life_spanMin:"",
        life_spanMax:"",
        temperament:[],
          
    })

    //logica
    function handleChange(e){//guarda lo que se escriba en el imput en mi estado imput
        setInput({//setiar el estado
            ...input,//traer todo lo que se tiene y el target.value de lo que esta modificando
            [e.target.name]:e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }));
        console.log(input)
    }

    function handleSelect(e){//logica del select
      const { value } = e.target;
    if (input.temperament.includes(value))
      return alert("Ya has seleccionado ese temperamento")
      if (input.temperament.length === 3) {
        alert("Solo se puede ingresar tres temperamentos!");
      } else if (input.temperament.length < 3) {
        setInput({
          ...input,
          temperament: [...input.temperament, e.target.value],
        });
      }
    }
        

    function handlSubmit(e){
       
        if(!input.name || !input.heightMin || !input.heightMax || !input.weightMax || !input.weightMin || !input.life_spanMax || !input.life_spanMax || !input.temperament){
            return alert('Complete los campos vacios.')
          }
        
        dispatch(postDog(input))
        alert("Raza creada!!")
        setInput({
            name: "",
            heightMin:"",
            heightMax:"",
            weightMin:"",
            weightMax:"",
            life_spanMin:"",
            life_spanMax:"",
            image:"",
            temperament:[],
            

        })
        history.push("/home")//retorna al home despues de  crear perro
    }

    function handleDelete(el){
        setInput({
            ...input,
            temperament: input.temperament.filter(tem=>tem !==el)
        })
    }

    useEffect(()=>{//despacha la ocupacion
        dispatch((getTemperaments()))
        dispatch(getDogs())
    }, [dispatch]);

    //renderizar
    return (
        <div className="container" >
          <div className="button_back">
          <Link to={`/home`}>
              <button>
                <span className="icon">
                  ⬅️
                </span>
                <span className="label">Volver</span>
              </button>
          </Link>
      </div>
      <div className="info">
        <h1 className="title">Crea tu raza de perro</h1>
        
        <div className ="card">
            <div className="card_container">
                <div className="name">
                    {
                        input.name.length > 0 ?
                        <h1>{input.name}</h1>
                        : <h1>Name</h1>
                    }
                </div>
                <img
                        src={
                          input.image
                            ? input.image
                            : "https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette.png"
                        }
                        alt="dog profile"
                        className="image"
                      />
                <div className="container__info">
                    <p>Peso: Min: {input.weightMin.length > 0 ? input.weightMin : "0"} Kg - Max: {input.weightMax.length > 0 ? input.weightMax : "0"} Kg</p>
                </div> 
                <div className="temperament">
                  {input.temperament.map((temperaments) => (
                    <p key={temperaments}>{temperaments}</p>
                  ))}
                </div>   
            </div>
        </div>
        <div className="tempsContainer">
          {input.temperament.map((temp) => (
            <div className="tempsSelected" key={temp}>
              <button name={temp} onClick={handleDelete}>
                X
              </button>
              <p>{temp}</p>
            </div>
          ))}
        </div>
      </div>
            <form className="formBox" onSubmit={(e)=>handlSubmit(e)}>
            <p className="info">* : Requerido</p>
                    <label className="info">*Nombre:</label>
                    <input 
                    id="nameInput" 
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={(e)=>handleChange(e)}
                    required
                    placeholder="Ingresa nombre"
                     />
                     {errors.name && (
                        <p className="error">{errors.name}</p>
                     )}
                     <label key="heightInput">*Altura:</label>
                <div>
                    <input  
                    id="heightInput"
                    type="text"
                    value={input.heightMin}
                    name="heightMin"
                    required
                    placeholder="Min"
                    onChange={(e)=>handleChange(e)}
                     />
                    <input 
                    id="heightInput"
                    type="text"
                    value={input.heightMax}
                    name="heightMax"
                    required
                    placeholder="Max"
                    onChange={(e)=>handleChange(e)}
                     />
                     </div>
                     {errors.heightMin && (
                        <p className="error">{errors.heightMin}</p>
                     )}
                      {errors.heightMax && (
                        <p className="error">{errors.heightMax}</p>
                     )}
                    <label className="info">*Peso:</label>
                 <div>
                    <input  
                    id="weightInput"
                    type="text"
                    value={input.weightMin}
                    name="weightMin"
                    required
                    placeholder="Min"
                    onChange={(e)=>handleChange(e)}
                     />
                    <input 
                    id="weightInput" 
                    type="text"
                    value={input.weightMax}
                    name="weightMax"
                    required
                    placeholder="Max"
                    onChange={(e)=>handleChange(e)}
                     />
                     </div>
                      {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                     )}
                      {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                     )}
                    <label className="info">*Años de vida:</label>
                    <div>
                    <input 
                    id="lifeInput"
                    type="text"
                    value={input.life_spanMin}
                    name="life_spanMin"
                    required
                    placeholder="Min"
                    onChange={(e)=>handleChange(e)}
                     />
                    <input id="lifeInput" 
                    type="text"
                    value={input.life_spanMax}
                    name="life_spanMax"
                    required
                    placeholder="Max"
                    onChange={(e)=>handleChange(e)}
                     />
                     </div>
                     {errors.life_spanMin && (
                        <p className="error">{errors.life_spanMin}</p>
                     )}
                      {errors.life_spanMax && (
                        <p className="error">{errors.life_spanMax}</p>
                     )}
                    <label key="imageInput">Imagen:</label>
                    <input 
                    id="imageInput" 
                    type="text"
                    value={input.image}
                    name="image"
                    placeholder="URL"
                    onChange={(e)=>handleChange(e)}
                     />
                      {errors.img && (
                        <p className="error">{errors.img}</p>
                     )}
                <label key="tempsInput">*Temperament:</label>
                <select className="select"   onChange={(e)=>handleSelect(e)}>
                    {temperaments.map((temperament)=>(
                        <option value={temperament.name} key ={temperament.id} >{temperament.name}</option>
                        
                    ))}
                </select>
                <ul><il key={"key"}  >{input.temperament.map(el=>
                <button type="button" key={el.id} onClick={() => handleDelete(el)}> {el} </button>
                 ) }              
                </il></ul>

                <button  type="submit" disabled={Object.keys(errors).length} className="btn_disabled">
          Crear raza de perro
        </button>     
            </form>   
        </div>
    )
 }