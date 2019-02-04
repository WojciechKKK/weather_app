import React, { Component } from 'react'

class Header extends Component{
    render(){
        return(
            <div className="placeTitle">
                <p>
                    <span className="spanBorder">
                        { this.props.text }
                    </span>
                </p>
            </div>
        )
    }
}

export default Header