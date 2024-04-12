
import './App.css';
import Footer from './Footer';
import NavBar from './NavBar';
import News from './News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App(props) {
  
  return (
    
    <Router>
    <NavBar/>
   
    <Routes>
    <Route exact path='/' element={<News key="general" pageSize={15} country='us' category='general'/>}></Route>
    <Route exact path='/business' element={<News key="business" pageSize={15} country='us' category='business'/>}></Route>
    <Route exact path='/entertainment' element={<News key="entertainment" pageSize={15} country='us' category='entertainment'/>}></Route>
    <Route exact path='/health' element={<News key="health" pageSize={15} country='us' category='health'/>}></Route>
    <Route exact path='/general' element={<News key="general" pageSize={15} country='us' category='general'/>}></Route>
    <Route exact path='/science' element={<News key="science" pageSize={15} country='us' category='science'/>}></Route>
    <Route exact path='/sports' element={<News key="sports" pageSize={15} country='us' category='sports'/>}></Route>
    <Route exact path='/technology' element={<News key="technology" pageSize={15} country='us' category='technology'/>}></Route>

    </Routes>
    <Footer style={{zIndex:"1"}}/>
    </Router>
    
  );
}

export default App;
