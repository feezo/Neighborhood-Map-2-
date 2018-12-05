import React, { Component } from 'react';
import './App.css';

class App extends Component {

componentDidMount(){
  this.renderMap()
}

renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCgugNkUxQKbCvivBo5_f8piPwxHINF3DM&callback=initMap")
  window.initMap = this.initMap
}

initMap = () => {
  let map = new window.google.maps.Map(document.getElementById('map'), {
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

function loadScript (url){
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

export default App;
