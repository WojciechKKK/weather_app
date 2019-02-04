import React, { Component } from 'react'
import SlideDown from 'react-slidedown';
import errorImg from '../image/error.png';

class ErrorCity extends Component{
    render(){
        const { language, errors } = this.props;
        const textError = errors == 'city' ? language.errors[1] : language.errors[0]
        return(
            <div className="errorCity">
                <SlideDown>
                    <div>
                        <img alt="error" src={errorImg}></img><br />
                        <p>{textError}</p>
                    </div>
                </SlideDown>
            </div>
        )
    }
}

export default ErrorCity