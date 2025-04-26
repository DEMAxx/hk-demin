// PreviewTariff.js

import React, { Component } from 'react';

class PreviewTariff extends Component {
    constructor(props) {
        super(props);
        this.state = { price: Math.floor(Math.random() * 1000) }
    }

    showTarif(i) {
        let str = this.props.titles[i]
        return this.props.useTarif && i > 0 && i < 3 ? "Тариф \"" + str + "\"" : str
    }

    render() {
        let id_label =`tariff_${this.props.uid}`
        return (
            <label htmlFor={id_label} className="co-toggable_field co-method">
                <span className="co-delivery_input">
                    <input id={id_label} name="order" type="radio" value="1" className="radio_button"/>
                </span>
                <span className="co-delivery_information">
                <span className="co-title co-toggable_field">{this.showTarif(this.props.title)}</span>
                <span className="co-description co-toggable_field">{this.showTarif(this.props.subtitle)}</span>
                <span className="co-description co-toggable_field">от 2 до 3 рабочих дней</span>
                </span>
                <span className="co-delivery_price co-toggable_field" data-price="0">+ {this.state.price}&nbsp;руб</span>
            </label>
        );
    }
}

export default PreviewTariff;