import React, { Component } from 'react'
import language from '../data_json/language.json'

class NewInputSearch extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div className="placeInput">
                <input id="cityInput" onChange={this.props.fnChange} type="text" placeholder={this.props.language == 'eng' ? language.eng.input[0] : language.pl.input[0]}></input> 
            </div>
        )
    }
}

export default NewInputSearch