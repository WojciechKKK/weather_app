import React, { Component } from 'react';
import language from '../data_json/language.json'

import Header from './Header.jsx'
import LocalisationWeather from './LocalisationWeather.jsx'
import SelectOption  from './SelectOptions.jsx'
import DataWeather  from './DataWeather.jsx'
import ButtonSearch  from './ButtonSearch.jsx'
import NavLanguage  from './NavLanguage.jsx'
import NewInputSearch  from './NewInputSearch.jsx'
import InputCountry  from './InputCountry.jsx'
import Legend  from './Legend.jsx'
import Footer  from './Footer.jsx'



class Weather extends Component{
    constructor(){
        super();
        this.state = {
            language: 'eng',    //languagepage
            cityVal: '',  // for select option
            newCityVal: '', // for new input
            countryVal: 'pl',
            showWeatherYourCity: false, //view for your city
            showWeatherOtherCity: false, //view for other city
        }
    }
    
    //show all country & code - 250 items
    // showAllCountry = () => {
    //     fetch('https://restcountries.eu/rest/v2/all')
    //         .then(data=> data.json())
    //         .then(info => {
    //             let final = []
    //             info.map(el => final.push(`${el.name}: ${el.alpha2Code}`));
    //             this.setState({
    //                 countries: final
    //             })
    //         });
    // }

    //for change language
    setLanguage = (text) => {
        this.setState({
            language: text
        })
    }
   
    //show your city
    weatherYourCity = () => {
        this.setState({
            showWeatherYourCity: !this.state.showWeatherYourCity,
            showWeatherOtherCity: false,
        })
    }

    //close other
    closeOthercity = () => {
        this.setState({
            showWeatherOtherCity: false,
            cityVal: ''
        })
    }

    //show other city
    weatherOtherCity = () => {
        const { cityVal , showWeatherOtherCity } = this.state
        //validation for input
        if(cityVal == ''){
            this.state.language == 'eng' ? alert('Select a city from the list or enter another one') : alert('Wybierz miejscowość z listy lub wprowadź inną')
        }else if(!cityVal && showWeatherOtherCity){
            this.setState({
                showWeatherOtherCity: false,
                cityVal: '' 
            })
        }else{
            this.setState({
                showWeatherOtherCity: !this.state.showWeatherOtherCity,
                showWeatherYourCity: false
            })
        }
    }
   
    //for select/option
    setCity = (e) => {
        this.setState({
            cityVal: e.target.value,
            newCityVal: language.eng.input[0],
            showWeatherOtherCity: false,
            countryVal: 'pl'
        });
    }

    //for new input ------ SET
    setNewCity = (e) => {
        let actuallyInput = this.state.newCityVal;
        if(e.target.value.length != actuallyInput.length){
            this.setState({
                showWeatherOtherCity: false,
                newCityVal: e.target.value,
            }) 
        }else{
            this.setState({
                newCityVal: e.target.value
            })
        }
    }

    //for select country
    setCountry = (e) => {
        this.setState({
            countryVal: e.target.value,
            showWeatherOtherCity: false
        })
    }

    render(){
       const { cityVal, newCityVal, showWeatherYourCity, showWeatherOtherCity, countryVal } = this.state
        return(
            <div className="allBody">
                <NavLanguage fnLanguage={this.setLanguage} />
                <Header alt="ip" text={this.state.language == 'eng' ? language.eng.header : language.pl.header} />
                <ButtonSearch show={showWeatherYourCity} fnDownload={this.weatherYourCity} language={this.state.language == 'eng' ? language.eng.button : language.pl.button} />
                <LocalisationWeather show={showWeatherYourCity} language={this.state.language == 'eng' ? language.eng.location : language.pl.location}/>
                <Header text={this.state.language == 'eng' ? language.eng.header2 : language.pl.header2}/>
                <SelectOption fnSelect={this.setCity} selectVal={cityVal} />
                {   
                    cityVal == 'other city'
                    ? <div>
                        <NewInputSearch fnChange={this.setNewCity} val={newCityVal} language={this.state.language} />
                        <InputCountry fnSelect={this.setCountry} selectVal={countryVal} language={this.state.language}/>
                    </div>
                    : null
                }
                {
                    countryVal != 'pl'
                    ? <Legend language={this.state.language == 'eng' ? language.eng.legend : language.pl.legend} />
                    : null
                }
                <ButtonSearch show={showWeatherOtherCity} fnDownload={this.weatherOtherCity} language={this.state.language == 'eng' ? language.eng.button : language.pl.button}/>
                {
                    showWeatherOtherCity
                    ? <DataWeather cityVal={cityVal} newCityVal={newCityVal} countryVal={countryVal} language={this.state.language == 'eng' ? language.eng : language.pl} />
                    : null
                }
                <Footer language={this.state.language == 'eng' ? language.eng.button : language.pl.button} />
            </div>
        )
    }
}

export default Weather