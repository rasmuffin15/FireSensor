import React from 'react';


class uniqueData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://1tmpf2bpja.execute-api.us-west-2.amazonaws.com/default/sensor")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result.rows)
          this.setState({
            isLoaded: true,
            items: result.rows
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <>Error: {error.message}</>;
    } else if (!isLoaded) {
      return <>Loading...</>;
    } else {
      return (
        <table>
          <thead>
            <tr>
              <th>HWEUI</th>
              <th>VDD</th>
              <th>Temp</th>
              <th>Humidity</th>
              <th>Air Quality</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr>
                <td key = {item.hweui}>
                  {item.hweui}
                </td>
                <td key = {item.vdd}>
                  {item.vdd}
                </td>
                <td key = {item.temp}>
                  {item.temp}
                </td>
                <td key = {item.humidity}>
                  {item.humidity}
                </td>
                <td key = {item.aq}>
                  {item.aq}
                </td>
                <td key = {item.time}>
                  {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }
}

export default uniqueData;