// PriceRules.js

import React, { Component } from 'react';
import RuleFor from "./RuleFor";
import RuleWhat from "./RuleWhat";
import RulePrice from "./RulePrice";
import axios from "axios";
import { toast } from 'react-toastify';

class PriceRules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            for: this.props.obj.for || 0,
            price: this.props.obj.price || {type: 0, by: 0},
            what: this.props.obj.what || {type: 0, code:0, name:"" },
        }

        this.pricemod = this.pricemod.bind(this);
        this.rulemod = this.rulemod.bind(this);
        this.remove = this.remove.bind(this);
    }

    pricemod(index){
        console.log('index', index)
    }

    rulemod(index){
        console.log('index', index)
    }

    remove(){
        if (this.props.obj.id == 0) this.props.removing(this.props.number - 1)
        else
        axios.delete(`hash/${window.hash}/client/${window.cid}/rules/${this.props.obj.id}`)
            .then((response) => {
                this.props.removing(this.props.number - 1)
                toast.success(response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.warn(error.response.data);
            });

    }

    render() {
        let uid = `rules[${this.props.number}][id]`
        return (
            <div className="card mb-2 shadow-sm small" style={{backgroundColor:'#ededed'}}>
                <div className="flex-cont3 w-100 mt-0 p-1" role="alert">

                    <RuleFor value={this.state.for} handler={this.rulemod} number={this.props.number} />
                    <RulePrice value={this.state.price} handler={this.pricemod} number={this.props.number} />
                    <RuleWhat value={this.state.what} handler={this.pricemod} number={this.props.number} />
                </div>
                <input name={uid} type="hidden" value={this.props.obj.id}/>
                <div className="d-flex justify-content-end w-100 p-1">
                    <button type="button" className="btn btn-warning btn-sm pr-5 pl-5 pt-0 pb-0" onClick={this.remove}> удалить </button>
                </div>

            </div>
        );
    }
}

export default PriceRules;