import React, { Component } from 'react'

class Legend extends Component{

    render(){
        return(
            <div className="legendInfo">
                {this.props.language}
            </div>
        )
    }
}

export default Legend