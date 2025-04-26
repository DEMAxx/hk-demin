// RulePrice.js

import React, { Component } from 'react';

class RulePrice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.value.type || -1,
            priceby: this.props.value.by || 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            type: e.target.value
        })
    }

    onChange(e) {
        this.setState({
            priceby: e.target.value
        })
    }

    optionsList(){
        const list = [
            ' --- ',
            'фиксированная',
            'увеличить',
            'уменьшить'
        ].map((value, index) => <option value={(index > 0) ? index : '' } hidden={index == 0} key={index}>{value}</option> )
        return list
    }


    render() {
        let name = `rules[${this.props.number}][price][type]`,
            nameby = `rules[${this.props.number}][price][by]`
        return (
            <div className="flds3">
                    <label htmlFor="ruleprice">Стоимость доставки:</label>
                    <select value={this.state.type} onChange={this.handleChange} className="form-control form-control-sm"
                            placeholder="Выберите ..." id="ruleprice" name={name} required>
                        {this.optionsList()}
                    </select>
                <div className="d-flex justify-content-end">
                    <label htmlFor="rulepriceby">{(this.state.type == 2) ? "на:" : "равна:" }</label>
                    <input step="0.1" className="form-control form-control-sm w-50" min="0" type="number" name={nameby}
                           id="rulepriceby" onChange={this.onChange} value={this.state.priceby} />
                </div>
            </div>
        );
    }
}

export default RulePrice;