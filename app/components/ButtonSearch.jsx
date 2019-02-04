import React, { Component } from 'react'

class ButtonSearch extends Component{
    constructor(){
        super();
    }
    runButton = () => {
        if(typeof this.props.fnDownload == 'function'){
            this.props.fnDownload();
        }
    }
    render(){
        return(
            <div className="placeBtn">
                    <button onClick={this.runButton}>
                        {this.props.show ? this.props.language[1] : this.props.language[0]}
                    </button>
            </div>
        )
    }
}

export default ButtonSearch