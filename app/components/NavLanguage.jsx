import React, { Component } from 'react'

class NavLanguage extends Component{
    constructor(){
        super()
    }
    setLanguage= (e) => {
        if(typeof this.props.fnLanguage == 'function'){
            this.props.fnLanguage(e.currentTarget.innerText)
        }
    }
    render(){
        return(
            <div className="placeLanguage">
                <div onClick={this.setLanguage} className="eng" title="ENG">eng</div>
                <div onClick={this.setLanguage} className="pl" title="PL">pl</div>
            </div>
        )
    }
}
export default NavLanguage