import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../home/home';
import About from '../Documentation/about';
import Dashboard from '../dashboard/dashboard';
import SubVaultsContainer from '../dashboard/subvaults';
import VaultDetails from '../dashboard/vaultdetails';
import Rewards from '../rewards/rewards';
import Health from '../financialhealth/health';

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
                path="/myvaults"
                element={ <SubVaultsContainer /> }
            /> 
            <Route
                path="/vault/"
                element={ <VaultDetails /> }
            /> 
            <Route
                path="/rewards"
                element={ <Rewards /> }
            /> 
            <Route
                path="/financialHealth"
                element={ <Health /> }
            />
        </Routes>
    </Router>
  )
}
