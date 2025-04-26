// RuleFor.js

import React, { Component } from 'react';

class RuleFor extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value || 0};
    }

    handleChange(e){
        this.setState({value: e.target.value});
    }

    optionsList(){
        const list = [
            ' --- ',
            'Для всех видов доставки',
            'Для курьерской доставки',
            'Для доставки в ПВЗ',
            'Для доставки в постамат',
            'Для доставки в ПВЗ и постамат'
        ].map((value, index) => <option value={(index > 0) ? index : '' } hidden={index == 0}  key={index}>{value}</option> )
        return list
    }

    render() {
        let name = `rules[${this.props.number}][for]`
        return (
            <div className="flds3">
                <label htmlFor="rulefor"># {this.props.number} правило для:</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} className="form-control form-control-sm"
                        id="rulefor" name={name} required>
                    {this.optionsList()}
                </select>
            </div>
        );
    }
}

export default RuleFor;