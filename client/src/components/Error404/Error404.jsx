import React from 'react'
import { Link } from "react-router-dom";
import "../Detail.css";


function Error404() {


    return (
      <div className="card">
        <div className="card_container">
          <div className="button_back">
              <Link to={`/home`}>
                  <button>
                    <span className="icon">
                      ⬅️
                    </span>
                    <span className="label">Back</span>
                  </button>
              </Link>
          </div>

          <div className="name">
            <h1>Dog not found</h1>
          </div>
          <div>
            <img src="https://st3.depositphotos.com/9494100/15431/i/600/depositphotos_154313516-stock-photo-pug-dog-with-yellow-constructor.jpg" alt="404" className="image" />
          </div>
          <div className="container__info">
            <p>Try looking for another dog or navigate with the next and prev buttons to another dog</p>
          </div>
        </div>
      </div>
    )
}

export default Error404