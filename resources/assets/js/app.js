
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

// require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

// require('./components/TariffTemplate');

require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';

import $ from 'jquery';
window.$ = window.jQuery = $;
import 'jquery-ui/ui/widgets/autocomplete';


import TariffTemplate from './components/TariffTemplate';
import PriceModify from './components/PriceModify';

render(<TariffTemplate />, document.getElementById('tariff-template'));
render(<PriceModify />, document.getElementById('price-modify'));
