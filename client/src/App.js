import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom" //para cetiar las rutas
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import DogCreation from "./components/DogCreation"
import Detail from "./components/Detail"
import Admin from "./components/Admin/index"
import NavbarNav from './components/Admin/NavbarNav';
import SideBar from './components/Admin/Sidebar';
import Homes from './pages/Homes';
import Sales from './pages/Sales';
import Clientes from './pages/Clientes';



//ruta para renderizar la Landing,  el home, DogCreation y Detail

 function App() {
  return (
    // rodea el div
    
    <div className="App">
      <BrowserRouter>
      <Switch>
         <Route  path="/home/:id" component={Detail}/>
         <Route  exact path = "/home" component= {Home}/>
         <Route  path="/dog" component={DogCreation}/>
         <Route exact path = "/" component= {LandingPage}/>
         <Route>
         <Route exact path = "/Admin" component={Admin}/>
         <div className='flex'>
         <SideBar />
         <div className='conten w-100'>
         <NavbarNav />
         <Route exact path = "/Homes" component= {Homes}/>
         <Route exact path = "/Sales" component= {Sales}/>
         <Route exact path = "/Clientes" component= {Clientes}/>
         </div>
         </div>
         </Route>
      </Switch>
      </BrowserRouter>
    
    </div>
   
  );
}

export default App;
