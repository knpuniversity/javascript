'use strict';

const $ = require('jquery');
window.jQuery = $;
require('bootstrap');

$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
});
