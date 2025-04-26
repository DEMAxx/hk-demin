import React, { Component } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import TableRow from './TableRow';
import RadioGrp from './RadioGrp';
import PreviewTariff from './PreviewTariff';
import { toast } from 'react-toastify';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ededed',
    },
};

Modal.setAppElement('#tariff-template');

export default class TariffTemplate extends Component {
    constructor() {
        super();

        this.state = {
            showModal: false,
            showUsed: true,
            useTarif: window.dn != null && window.dn.usetarif != undefined &&
                      window.dn.usetarif == 0 ? false : true,
            tariffs: [],
            options: [
                'название доставки из настроек доставки',
                'полное Название тарифа',
                'короткое Название тарифа'],
            optionsInfo: [
                'название доставки из настроек доставки',
                'полное Название тарифа',
                'короткое Название тарифа',
                'описание доставки из настроек доставки'],
            titles: {
                'selected': window.dn != null && window.dn.titles != undefined
                            ? window.dn.titles
                            : 0, 'value': window.cdek_courier,
            },
            subtitles: {
                'selected': window.dn != null && window.dn.subtitles !=
                            undefined ? window.dn.subtitles : 2,
                'value': 'короткое Название тарифа',
            },
            headTitles: [
                [
                    window.cdek_courier,
                    'Экспресс лайт дверь-дверь',
                    'Экспресс лайт',
                    window.cdek_delivery_info],
                [
                    window.cdek_courier,
                    'Экспресс лайт дверь-склад',
                    'Экспресс лайт',
                    window.cdek_delivery_info]],
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleNameRadio = this.toggleNameRadio.bind(this);
        this.toggleInfoRadio = this.toggleInfoRadio.bind(this);
        this.toggleCheckbox = this.toggleCheckbox.bind(this);
        this.toggleShowUsed = this.toggleShowUsed.bind(this);
        this.saveNames = this.saveNames.bind(this);
        this.updateTariffs = this.updateTariffs.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount() {
        axios.get(`hash/${window.hash}/client/${window.cid}/tariffs`)
             .then(response => {
                 this.setState({ tariffs: response.data });
             })
             .catch(function(error) {
                 console.log(error);
             });

        $(document).ready(function() {
            // this.$city = $( '#city_from_name' )
            $('#city_from_name').autocomplete({
                                                  source: '/api/citynames',
                                                  minLength: 1,
                                                  select: function(event, ui) {
                                                      $('#city_from')
                                                        .val(ui.item.id);
                                                  },
                                              });

            $('#rezhim').on('change', function() {
                $('#tarrifs option').show();
                const destination = this.value;
                $(`#tarrifs option`).each(function(){
                    if (destination === 'dver') {
                        if (window.sklad_tariffs.includes(this.value)) {
                            $(this).hide();
                        }
                    } else if (destination === 'sklad') {
                        if (!window.sklad_tariffs.includes(this.value)) {
                            $(this).hide();
                        }
                    }
                });
            });
            $('#use_import').on('change', function() {
                $('#status_map').toggle();
            });
        });

    }

    updateTariffs(selected) {
        let headTitles = this.state.headTitles,
          title = selected.title || 'Экспресс лайт дверь-склад',
          smalltitle = selected.smalltitle || 'Экспресс лайт';

        headTitles.shift();
        headTitles.push([
                            window.cdek_courier,
                            title,
                            smalltitle,
                            window.cdek_delivery_info]);
        this.setState({ headTitles: headTitles });
    }

    tabRow() {
        if (this.state.tariffs instanceof Array) {
            return this.state.tariffs.map((object, i) => {
                return <TableRow
                  obj={object} key={i} texter={this.updateTariffs}
                  all={!this.state.showUsed} />;
            });
        }
    }

    toggleNameRadio(index) {
        this.setState({
                          titles: {
                              selected: index, value: this.state.options[index],
                          },
                      });
    }

    toggleInfoRadio(index) {
        this.setState({
                          subtitles: {
                              selected: index,
                              value: this.state.optionsInfo[index],
                          },
                      });
    }

    toggleCheckbox() {
        this.setState({ useTarif: !this.state.useTarif });
    }

    toggleShowUsed() {
        this.setState({ showUsed: !this.state.showUsed });
    }

    saveNames() {
        axios.post(`${window.cid}/delivery`, {
            titles: this.state.titles.selected,
            subtitles: this.state.subtitles.selected,
            usetarif: this.state.useTarif ? 1 : 0,
        })
             .then(response => {
                 toast.success(
                   'Настройки отображения тарифов успешно сохранены!');
             })
             .catch(function(error) {
                 toast.warn('Ошибка при сохранении.');
                 console.log(error);
             });
    }

    render() {
        return (<div>
              <button
                type="button" className="btn btn-success"
                onClick={this.openModal}>Настроить отображение тарифов
              </button>
              <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Example"
              >

                  <button className="close" onClick={this.closeModal}><span
                    aria-hidden="true">&times;</span></button>
                  <h4
                    ref={subtitle => this.subtitle = subtitle}
                    style={{ color: '#0c8416' }}>Настройка отображения
                      тарифов</h4>
                  <hr />
                  <div className="d-flex justify-content-center w-100">
                      <div className="col col-md-6">
                          <span>Настройки отображения тарифов</span><br />

                          В качестве названия тарифа использовать:
                          <RadioGrp
                            selectedIndex={this.state.titles.selected}
                            options={this.state.options}
                            handler={this.toggleNameRadio} name="title" />

                          В качестве описания тарифа использовать:
                          <RadioGrp
                            selectedIndex={this.state.subtitles.selected}
                            options={this.state.optionsInfo}
                            handler={this.toggleInfoRadio} name="subtitle" />


                          <div
                            className="custom-control custom-checkbox"
                            onClick={this.toggleCheckbox}>
                              <input
                                type="checkbox" className="custom-control-input"
                                checked={this.state.useTarif}
                                onChange={this.toggleCheckbox} />
                              <label className="custom-control-label">Использовать
                                  для тарифов надпись "Тариф"</label>
                          </div>

                      </div>
                      <div className="col col-md-6">
                          <p>Примерно как это будет отображаться на сайте</p>

                          <div>
                              <PreviewTariff
                                titles={this.state.headTitles[0]}
                                title={this.state.titles.selected} uid="1"
                                subtitle={this.state.subtitles.selected}
                                useTarif={this.state.useTarif} />

                              <PreviewTariff
                                titles={this.state.headTitles[1]}
                                title={this.state.titles.selected} uid="2"
                                subtitle={this.state.subtitles.selected}
                                useTarif={this.state.useTarif} />


                          </div>
                      </div>
                  </div>
                  <div
                    className="d-flex align-self-center justify-content-start w-75 ml-5 mb-1">
                      <button
                        className="btn btn-success"
                        onClick={this.saveNames}>Сохранить изменения
                      </button>
                  </div>

                  <div
                    className="d-flex align-self-center justify-content-end w-100 mb-1">
                      <div
                        className="custom-control custom-checkbox"
                        onClick={this.toggleShowUsed}>
                          <input
                            type="checkbox" className="custom-control-input"
                            checked={this.state.showUsed}
                            onChange={this.toggleShowUsed} />
                          <label className="custom-control-label">Отображать
                              только используемые тарифы</label>
                      </div>
                      {/*<button className="btn btn-success" onClick={this.saveNames}>Отображать только используемые тарифы</button>*/}
                  </div>

                  <div className="d-flex justify-content-start w-100">
                      <table
                        className="table table-hover table-responsive table-sm fixed-h">
                          <thead>
                          <tr>
                              <th scope="col">Название тарифа</th>
                              <th scope="col">Краткое название тарифа</th>
                              <th scope="col">Новое название</th>
                              <th scope="col">Новое краткое название тарифа</th>
                              <th scope="col"></th>
                          </tr>
                          </thead>
                          <tbody>
                          {this.tabRow()}
                          </tbody>
                      </table>

                  </div>


              </Modal>
          </div>);
    }
}
