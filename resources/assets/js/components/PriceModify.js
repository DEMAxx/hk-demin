// PriceModify.js

import React, { Component } from 'react';
import PriceRules from "./PriceRules";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PriceModify extends Component {
    constructor(props) {
        super(props);
        this.state = { rules: [] }
        this.toast = null
        this.addRule = this.addRule.bind(this);
        this.deleteRule = this.deleteRule.bind(this);
    }

    componentDidMount() {
        axios.get(`hash/${window.hash}/client/${window.cid}/rules`)
            .then(response => {
                this.setState({rules: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    showRules(){
        if(this.state.rules instanceof Array){
            return this.state.rules.map((object, i) => {
                return <PriceRules obj={object} key={i} number={i+1} removing={this.deleteRule} />;
            })
        }
    }

    addRule(){
        let rules = this.state.rules
        rules.push({id: 0, for: 0, price: { type: 0, by: 0 }, what: {type: 0, code:0, name:"" }})
        this.setState({rules : rules });
    }

    deleteRule(i){
        let rules = this.state.rules
        this.setState({rules : null });
        rules.splice(i,1)
        this.setState({rules : rules });
    }

    render() {
        return (
            <div className="d-flex flex-column justify-content-center w-100">
                {this.showRules()}
                <div className="d-flex justify-content-center w-100">
                    <button type="button" className="btn btn-success" onClick={this.addRule}>Добавить еще настроек</button>
                </div>
                <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
            </div>
        );
    }
}
export default PriceModify;