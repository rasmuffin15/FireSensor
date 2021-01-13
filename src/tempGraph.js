import React from 'react';
import { VictoryChart, VictoryZoomContainer, 
        VictoryLine, VictoryAxis} from 'victory'

class TempGraph extends React.Component {
    
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    
    componentDidMount() {
        console.log(this.props.hweui)
        fetch(`https://1tmpf2bpja.execute-api.us-west-2.amazonaws.com/default/sensor?hweui=${this.props.hweui}`)
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

    handleZoom(domain) {
        this.setState({selectedDomain: domain});
    }
    
    render() {
        const { error, isLoaded, items } = this.state;

        let tData = []

        for(var i = 0; i < items.length; i++) {
          let datapoint = {x: new Date(items[i].time), y: Number(items[i].temp)}
          tData[i] = datapoint
        }

        console.log(tData)
        if (error) {
          return <>Error: {error.message}</>;
        } else if (!isLoaded) {
          return <>Loading...</>;
        } else {
          return (
            <div>
              <VictoryChart 
                width={800}
                height={800}
                scale={{x: "time"}}
                containerComponent={
                  <VictoryZoomContainer responsive={false}
                    zoomDimension="x"
                    zoomDomain={this.state.zoomDomain}
                    onZoomDomainChange={this.handleZoom.bind(this)}
                  />
                }
              >
                <VictoryAxis
                  tickFormat={(x) => new Date(x).getDay() + ':' + new Date(x).getHours() + ':' + new Date(x).getMinutes()}
                />
                <VictoryAxis 
                  dependentAxis
                  tickFormat={(y) => y}
                />
                <VictoryLine 
                  style={{
                    data: {stroke: "tomato"}
                  }}
                  data={tData}
                />
              </VictoryChart>
            </div>
        );}
    }
}

export default TempGraph;