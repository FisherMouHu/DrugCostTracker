import React, { Component } from 'react'
import axios from 'axios'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

class DrugChart extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            drugs: [],
            options: {}
        };
    };

    componentDidMount() {
        axios.get('http://localhost:5000/drugs/')
            .then(res => {
                this.setState({
                    drugs: res.data
                })

                let drugDetails = []

                for (let drug of this.state.drugs) {
                    drugDetails.push({
                        name: drug.brandName + "'s " + drug.name,
                        y: drug.price
                    })
                }

                this.setState({
                    options: {
                        chart: {
                            type: "column"
                        },
                        title: {
                            text: "Drug Cost Tracker"
                        },
                        subtitle: {
                            text: "Different Brands / Drugs"
                        },
                        yAxis: {
                            title: {
                                text: "Price (/g)"
                            }
                        },
                        xAxis: {
                            type: "category"
                        },
                        legend: {
                            enabled: false
                        },
                        series: [{
                            name: "Price",
                            data: drugDetails
                        }]
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render() {
        return (
            <div>
                <HighchartsReact highcharts={ Highcharts } options={ this.state.options } />
            </div>
        );
    }
}

export default DrugChart;
