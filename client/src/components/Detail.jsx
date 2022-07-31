/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {Link,  useParams  } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../actions/index";
import { useEffect } from "react";

export  default  function Detail(){
    const { id } = useParams();
    const myDog = useSelector((state) => state.detail);
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(getDetail(id));
      
    }, [dispatch, id]);

    return (   
    
      <div> 
        <div>
        <Link to="/home"><button>Volver</button></Link>
        </div>
      {myDog.length > 0 ?//pregunto tiene algo 
      <div>
          <h1>Es:{myDog[0].name}</h1>
          <img src={myDog[0].img? myDog[0].img: myDog[0].image}  alt="" width="500px"height="300px"/>
          
          <h4>heightMin:{myDog[0].heightMin}</h4>
          <h4>heightMax:{myDog[0].heightMax}</h4>
          <h3>weightMin:{myDog[0].weightMin}</h3>
           <h3>weightMax:{myDog[0].weightMax}</h3>
         <p>life_spanMin:{myDog[0].life_spanMin}</p>
         <p>life_spanMax:{myDog[0].life_spanMax}</p>
        <h4>Temperamentos:{myDog[0].temperament}</h4>
       </div>:<p>Loading...</p>
     
      }
      </div>
      )
      }

  