import React from 'react';

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.value);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {
    const stylef = {
      zIndex: 999,
      top: 0,
      right: 0
    }
    return (
      <form style={stylef}
      onSubmit={this.handleSubmit}>
        <input id="venueType" onChange={this.handleChange} value={this.state.value} placeholder="search for venues" />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
