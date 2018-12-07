import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    venues: []
  }

componentDidMount(){
  // {invoke functions}
  this.getVenues()
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
    near:"Sydney",
    query:"food",
    v:"20180725"
  }
  axios.get(endPoint + new URLSearchParams(parameters))
  .then(response => {
    this.setState({
    venues:response.data.response.groups[0].items},
    this.renderMap()
    )
    console.log(response);
  })
  .catch(error => {
    console.log("Error !!!" + error);
  })
}
// {initmap function copied from google maps api}
initMap = () => {
  // {here we define google by adding window.}
  let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        })
// {create infowindow}
  var infowindow = new window.google.maps.InfoWindow();

  this.state.venues.map(myvenue => {
    var contentString = `${myvenue.venue.name}`

// {create a marker}
      var marker = new window.google.maps.Marker({
        position:{lat:myvenue.venue.location.lat,
        lng:myvenue.venue.location.lng},
        map: map,
        title: myvenue.venue.name
      });
      // return marker;

      marker.addListener('click', function() {
        // change content
        infowindow.setContent(contentString)
        // {open infowindow}
        infowindow.open(map, marker);
 });
   })
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
