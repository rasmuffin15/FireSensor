import React from 'react';
import { VictoryChart, VictoryZoomContainer, 
        VictoryLine } from 'victory'

//Need to call this page with unique hwuei
//Make Lambda call to get all temp/time data for hwuei
class tempGraph extends React.Component {
    
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    //change lambda to only get temp and time row
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

    handleZoom(domain) {
        this.setState({selectedDomain: domain});
    }
    
    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
          return <>Error: {error.message}</>;
        } else if (!isLoaded) {
          return <>Loading...</>;
        } else {
          return (
            <div>
                <VictoryChart
                    width={550}
                    height={300}
                    scale={{x: "time"}}
                    containerComponent={
                        <VictoryZoomContainer responsive={false}
                            zoomDimension="x"
                            zoomDomain={this.state.zoomDomain}
                            onZoomDomainChange={this.handleZoom.bind(this)}
                        />
                    }
                >
                    <VictoryLine 
                        style={{
                            data: {stroke: "tomato"}
                        }}
                        data={/*Need an array here*/}
                    />

                </VictoryChart>
            </div>
        );}
    }
}