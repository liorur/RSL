import React, {Component} from 'react';
import './App.css';
import axios from "axios/index";

const baseSum = 1000;
const Tick = (props) => {
    const {data} = props;
    const fulfilled = data.status === "FULFILLED";
    const initial = data.status === "INITIAL";
    const pending = data.status === "PENDING";
    return (<div
            className={`tick ${fulfilled ? 'fulfilled' : ''} ${initial ? 'initial' : ''} ${initial ? 'initial' : ''}  ${pending ? 'pending' : ''}`}>

            <span
                className="info">satoshies {data.receiving_side ? 'sent' : 'received'}: {data.satoshies_to_send}</span>
            <span className="info">rate: {data.rate}</span>
            <span className="info"> status: {data.status}</span>
        </div>
        // {/*<div className={`tick ${data.fulfilled ? 'fulfilled' : ''}`}>*/}
        //     {/*time:{data.time}*/}
        //     {/*rate:{data.rate}*/}
        //     {/*fulfilled:{data.fulfilled}*/}
        // {/*</div>*/});
    )
};

class Monitor extends Component {


    constructor(props) {
        super(props);
        this.state = {ticks: []}
    }

    componentDidMount() {
        const self = this;
        setInterval(() => {
            axios.get('http://localhost:3333/api/state', {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            })
                .then((response) => {
                    console.log(response.data);
                    self.setState((prevState, props) => {
                        return response.data;
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000)
    }

    render() {

        let newseen = false;
        const listItems = this.state.ticks
            .filter(t => {
                if (t.status == "NEW") {
                    if (newseen == false) {
                        newseen = true;
                        return true;
                    } else {
                        return false
                    }
                }
                return true;
            })
            .reverse().map((t, i) => <Tick key={i} data={t}>{i}</Tick>);

        return (<div className="App">
            <header className="App-header">
                <h1 className="App-title">Monitor {this.props.side}</h1>
            </header>
            <div className="status">
                <table>
                    <tbody>

                    <tr>
                        <th></th>
                        <th>Start</th>
                        <th>Current</th>
                    </tr>
                    <tr>
                        <th>Sum</th>
                        <td>${this.state.baseSum}</td>
                        <td>${this.state.currentSum}</td>
                    </tr>
                    <tr>
                        <th> Rate</th>
                        <td>1:{this.state.baseRate}</td>
                        <td>1:{this.state.currentRate}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="ticks">
                {listItems}
            </div>
        </div>)
    }
}

export default Monitor;
