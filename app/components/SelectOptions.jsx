import React, { Component } from 'react'
import cities from '../data_json/cities.json'


class SelectOption extends Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="placeSelect">
                <select style={{textAlign: 'center'}} className="placeSelectAndOption" onChange={this.props.fnSelect} value={this.props.selectVal}>
                    <option value="" disabled></option>
                    <option value="other city">other city</option>
                        {
                            cities.map(el => <option key={el} value={el}>{el}</option>)
                        }
                </select>
            </div>
        )
    }
}

export default SelectOption