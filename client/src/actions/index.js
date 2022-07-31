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

export function getNameDogs(name){//funcion para la barra de busqueda
    return async function(dispatch){
        try{
            var json =await axios.get("http://localhost:3001/dogs?name="+name);
            return dispatch({
                type:"GET_NAME_DOGS",
                payload: json.data//retorna lo que tenga la ruta de name
            })
        }catch(error){
            console.log(error)//si no se cumple envia un error
        }
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





