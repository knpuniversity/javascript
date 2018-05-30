'use strict';

const $ = require('jquery');
const RepLogApp = require('./RepLogApp');

$(document).ready(function() {
    var $wrapper = $('.js-rep-log-table');
    var repLogApp = new RepLogApp($wrapper);
});
