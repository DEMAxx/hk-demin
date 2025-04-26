import React, {Component} from 'react';
import RadioBtn from "./RadioBtn";

class RadioGrp extends React.Component{

    constructor(props) {
        super(props);
    }

    toggleRadioBtn(index){
        this.props.handler(index)
    }

    render() {

        const { options } = this.props;

        const allOptions = options.map((option, i) => {
            return <RadioBtn name={this.props.name} key={i} isChecked={(this.props.selectedIndex == i)} text={option} value={option} index={i} handler={this.toggleRadioBtn.bind(this)} />
        });

        return (
            <div className="row custom-control custom-radio">
                {allOptions}
            </div>
        );
    }
}

export default RadioGrp;