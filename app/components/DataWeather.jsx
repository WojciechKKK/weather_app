import React, { Component } from 'react'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import ErrorCity  from './ErrorCity.jsx'


class DataWeather extends Component{
    constructor(){
        super();
        this.state = {
            city: 'Wait',
            temp: 0,
            country: 'error',
            wind: 0,                      
            pressure: 0,                
            clouds: 0,
            humidity: 0,                         
            weather: 0,
            imgWeather: 0,
            showError: false,   // for show Component ErrorCity,
            errorsInfo: '',          // info with error
            countryFlag: ''
        }
    }
    
    //fetch 
    componentDidMount = () => {
        const { cityVal, newCityVal, countryVal  } = this. props;
        let city = cityVal == 'other city' ? newCityVal : cityVal;
        this.askWeatherFetch(city, countryVal);

        // let cityInput = document.getElementById('cityInput');
        // console.log(cityInput)
        // cityInput.style.border = '1px solid black'
    }      
    
 // get weather for city
    askWeatherFetch = (city,countryCode) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=a4b85511d03c8187201a512404cbd72a&units=metric`)
            .then(data => data.json())
            .then(info => this.setInfoWeather(info))
            .catch(err => this.showError(err))
    }
  
    //validation only for input with new city
    setInfoWeather = (info) => {
        if(info.cod == '404'){
            console.log('404 Not Found - wrong city name');
            alert(this.props.language.error[1])
            this.setState({
                city: 'Wrong city',
                country: 'error',
                showError: !this.state.showError,
                errorsInfo: 'city'
            })
        } else{
        this.setState({
            city: info.name,
            temp: Math.round(info.main.temp),
            country: info.sys.country,
            wind: info.wind.speed,                      
            pressure: info.main.pressure,                
            clouds: info.clouds.all,
            humidity: info.main.humidity,                         
            weather: info.weather,
            imgWeather: info.weather[0].icon  
            })
        };
        this.setFlagCountry(); 
    }

     //set flag for country
     setFlagCountry = () => {
        const { countryVal } = this.props;
        let finalFlag;
        if(countryVal == 'pl'){
            finalFlag = '../image/poland.png';
        } else if (countryVal == 'gb'){
            finalFlag = '../image/great-britain.png';
        }else if(countryVal == 'it'){
            finalFlag = '../image/italy.png';
        } else if(countryVal == 'us'){
            finalFlag = '../image/usa.png';
        } else if(countryVal == 'de'){
            finalFlag = '../image/germany.png';
        } else {
            finalFlag = 'error'
        }
        this.setState({
            countryFlag: finalFlag
        })
    }

    //for error fetch
    showError = (err) => {
        if(err == 'TypeError: Failed to fetch'){
            alert(this.props.language.errors[0]);
            this.setState({
                city: 'Not internet connection',
                country: 'error',
                showError: !this.state.showError,
                errorsInfo: 'internet'
            })
        } else  {
            alert(this.props.language.errors[1])
            this.setState({
                city: 'Wrong city',
                country: 'error',
                showError: !this.state.showError,
                errorsInfo: 'city'
            })
        }
    }

    render(){
        const { city, country, temp, wind, pressure, clouds, humidity, imgWeather, weather, showError, errorsInfo, countryFlag } = this.state;
        const { language } = this.props;
        return(
            <div>
                {
                city == 'Wait'
                ? null
                :  <div>
                    {
                        showError
                        ? <ErrorCity language={language} errors={errorsInfo} />
                        : <SlideDown>
                        <div className="weatherInfomation">
                                <div className="cityAndCountry">
                                    <div className="city">{city}
                                        <a className="country">{country}
                                            <img alt="flag" className="flag" src={countryFlag}></img>
                                        </a> 
                                        <div className="imgWeatherAndConditions">
                                            <div className="imgWeather">
                                                <img alt="weather" src={`https://api.openweathermap.org/img/w/${imgWeather}.png`}></img>
                                            </div>
                                            {/* <div className="descInfo">
                                                {weather.map(el => <div className="description" key={el.id}>{el.description}</div>)}
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="temp">
                                        {Math.round(temp)}&deg;
                                    </div>
                                </div>
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>{language.location[0]}<br /><a className="conditions">{wind} m/s</a></td>
                                            <td>{language.location[1]}<br /><a className="conditions">{clouds} %</a></td>
                                        </tr>
                                        <tr>
                                            <td>{language.location[2]}<br /><a className="conditions">{pressure} hpa</a></td>
                                            <td>{language.location[3]}<br /><a className="conditions">{humidity} %</a></td>
                                        </tr>
                                    </tbody>
                                    <tfoot></tfoot>
                                </table>
                            </div>
                        </SlideDown>
                    }
                    </div>
                }
                </div>
        )
    }
}

export default DataWeather