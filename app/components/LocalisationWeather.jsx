import React, { Component } from 'react'
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'

class LocalisationWeather extends Component{
    constructor(){
        super();
        this.state = {
            city: 'Test',
            country: 'Test',
            countryCode: 'pl',
            countryImg: '', // flag country
            temp: 0,        //temperature
            wind: 0,        //wind in m/s
            pressure: 0,    //pressure in hpa
            clouds: 0,     // clouds in %
            humidity: 0, //humidity in %
            weather: [{'id': '1', 'description': 'test1'},{'id': '2', 'description': 'test2'}],     // ARRAY weather condition
            imgWeather: '', //img for weather
        }
    }

    // fetch
    componentDidMount = () => {
        this.askCityAndCountry();
        this.askAdresIp();
    }

    // get ip
    askAdresIp = () => {
        fetch('https://api.ipify.org/')
            .then(data => data.text())
            .then(info => {
                this.setState({
                    ip: info
                });
                this.askCountryFlag(info);
            })
            .catch(err => this.showError(err))
    }

   //get city and country
    askCityAndCountry = () => {
        fetch('https://ipapi.co/json')
            .then(data => data.json())
            .then(info => {
                this.setState({
                    city: info.city,
                    country: info.country_name,
                    countryCode: info.country.toLowerCase()
                })
                this.askWeatherFetch(info.city,info.country)
            })
            .catch(err => this.showError(err))
    }

    // get country-flag
    askCountryFlag = (ip) => {
        fetch(`https://api.ipdata.co/${ip}?api-key=8604a41dc9225d155005b19fc3e5237f50eb64c4a4c01954fd59f887`)
            .then(data => data.json())
            .then(info => {
                this.setState({
                    countryImg: info.flag,
                    // city: info.city,
                    // country: info.country_name,
                    // countryCode: info.country_code.toLowerCase(),
                });
            })
            .catch(err => this.showError(err))
    }

    // get weather for city
    askWeatherFetch = (city,countryCode) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=a4b85511d03c8187201a512404cbd72a&units=metric`)
            .then(data => data.json())
            .then(info => this.setInfoWeather(info))
            .catch(err => this.showError(err))
    }

    // validation for city 
    setInfoWeather = (info) => {
        if(info.cod == '404'){
            console.log('404 Not Found - wrong city');
            alert('Wrong city name. Please enter a new city.');
        } else{
        this.setState({
            temp: Math.round(info.main.temp),
            wind: info.wind.speed,                      
            pressure: info.main.pressure,                
            clouds: info.clouds.all,
            humidity: info.main.humidity,                         
            weather: info.weather,
            imgWeather: info.weather[0].icon         
            })
        }
    }

    //for error fetch
    showError = (err) => {
        if(err == 'TypeError: Failed to fetch'){
            alert('No internet connection / failed to fetch');
            this.setState({
                city: 'Not internet connection',
                country: 'error',
            })
        } else  {
            alert('Wrong city name');
            this.setState({
                city: 'Wrong city',
                country: 'error',
     
            })
        }
    }
    
    render(){
        const { city, country, temp, wind, pressure, clouds, humidity, weather, countryImg, imgWeather } = this.state;
        const { language } = this.props
        return(
            <div className="placeWeather">
                <div className="container">
                {
                    !this.props.show
                    ? null
                    : <SlideDown>
                        <div className="weatherInfomation">
                            <div className="cityAndCountry">
                                <div className="city">{city}
                                    <a className="country">{country}
                                        <img alt="flag" className="flag" src={countryImg}></img>
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
                                        <td>{language[0]}<br /><a className="conditions">{wind} m/s</a></td>
                                        <td>{language[1]}<br /><a className="conditions">{clouds} %</a></td>
                                    </tr>
                                    <tr>
                                        <td>{language[2]}<br /><a className="conditions">{pressure} hpa</a></td>
                                        <td>{language[3]}<br /><a className="conditions">{humidity} %</a></td>
                                    </tr>
                                </tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </SlideDown>
                }
               </div>
            </div>
        )
    }
}


export default LocalisationWeather