import React, { Component } from 'react'
import axios from 'axios'

class AddBrand extends Component {
    constructor(props) {
        super(props)
    
        this.onChangeName = this.onChangeName.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
        this.state = {
            name: ""
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()

        const brand = {
            name: this.state.name
        }
      
        // console.log(brand);

        axios.post('http://localhost:5000/brands/add', brand)
            .then(res => console.log(res.data))

        this.setState({
            name: ""
        })

        window.location = '/'
    }
  
    render() {
        return (
            <div>
                 <h3>Add New Brand</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                          type="text"
                          required
                          className="form-control"
                          value={this.state.name}
                          onChange={this.onChangeName}
                        />
                    </div>
                    <div className="form-group">
                        <input
                          type="submit"
                          value="Add Brand"
                          className="btn btn-primary"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default AddBrand