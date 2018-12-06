import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

componentDidMount(){
  // {invoke functions}
  this.getVenues()
  this.renderMap()
}

renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCgugNkUxQKbCvivBo5_f8piPwxHINF3DM&callback=initMap")
  // {convert initmap to a window object}
  window.initMap = this.initMap
}

// {create a for to fetch venue apis}
getVenues = () => {
  let endPoint = "https://api.foursquare.com/v2/venues/explore?"
  let parameters = {
    client_id:"S0KNYX5Z2ZEWDS5BQ0D5H5OMLXYFXH3HYEJG1K1QVPEPWXHA",
    client_secret:"G3B1FVXX3CUS4SGJKHZP452F43WNOUSM1OFMFNJC5WWQFHBQ",
    near:"Abuja" ,
    query:"food",
    v:"20180725"
  }
  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log("Error !!!" + error);
  })
}

// {initmap function copied from google maps api}
initMap = () => {
  let map = new window.google.maps.Map(document.getElementById('map'), {
    // {here we define google by adding window.}
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }

  render() {
    return (
      <main >
        <div id="map"></div>
      </main>
    );
  }
}

// {define a loadscript function to load script tag}
function loadScript (url){
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
