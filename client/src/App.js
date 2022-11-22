import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom" //para cetiar las rutas
import LandingPage from "./components/LandingPage"
import Home from "./components/Home"
import DogCreation from "./components/DogCreation"
import Detail from "./components/Detail"
import Navbar from './components/Admin/Navbar';
import Sidebar from './components/Admin/Sidebar';


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
         <Navbar/>
      <div className='flex' >
      <Sidebar/>
      <div  className='content'>

      </div>
      </div>
         
      </Switch>
      </BrowserRouter>
    
    </div>
   
  );
}

export default App;
