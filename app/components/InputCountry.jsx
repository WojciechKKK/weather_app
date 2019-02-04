import React, { Component } from 'react'
import countries from '../data_json/countries.json'

class InputCountry extends Component{
    render(){
        const { language } = this.props;
        return(
            <div className="placeCountry">
                <select style={{textAlign: 'center'}} onChange={this.props.fnSelect} value={this.props.countryVal}>
                    {countries.map(el => {
                        return <option key={el.name} value={el.code}>{language =='pl' ? el.name : el.name2}</option>
                    })}
                </select>
            </div>
        )
    }
}

export default InputCountry