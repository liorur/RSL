import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './';
import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';
import Monitor from "./Monitor";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rate: "loading",
            sideSelected: false
        }
    }

    componentDidMount() {
        const self = this;

        axios.get('http://localhost:3333/api/state', {
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then((response) => {
                self.setState(() => {
                    return {side: response.data.side};
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }


    setA() {
        this.setState((prevState, props) => {
            return {sideSelected: 'A'};
        });
    }

    setB() {
        this.setState((prevState, props) => {
            return {sideSelected: 'B'};
        });
    }

    renderSelect() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Select Side</h1>
                </header>
                <button onClick={() => this.setA()} disabled={this.state.side !== "LONG"} type="button" className="btn btn-primary">
                    <span className="huge">A</span>
                    <br></br>
                    Alice - long on BTC
                </button>
                <span className="huge">&nbsp;</span>
                <button onClick={() => this.setB()} disabled={this.state.side !== "STABLE"} type="button" className="btn btn-success">
                    <span className="huge">B</span>
                    <br></br>
                    Bob - stable USD value
                </button>
            </div>
        )
    }

    renderMonitor() {
        return <Monitor data={this.state} side={this.state.side}></Monitor>
    }


    render() {
        const {sideSelected} = this.state;
        return <div>{sideSelected ? this.renderMonitor() : this.renderSelect()}</div>
    }
}


export default App;
