import React from 'react';

class Data extends React.Component {

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
        <tbody>
          {items.map(item => (
            <tr>
              <td key = {item.id}>
                {item.id}
              </td>
              <td key = {item.dev_id}>
                {item.dev_id}
              </td>
              <td key = {item.h_serial}>
                {item.h_serial}
              </td>
              <td key = {item.port}>
                {item.port}
              </td>
              <td key = {item.counter}>
                {item.counter}
              </td>
              <td key = {item.payload_raw}>
                {item.payload_raw}
              </td>
              <td>
                Filler
              </td>
              <td key = {item.url}>
                {item.url}
              </td>
            </tr>
          ))}
        </tbody>
      )
    }
  }
}

export default Data;