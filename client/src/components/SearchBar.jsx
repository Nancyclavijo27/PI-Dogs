import{ React,  useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { getDogs, getDogsForName } from "../actions";
import "./SearchBar.css";

export default function Search({setCurrentPage}) {
    
    const dispatch = useDispatch();
    const [name, setName] = useState("");
  
    useEffect(() => {
      dispatch(getDogs());
    }, [dispatch]);
  
    function handleInputChange(e) {
      dispatch(getDogsForName(e));
      setCurrentPage(1);
      
    }
  
  console.log(getDogsForName)
    return (
      <div>
        <div className="group">
          <input
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange(e.target.value);
            }}
            type="text"
            placeholder="Search"
            className="input"
            value={name}
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
      </div>
    );
  }