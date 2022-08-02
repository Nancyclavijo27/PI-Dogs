//luego de despachas las acciones hacemos la logica en este index de reducer
const initialState = {        //estado inicial es un objeto
     dogs : [],  // razas de perros 
     allDogs: [], //copia del estado que siempre tenga todos los perros
     temperaments:[],//temperamentos
     detail:[]//detail
}

function rootReducer(state= initialState, action){
     
    switch(action.type) {
       case  "GET_DOGS": //la logica siempre es antes del return o si no se rompe
           return{
                ...state,//guarda el estado
                dogs:action.payload,//guarda en mi arreglo vacio inicialmente todo lo que te envia la accion dogs 
                allDogs:action.payload,
                 
            }
            case "GET_NAME_DOGS":
                return {
                    ...state,
                    dogs: action.payload
                }
            case "GET_TEMPERAMENTS":
                return {
                    ...state,
                    temperaments: action.payload

                }
            case "POST_DOG"://no hace nada pero debe estar en el reducer
                return{
                    ...state,
                }

                case "ORDER_BY_NAME":
                    let sortedArr;
                    
                    if(action.payload === "asc"){ 
                        sortedArr= 
                    state.allDogs.sort(function(a, b){//sort compara dos valores y segun el caso lo coloca antes o despues
                        if(a.name.charAt(0)<b.name.charAt(0)){
                            return -1
                        }
                        if(a.name.charAt(0)>b.name.charAt(0)){
                            return 1;
                        }
                        return 0;//si son iguales los deja igual
                    })} else if( action.payload === "desc"){
                        sortedArr=            //si no ordenalo descentente 
                    state.allDogs.sort(function(a, b){
                        if(a.name.charAt(0)>b.name.charAt(0)){
                            return -1;
                        }
                        if(a.name.charAt(0)<b.name.charAt(0)){
                            return 1
                        }
                        return 0;
                    })}else{
                        sortedArr= state.allDogs
                    }
                    console.log(sortedArr)
                    return {
                        ...state,
                        dogs:sortedArr// se pasa la constante con la logica
                    }

                    case "ORDER_BY_WEIGHT":
                        let ordArr;
                        if(action.payload === "min"){
                            ordArr=
                            state.allDogs.sort(function(a, b){
                        
                                if(a.weightMin < b.weightMin) return -1; 
                                if(a.weightMin > b.weightMin) return 1; 
                                return 0;
                            })
                        } else if(action.payload === "max"){
                            ordArr=
                            state.allDogs.sort(function(a, b){
                                if(a.weightMin > b.weightMin) return -1; 
                                if(a.weightMin < b.weightMin) return 1; 
                                return 0;
                            })
                        }
            
                        return{
                            ...state,
                            dogsFilter: ordArr
                        }

                     case "FILTER_TEMPERAMENT":
                        const allDogs = state.allDogs;
                        const temperamentsFilter = action.payload === "all" ?
                        allDogs : allDogs.filter(el => {
                        return el.temperament?.split(", ").includes(action.payload)
                      })
                        //console.log(temperamentsFilter)
                              return {
                              ...state,
                              dogs: temperamentsFilter
                       }


                     case "FILTER_CREATED":
                                const allDogs2 = state.allDogs
                                const createdFilter =action.payload === "created" ? allDogs2.filter(el=> el.createdInDb):allDogs2.filter(el=>!el.createdInDb)
                                return {
                                    ...state,
                                    dogs: action.payload === "All" ? state.allDogs : createdFilter
                
                                }

                     case "GET_DETAIL":
                                return {
                                    ...state,
                                    detail:action.payload
                                }

                                case "GET_CLEAN":
                                    return {
                                        ...state,
                                        detail: action.payload
                                };


            default:
                return state;    
    }
}
export default rootReducer