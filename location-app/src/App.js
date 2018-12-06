import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

componentDidMount(){
  this.renderMap()
}

renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCgugNkUxQKbCvivBo5_f8piPwxHINF3DM&callback=initMap")
  // {convert initmap to a window object}
  window.initMap = this.initMap
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
