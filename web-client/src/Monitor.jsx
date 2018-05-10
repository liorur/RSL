import React, {Component} from 'react';
import './App.css';


const Tick = (props) => {
    const {data} = props;
    return (<div  className={`tick ${data.fulfilled ? 'fulfilled' : ''}`}>
            <span className="info">time: {data.time.getTime()}</span>
            <span className="info">rate: {data.rate}</span>
            <span className="info"> fulfilled: {data.fulfilled}</span>
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
        this.state = {
            ticks: [
                {time: new Date(), rate: '1:9832', fulfilled: true},
                {time: new Date(), rate: '1:9832', fulfilled: true},
                {time: new Date(), rate: '1:9832', fulfilled: false},
                {time: new Date(), rate: '1:9832', fulfilled: false},
                {time: new Date(), rate: '1:9832', fulfilled: false},
            ]
        }
    }

    render() {


        const listItems = this.state.ticks.map((t, i) => <Tick key={i} data={t}>{i}</Tick>);

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
                        <td>$1000</td>
                        <td>$1000</td>
                    </tr>
                    <tr>
                        <th> Rate</th>
                        <td>1:9834</td>
                        <td>1:9835</td>
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
