import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// Functional react component
const Drug = props => (
    <tr>
        <td>{props.drug.brandName}</td>
        <td>{props.drug.name}</td>
        <td>{props.drug.symptoms}</td>
        <td>{props.drug.price}</td>
        <td>
            <Link to={"/edit/" + props.drug._id}>Edit</Link> | <a href="#" onClick={() => { props.deleteDrug(props.drug._id) }}>Delete</a>
        </td>
    </tr>
)

class DrugList extends Component {
    constructor(props) {
        super(props)
      
        this.deleteDrug = this.deleteDrug.bind(this)

        this.state = {
            drugs: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/drugs/')
            .then(res => {
                this.setState({
                    drugs: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    deleteDrug(id) {
        axios.delete('http://localhost:5000/drugs/' + id)
            .then(response => { console.log(response.data) })
    
        // Filter the Deleted Exercise
        this.setState({
            drugs: this.state.drugs.filter(el => el._id !== id)
        })
    }

    drugList() {
        return this.state.drugs.map(currentDrug => {
            return <Drug drug={currentDrug} deleteDrug={this.deleteDrug} key={currentDrug._id}/>
        })
    }
    
    render() {
        return (
            <div>
                <h3>Drug List</h3>
                <hr />
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Brand Name</th>
                            <th>Name</th>
                            <th>Symptoms</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.drugList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default DrugList