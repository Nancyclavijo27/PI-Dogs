import axios from "axios";

//sirve para todo lo que es llamada asincrona 
// no se va a manejar logica solo despachamos acciones

export function getDogs(){//funcion para traer todas las razas de perros
    return async function(dispatch){
        var json= await axios.get("http://localhost:3001/dogs")//esta es la coneccion entre el front y el back
        return dispatch({//primer ruta
        type: "GET_DOGS",
        payload: json.data
    })
    }
}


export const getDogsForName = (name) => {
    //obtener todos los perros que coincidan con el nombre que pasamos por parametro
    try {
        return {
            type: "GET_DOGS_FOR_NAME",
            payload: name
        }
    } catch (error) {
        alert("Error al obtener la descripcion")
        
    }
}

export function getTemperaments(){//funcion para crear raza de perro
    return async function(dispatch){
        var info= await axios.get ("http://localhost:3001/temperament",{

        })
        return dispatch({type: "GET_TEMPERAMENTS", payload: info.data});
    }
}

export function postDog(payload){//funcion  post DB
    return async function(dispatch){
        const response=await axios.post("http://localhost:3001/dogs", payload)
        console.log(response)
        return response
    }
}

export function filterCreated(payload){//funcion del filtro existencia o inv de perros
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function filterMayorMenor(payload){//funcion del filtro mayor de 50
    return {
        type: "FILTER_MAYOR_MENOR",
        payload
    }
}

export function filterTemperament(payload){//funcion de de filtro de temperamentos
    return {
        type: "FILTER_TEMPERAMENT",
        payload
    }
}

export function ordenByWeight(payload) {//funcion filtro peso
    return {
      type: "ORDER_BY_WEIGHT",
      payload
    };
  }

export function ordenByName(payload){//funcion de ordenamiento A-Z
    return {
        type: "ORDER_BY_NAME",
        payload:payload
    }
}

export function getDetail(id){//funcion detallee
    return async function (dispatch) {
        try {
            var json = await axios.get(`http://localhost:3001/dogs/` + id);
            return dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function getClean () {
    return{
        type: "GET_CLEAN",
        payload: []
    }
}






