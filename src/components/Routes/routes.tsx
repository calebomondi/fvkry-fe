import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../home/home';
import About from '../Documentation/about';

export default function MyRoutes() {
  return (
    <Router>
        <Routes>
            <Route
                path="/"
                element={ <Home /> }
            /> 
            <Route
                path="/documentation"
                element={ <About /> }
            />      
        </Routes>
    </Router>
  )
}
