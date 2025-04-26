// RuleWhat.js

import React, { Component } from 'react';

class RuleWhat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value.type || 0,
            code: this.props.value.code || 0,
            name: this.props.value.name || "",
            number: this.props.number
        };

    }

    componentDidMount(){
        let cname = `#cname-${this.props.number}`,
            rname = `#rname-${this.props.number}`,
            code = `#pcode-${this.props.number}`

        $(document).ready(function () {
            $( cname ).autocomplete({
                source: '/api/citynames',
                minLength: 1,
                select: function(event, ui) {
                    $(code).val(ui.item.id);
                }
            });
            $( rname ).autocomplete({
                source: '/api/regionnames',
                minLength: 1,
                select: function(event, ui) {
                    $(code).val(ui.item.id);
                }
            });
        });
    }

    handleChange(e){

        this.setState({
            value: e.target.value
        })
        // this.props.handler(this.state.value);
    }

    handleChange2(e){

        this.setState({
            name: e.target.value
        })
        // this.props.handler(this.state.value);
    }

    optionsList(){
        const list = [
            ' не выбрано ',
            'для области',
            'для города',
        ].map((value, index) => <option value={index} key={index}>{value}</option> )
        return list
    }

    render() {
        let pname = this.state.value == 2 ? 'город' : 'область',
            holder = `Укажите ${pname} для правила...`,
            cname = `cname-${this.props.number}`,
            rname = `rname-${this.props.number}`,
            code = `pcode-${this.props.number}`

        let whattype = `rules[${this.props.number}][what][type]`,
            whatcode = `rules[${this.props.number}][what][code]`,
            whatname = `rules[${this.props.number}][what][name]`,
            whatname2 = `rules[${this.props.number}][what][name2]`

        return (
            <div className="flds3">
                <label htmlFor="rulewhat">Правило для:</label>
                <select value={this.state.value} onChange={this.handleChange.bind(this)} name={whattype}
                        className="form-control form-control-sm" id="rulewhat">
                    {this.optionsList()}
                </select>
                <div style={this.state.value > 0  ? {} : { display: 'none' }}>
                    <input id={code} name={whatcode} type="hidden" value={this.state.code}/>
                    <input placeholder={holder} style={this.state.value == 2  ? {} : { display: 'none' }}
                           className="form-control form-control-sm ui-autocomplete-input" name={whatname} type="text"
                           value={this.state.name} onChange={this.handleChange2.bind(this)} id={cname} autoComplete="off"/>
                    <input placeholder={holder} style={this.state.value == 1  ? {} : { display: 'none' }}
                           className="form-control form-control-sm ui-autocomplete-input" name={whatname2} type="text"
                           value={this.state.name} onChange={this.handleChange2.bind(this)} id={rname} autoComplete="off"/>
                </div>

            </div>
        );
    }
}

export default RuleWhat;