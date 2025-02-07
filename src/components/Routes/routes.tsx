import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../home/home';
import About from '../Documentation/about';
import Dashboard from '../dashboard/dashboard';
import SubVaultsContainer from '../dashboard/subvaults';

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
            <Route
                path="/dashboard"
                element={ <Dashboard /> }
            />     
            <Route
                path="/dashboard/:id"
                element={ <SubVaultsContainer /> }
            /> 
        </Routes>
    </Router>
  )
}
