import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    venues: []
  }

componentDidMount(){
  this.getVenues()
}

renderMap = () => {
  loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCgugNkUxQKbCvivBo5_f8piPwxHINF3DM&callback=initMap")
  window.initMap = this.initMap
}

getVenues = () => {
  let endPoint = "https://api.foursquare.com/v2/venues/explore?"
  let parameters = {
    client_id:"S0KNYX5Z2ZEWDS5BQ0D5H5OMLXYFXH3HYEJG1K1QVPEPWXHA",
    client_secret:"G3B1FVXX3CUS4SGJKHZP452F43WNOUSM1OFMFNJC5WWQFHBQ",
    near:"Abuja",
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


initMap = () => {
  let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 9.072264, lng: 7.491302},
          zoom: 8
        })

let infowindow = new window.google.maps.InfoWindow();

  this.state.venues.map(myvenue => {
    let contentString = `${myvenue.venue.name}`
      let marker = new window.google.maps.Marker({
        position:{lat:myvenue.venue.location.lat,
        lng:myvenue.venue.location.lng},
        map: map,
        title:myvenue.venue.name,
        animation: window.google.maps.Animation.DROP
      });

      marker.addListener('click', function() {
        infowindow.setContent(contentString)
        infowindow.open(map, marker);
 });
 return marker;
   })
  }

  render() {
    return (
      <main >
        <div id="map">
         <List>
            <FlatList
             data={this.state.venues}
             renderItem={({item})=>(
               <ListItem
               title={`${item.name}`}
               />
             )}
             keyExtractor={item=>item.id}
            />
         </List>
        </div>
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
