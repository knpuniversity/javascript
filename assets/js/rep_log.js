'use strict';

import $ from 'jquery';
import RepLogApp from './Components/RepLogApp';

$(document).ready(function() {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper);
});
