// import logo from './logo.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from "./components/Navbar"
import DrugList from "./components/DrugList"
import EditDrug from "./components/EditDrug"
import AddDrug from "./components/AddDrug"
import AddBrand from "./components/AddBrand"
import DrugChart from './components/DrugChart'

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/chart" component={ DrugChart } />
        <Route path="/" exact component={ DrugList } />
        <Route path="/edit/:id" component={ EditDrug } />
        <Route path="/add" component={ AddDrug } />
        <Route path="/addBrand" component={ AddBrand } />
      </div>
    </Router>
  );
}

export default App
