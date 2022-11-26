import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory  } from "react-router-dom";
import PrevSvg from "./SVG/PrevSvg";
import NextSvg from "./SVG/NextSvg";
import Remove from "./SVG/Remove";
import Error404 from "./Error404/Error404";
import "./Detail.css";

// Modulos internos
import { getDetail, getClean, setLoading, deleteDog  } from "../actions/index";



function CardDogDetail() {
  const { detail, loading, error } = useSelector((state) => state);
  console.log(detail);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useHistory(); // useNavigate es un hook que me permite navegar entre paginas

  const handleDelete = () => {
    dispatch(deleteDog(id));
    alert("Perro eliminado con éxito");
    navigate("/home");
  };

  useEffect(() => {
    dispatch(getDetail(id));
    dispatch(setLoading());
    return () => {
      dispatch(getClean()); // limpia el state
    }
  }, [dispatch, id]);

  const { name, weightMin, weightMax, heightMin, heightMax, life_spanMax, life_spanMin, image, temperament, createdInBd } = detail;

  // encontrar si el id existe 
  // convierto de string a number
  const idNumber = parseInt(id);

  let idPrev = idNumber - 1;
  let idNext = idNumber + 1;
  // avanzar y retroceder
  if (idPrev < 1) {
    idPrev = 1;
  } else if (idNext > 264) {
    idNext = 1;
  } else {
    // eslint-disable-next-line no-self-assign
    idPrev = idPrev;
    // eslint-disable-next-line no-self-assign
    idNext = idNext;
  }

  return (
    <div className="container">
      <Link to={`/home/${idPrev}`}>
        <PrevSvg />
      </Link>
      <Link to={`/home/${idNext}`}>
        <NextSvg />
      </Link>
        {
          error ? (<Error404 />) : loading ? (
            <img src="https://i.giphy.com/media/ar8zpFnzWcSbAxjJmd/giphy.webp" alt="loading" />
          ) : ( // si hay datos en el state entra
            <div className="card">
              <div className="card_container">
              <div className="button_back">
                    <Link to={`/home`}>
                        <button>
                          <span className="icon">
                            ⬅️
                          </span>
                          <span className="label">Atras</span>
                        </button>
                    </Link>
                </div>
                {
                  createdInBd ? (
                    <div className="button_delete">
                        <button onClick={handleDelete}>
                          <Remove/>
                        </button>
                    </div>
                  ) : (
                    null
                  )
                }
                <div className="name">
                  <h1>{detail[0].name}</h1>
                </div>
                <div>
                  <img src={detail[0].image} alt={detail[0].name} className="image" />
                </div>
                <div className="container__info">
                  <p>Estos perros pueden pesar entre {detail[0].weightMin ? detail[0].weightMin :  "N/A "} y {detail[0].weightMax ? detail[0].weightMax : NaN} kg.</p>
                  <p>Y medir entre {detail[0].heightMin ? detail[0].heightMin : "N/A "} y {detail[0].heightMax ? detail[0].heightMax : "N/A "} cm</p>
                  <p>Su edad promedio es entre {detail[0].life_spanMin ? detail[0].life_spanMin : "N/A "} and {detail[0].life_spanMax ? detail[0].life_spanMax : "N/A "} años</p>
                  {
                    detail[0].temperament ? (
                      <p>Sus temperamentos son: {detail[0].temperament}</p>
                    ) : (
                      <p>Este perro no tiene temperamento para mostrar.</p>
                    )
                  }
                </div>
              </div>
            </div>
          )
        }
      
    </div>
  );
}

export default CardDogDetail
  