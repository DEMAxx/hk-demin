// TableRow.js

import React, { Component } from 'react';
import axios from 'axios';
import {toast} from "react-toastify";

class TableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cu_name: this.props.obj.cu_name || '',
            cu_name2: this.props.obj.cu_name2 || '',
            id: this.props.obj.id,
            cu_id: this.props.obj.cu_id || 0,
            used: this.props.obj.used || false,
        };

        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setText = this.setText.bind(this);
    }

    onChange(e) {
        let name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }

    setText() {
        this.props.texter({
            title: this.state.cu_name || this.props.obj.name_rus,
            smalltitle: this.state.cu_name2 || this.props.obj.small_name
        })
    }

    save() {
        axios.post(`hash/${window.hash}/client/${window.cid}/tariffs`, {
            title: this.state.cu_name,
            smalltitle: this.state.cu_name2,
            tariff_id: this.state.id
        })
        .then((response) => {
            toast.success('Названия для данного тарифа успешно сохранены!');
            this.setState({
                cu_id: response.data.id,
            })
        })
        .catch(function (error) {
            console.log(error);
            toast.warn(error.response.data || 'Ошибка при сохранении названия тарифа');
        });
    }

    remove() {
        axios.delete(`hash/${window.hash}/client/${window.cid}/tariffs/${this.state.cu_id}`)
        .then((response) => {
            toast.success('Названия для данного тарифа успешно удалены!');
            this.setState({
                cu_name: '',
                cu_name2: '',
                cu_id: 0,
            })
        })
        .catch(function (error) {
            toast.warn(error.response.data || 'Ошибка при удалении названия тарифа');
            console.log(error);
        });
    }

    render() {
        // if (!this.state.used) return ('')
        let buttons;
        if (this.state.cu_id || !!this.state.cu_name || !!this.state.cu_name2) {
            buttons =
            <div className="p-0 m-0" >
                <button type="button" className="btn btn-success btn-sm" onClick={this.save} style={{padding: "0.1rem"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="20px" height="20px">
                        <path fill="#fff" d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'></path>
                    </svg>
                </button>
                <button type="button" className="btn btn-danger btn-sm ml-1" onClick={this.remove} style={{padding: "0.1rem"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill='#fff' viewBox="-2 -2 7 7" width="20px" height="20px">
                        <path stroke='#fff' d='M0 0l3 3m0-3L0 3'/><circle r='.5'/><circle cx='3' r='.5'/><circle cy='3' r='.5'/><circle cx='3' cy='3' r='.5'/>
                    </svg>
                </button>
            </div>
        }
        else buttons = ''


        return (
            <tr onClick={this.setText}  style={this.state.used || this.props.all  ? {} : { display: 'none' }}>
                <td>{this.props.obj.name_rus}</td>
                <td>{this.props.obj.small_name}</td>
                <td>
                    <input name="cu_name" type="text" className="form-control w-100 h-32" value={this.state.cu_name} onChange={this.onChange}/>
                </td>
                <td>
                    <input name="cu_name2" type="text" className="form-control w-100 h-32" value={this.state.cu_name2} onChange={this.onChange}/>
                </td>
                <td>
                    {buttons}
                </td>
            </tr>
        );
    }
}

export default TableRow;