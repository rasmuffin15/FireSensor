import React from 'react';

import TempGraph from './tempGraph'
import HumGraph from './humGraph'
import PartIRGraph from './partIRGraph'

function GraphVerdict(props) {
    if(props.hweui !== "") {
        return(
            <div>
                <TempGraph hweui = {props.hweui} />
                <HumGraph hweui = {props.hweui} />
                <PartIRGraph hweui = {props.hweui} />
            </div>
        )
    } else {
        return <p>No hweui detected</p>
    }
}

class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.handleHweuiClick = this.handleHweuiClick.bind(this);
        this.state = {
            hweui: "",
            items: []
        };
    }

    handleHweuiClick(h) {
        this.setState({hweui: h.target.id});
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
        const hID = this.state.hweui;
        const items = this.state.items;
        return(
            <div>
                <ul>
                    {items.map(item => (
                        <li id={item.hweui} value={item.hweui} onClick={this.handleHweuiClick}>
                            {item.hweui}
                        </li>
                    ))}
                </ul>
                <GraphVerdict 
                    hweui={hID}
                />
            </div>

        );
    }
}

export default Graph;