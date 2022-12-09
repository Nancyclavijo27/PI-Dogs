import {Link} from "react-router-dom"
import * as faIcons from "react-icons/fa"
import  './Sidebar.scss';
const SideBar =()=>{
    return (
        <div className="sidebar">
          <ul>
            <li> <Link to="/Homes" className="text-dark" > <faIcons.FaHome className="me-2" /> Inicio</Link> </li>
          </ul>
          <ul>
            <li> <Link to="/Sales" className="text-dark"> <faIcons.FaRegChartBar className="me-2" />Ventas</Link>  </li>
          </ul>
          <ul>
            <li> <Link to="/Clientes"className="text-dark" > <faIcons.FaUserFriends className="me-2" />Clientes</Link>  </li>
          </ul>
        </div>
    )
}

export default SideBar