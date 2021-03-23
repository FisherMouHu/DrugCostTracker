import React, { Component } from 'react'
import axios from 'axios'

class AddDrug extends Component {
    constructor(props) {
        super(props)

        this.onChangeBrandName = this.onChangeBrandName.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeSymptoms = this.onChangeSymptoms.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      
        this.state = {
            brandName: "",
            name: "",
            symptoms: "",
            price: 0,
            brands: []
        }
    }

    // Lifecycle Hook
    componentDidMount() {
        axios.get('http://localhost:5000/brands/')
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        brands: res.data.map(brand => brand.name),
                        brandName: res.data[0].name
                    })
                }
            })
    }

    onChangeBrandName(e) {
        this.setState({
            brandName: e.target.value
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }

    onChangeSymptoms(e){
        this.setState({
            symptoms: e.target.value
        })
    }
  
    onChangePrice(e) {
        this.setState({
            price: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const drug = {
            brandName: this.state.brandName,
            name: this.state.name,
            symptoms: this.state.symptoms,
            price: this.state.price
        }
      
        // console.log(drug);

        axios.post('http://localhost:5000/drugs/add', drug)
            .then(res => console.log(res.data))
        
        window.location = '/'
    }
  
  
    render() {
        return (
            <div>
                <h3>Add New Drug</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Brand Name: </label>
                        <select required
                            className="form-control"
                            value={this.state.brandName}
                            onChange={this.onChangeBrandName}>
                            {
                                this.state.brands.map(function(brand) {
                                return <option 
                                    key={brand}
                                    value={brand}>
                                        {brand}
                                    </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                    </div>
                    <div className="form-group"> 
                        <label>Symptoms: </label>
                        <input  type="text"
                            required
                            className="form-control"
                            value={this.state.symptoms}
                            onChange={this.onChangeSymptoms}
                            />
                    </div>
                    <div className="form-group">
                        <label>Price (/g): </label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={this.state.price}
                            onChange={this.onChangePrice}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Drug" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}

export default AddDrug