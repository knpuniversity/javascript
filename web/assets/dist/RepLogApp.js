'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (window, $, Routing, swal) {

    var HelperInstances = new WeakMap();

    var RepLogApp = function () {
        function RepLogApp($wrapper) {
            _classCallCheck(this, RepLogApp);

            this.$wrapper = $wrapper;
            this.repLogs = new Set();

            HelperInstances.set(this, new Helper(this.repLogs));

            this.loadRepLogs();

            this.$wrapper.on('click', '.js-delete-rep-log', this.handleRepLogDelete.bind(this));
            this.$wrapper.on('click', 'tbody tr', this.handleRowClick.bind(this));
            this.$wrapper.on('submit', RepLogApp._selectors.newRepForm, this.handleNewFormSubmit.bind(this));
        }

        /**
         * Call like this.selectors
         */


        _createClass(RepLogApp, [{
            key: 'loadRepLogs',
            value: function loadRepLogs() {
                var _this = this;

                $.ajax({
                    url: Routing.generate('rep_log_list')
                }).then(function (data) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = data.items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var repLog = _step.value;

                            _this._addRow(repLog);
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }
                });
            }
        }, {
            key: 'updateTotalWeightLifted',
            value: function updateTotalWeightLifted() {
                this.$wrapper.find('.js-total-weight').html(HelperInstances.get(this).getTotalWeightString());
            }
        }, {
            key: 'handleRepLogDelete',
            value: function handleRepLogDelete(e) {
                var _this2 = this;

                e.preventDefault();

                var $link = $(e.currentTarget);

                swal({
                    title: 'Delete this log?',
                    text: 'What? Did you not actually lift this?',
                    showCancelButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: function preConfirm() {
                        return _this2._deleteRepLog($link);
                    }
                }).catch(function (arg) {
                    // canceling is cool!
                });
            }
        }, {
            key: '_deleteRepLog',
            value: function _deleteRepLog($link) {
                var _this3 = this;

                $link.addClass('text-danger');
                $link.find('.fa').removeClass('fa-trash').addClass('fa-spinner').addClass('fa-spin');

                var deleteUrl = $link.data('url');
                var $row = $link.closest('tr');

                return $.ajax({
                    url: deleteUrl,
                    method: 'DELETE'
                }).then(function () {
                    $row.fadeOut('normal', function () {
                        $row.remove();
                        _this3.updateTotalWeightLifted();
                    });
                });
            }
        }, {
            key: 'handleRowClick',
            value: function handleRowClick() {
                console.log('row clicked!');
            }
        }, {
            key: 'handleNewFormSubmit',
            value: function handleNewFormSubmit(e) {
                var _this4 = this;

                e.preventDefault();

                var $form = $(e.currentTarget);
                var formData = {};

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = $form.serializeArray()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var fieldData = _step2.value;

                        formData[fieldData.name] = fieldData.value;
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                this._saveRepLog(formData).then(function (data) {
                    _this4._clearForm();
                    _this4._addRow(data);
                }).catch(function (errorData) {
                    _this4._mapErrorsToForm(errorData.errors);
                });
            }
        }, {
            key: '_saveRepLog',
            value: function _saveRepLog(data) {
                return new Promise(function (resolve, reject) {
                    var url = Routing.generate('rep_log_new');

                    $.ajax({
                        url: url,
                        method: 'POST',
                        data: JSON.stringify(data)
                    }).then(function (data, textStatus, jqXHR) {
                        $.ajax({
                            url: jqXHR.getResponseHeader('Location')
                        }).then(function (data) {
                            // we're finally done!
                            resolve(data);
                        });
                    }).catch(function (jqXHR) {
                        var errorData = JSON.parse(jqXHR.responseText);

                        reject(errorData);
                    });
                });
            }
        }, {
            key: '_mapErrorsToForm',
            value: function _mapErrorsToForm(errorData) {
                this._removeFormErrors();
                var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);

                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = $form.find(':input')[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var element = _step3.value;

                        var fieldName = $(element).attr('name');
                        var $wrapper = $(element).closest('.form-group');
                        if (!errorData[fieldName]) {
                            // no error!
                            return;
                        }

                        var $error = $('<span class="js-field-error help-block"></span>');
                        $error.html(errorData[fieldName]);
                        $wrapper.append($error);
                        $wrapper.addClass('has-error');
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
        }, {
            key: '_removeFormErrors',
            value: function _removeFormErrors() {
                var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);
                $form.find('.js-field-error').remove();
                $form.find('.form-group').removeClass('has-error');
            }
        }, {
            key: '_clearForm',
            value: function _clearForm() {
                this._removeFormErrors();

                var $form = this.$wrapper.find(RepLogApp._selectors.newRepForm);
                $form[0].reset();
            }
        }, {
            key: '_addRow',
            value: function _addRow(repLog) {
                this.repLogs.add(repLog);
                // destructuring example
                // let {id, itemLabel, reps, totallyMadeUpKey = 'whatever!'} = repLog;
                // console.log(id, itemLabel, reps, totallyMadeUpKey);

                var html = rowTemplate(repLog);
                this.$wrapper.find('tbody').append($.parseHTML(html));

                this.updateTotalWeightLifted();
            }
        }], [{
            key: '_selectors',
            get: function get() {
                return {
                    newRepForm: '.js-new-rep-log-form'
                };
            }
        }]);

        return RepLogApp;
    }();

    /**
     * A "private" object
     */


    var Helper = function () {
        function Helper(repLogSet) {
            _classCallCheck(this, Helper);

            this.repLogSet = repLogSet;
        }

        _createClass(Helper, [{
            key: 'calculateTotalWeight',
            value: function calculateTotalWeight() {
                return Helper._calculateWeights(this.repLogSet);
            }
        }, {
            key: 'getTotalWeightString',
            value: function getTotalWeightString() {
                var maxWeight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

                var weight = this.calculateTotalWeight();

                if (weight > maxWeight) {
                    weight = maxWeight + '+';
                }

                return weight + ' lbs';
            }
        }], [{
            key: '_calculateWeights',
            value: function _calculateWeights(repLogSet) {
                var totalWeight = 0;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = repLogSet[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var repLog = _step4.value;

                        totalWeight += repLog.totalWeightLifted;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                return totalWeight;
            }
        }]);

        return Helper;
    }();

    var rowTemplate = function rowTemplate(repLog) {
        return '\n<tr data-weight="' + repLog.totalWeightLifted + '">\n    <td>' + repLog.itemLabel + '</td>\n    <td>' + repLog.reps + '</td>\n    <td>' + repLog.totalWeightLifted + '</td>\n    <td>\n        <a href="#"\n           class="js-delete-rep-log"\n           data-url="' + repLog.links._self + '"\n        >\n            <span class="fa fa-trash"></span>\n        </a>\n    </td>\n</tr>\n';
    };

    window.RepLogApp = RepLogApp;
})(window, jQuery, Routing, swal);
