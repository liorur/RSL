import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class App extends Component {

    constructor(props) {
        super(props);
        this.state={
            rate:"loading"
        }
    }

    componentDidMount() {
        const self= this;
        setInterval(()=>{
            axios.get('http://localhost:3333/api/state',{headers: {
                'Access-Control-Allow-Origin': '*',
            }})
                .then( (response)=> {
                    self.setState((prevState, props) => {
                        return {rate:response.data.BTCUSD.last};
                    });
                })
                .catch( (error)=> {
                    console.log(error);
                });

        },5000)
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <p className="App-intro">
                  rate : {this.state.rate}
                </p>

            </div>
        );
    }
}


export default App;
