import React, { Component } from 'react'
import axios from 'axios'

class EditDrug extends Component {
    constructor(props) {
        super()

        this.onChangeBrandName = this.onChangeBrandName.bind(this)
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeSymptoms = this.onChangeSymptoms.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            brandName: '',
            name: '',
            symptoms: '',
            price: 0,
            brands: []
        }
    }

    // Called right before Anything is displayed on the Page
    componentDidMount(){
        axios.get("http://localhost:5000/drugs/" + this.props.match.params.id)
            .then(response => {
                this.setState({
                    brandName: response.data.brandName,
                    name: response.data.name,
                    symptoms: response.data.symptoms,
                    price: response.data.price
                })
            })
            .catch(function(error){
                console.log(error)
            })

        axios.get("http://localhost:5000/brands/")
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        brands: response.data.map(brand => brand.name)
                    })
                }
            })
    }

    onChangeBrandName(e){
        this.setState({
            brandName: e.target.value
        })
    }

    onChangeName(e){
        this.setState({
            name: e.target.value
        })
    }
    
    onChangeSymptoms(e) {
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
        
        // console.log(drug)

        axios.post('http://localhost:5000/drugs/update/' + this.props.match.params.id, drug)
            .then(res => console.log(res.data))

        window.location = '/'
    }
    
    render() {
        return (
            <div>
                <h3>Edit Drug Info</h3>
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
                                    </option>
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
                        <input type="submit" value="Edit Drug Info" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default EditDrug