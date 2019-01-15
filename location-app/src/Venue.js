import React, { Component } from 'react';


class Venue extends Component { // Make sure we export!

  render() {
    return(
      <li>{this.props.name}</li>
    )

  }

}

export default Venue;
