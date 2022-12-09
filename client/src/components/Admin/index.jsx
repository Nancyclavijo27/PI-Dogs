import React, { useEffect } from "react";
import { getDogs } from "../../actions";
import { useDispatch, useSelector } from "react-redux";


function AdminDashBoard() {
  
  
  const allDogs = useSelector((state) => state.dogs);
  
  let dispatch = useDispatch();
  useEffect(() => {
       dispatch(getDogs());
       
  }, [dispatch]);

  
  const contenido2 = {
    title: "Dogs",
    counter: allDogs.length,
    Linkeado: "/admin/dogs",
    link: "See all Dogs",
    
  };

  
  return (
    <main >
      <div className="widgets">
       
        
        
      </div>
      <div className="charts">
      
       
      </div>
    </main>
  );
}

export default AdminDashBoard;