import React, {Component} from 'react';

class RadioBtn extends Component {
    constructor(props){
        super(props);
    }

    handleClick(){
        this.props.handler(this.props.index);
    }

    render() {
        return (
            <div className="custom-control custom-radio" onClick={this.handleClick.bind(this)}>
                <input name={this.props.name} type="radio" value={ this.props.value } className="custom-control-input" checked={ this.props.isChecked } onChange={this.handleClick.bind(this)}/>
                <label className="custom-control-label">{this.props.text}</label>
            </div>
        );
    }
}
export default RadioBtn;