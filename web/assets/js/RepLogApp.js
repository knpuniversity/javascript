'use strict';

(function(window, $, Routing) {
    window.RepLogApp = function ($wrapper) {
        this.$wrapper = $wrapper;
        this.helper = new Helper(this.$wrapper);

        this.loadRepLogs();

        this.$wrapper.on(
            'click',
            '.js-delete-rep-log',
            this.handleRepLogDelete.bind(this)
        );
        this.$wrapper.on(
            'click',
            'tbody tr',
            this.handleRowClick.bind(this)
        );
        this.$wrapper.on(
            'submit',
            this._selectors.newRepForm,
            this.handleNewFormSubmit.bind(this)
        );
    };

    $.extend(window.RepLogApp.prototype, {
        _selectors: {
            newRepForm: '.js-new-rep-log-form'
        },

        loadRepLogs: function() {
            var self = this;
            $.ajax({
                url: Routing.generate('rep_log_list'),
            }).then(function(data) {
                $.each(data.items, function(key, repLog) {
                    self._addRow(repLog);
                });
            })
        },

        updateTotalWeightLifted: function () {
            this.$wrapper.find('.js-total-weight').html(
                this.helper.calculateTotalWeight()
            );
        },

        handleRepLogDelete: function (e) {
            e.preventDefault();

            var $link = $(e.currentTarget);

            $link.addClass('text-danger');
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin');

            var deleteUrl = $link.data('url');
            var $row = $link.closest('tr');
            var self = this;
            $.ajax({
                url: deleteUrl,
                method: 'DELETE'
            }).then(function() {
                $row.fadeOut('normal', function () {
                    $(this).remove();
                    self.updateTotalWeightLifted();
                });
            })
        },

        handleRowClick: function () {
            console.log('row clicked!');
        },

        handleNewFormSubmit: function(e) {
            e.preventDefault();

            var $form = $(e.currentTarget);
            var formData = {};
            $.each($form.serializeArray(), function(key, fieldData) {
                formData[fieldData.name] = fieldData.value
            });
            var self = this;
            this._saveRepLog(formData)
            .then(function(data) {
                self._clearForm();
                self._addRow(data);
            }).catch(function(jqXHR) {
                if (typeof jqXHR.responseText === 'undefined') {
                    throw jqXHR;
                }
                var errorData = JSON.parse(jqXHR.responseText);
                self._mapErrorsToForm(errorData.errors);
            }).catch(function(e) {
                console.log(e);
            });
        },

        _saveRepLog: function(data) {
            return $.ajax({
                url: Routing.generate('rep_log_new'),
                method: 'POST',
                data: JSON.stringify(data)
            });
        },

        _mapErrorsToForm: function(errorData) {
            this._removeFormErrors();
            var $form = this.$wrapper.find(this._selectors.newRepForm);

            $form.find(':input').each(function() {
                var fieldName = $(this).attr('name');
                var $wrapper = $(this).closest('.form-group');
                if (!errorData[fieldName]) {
                    // no error!
                    return;
                }

                var $error = $('<span class="js-field-error help-block"></span>');
                $error.html(errorData[fieldName]);
                $wrapper.append($error);
                $wrapper.addClass('has-error');
            });
        },

        _removeFormErrors: function() {
            var $form = this.$wrapper.find(this._selectors.newRepForm);
            $form.find('.js-field-error').remove();
            $form.find('.form-group').removeClass('has-error');
        },

        _clearForm: function() {
            this._removeFormErrors();

            var $form = this.$wrapper.find(this._selectors.newRepForm);
            $form[0].reset();
        },

        _addRow: function(repLog) {
            var tplText = $('#js-rep-log-row-template').html();
            var tpl = _.template(tplText);

            var html = tpl(repLog);
            this.$wrapper.find('tbody').append($.parseHTML(html));

            this.updateTotalWeightLifted();
        }
    });

    /**
     * A "private" object
     */
    var Helper = function ($wrapper) {
        this.$wrapper = $wrapper;
    };
    $.extend(Helper.prototype, {
        calculateTotalWeight: function() {
            var totalWeight = 0;
            this.$wrapper.find('tbody tr').each(function () {
                totalWeight += $(this).data('weight');
            });

            return totalWeight;
        }
    });

})(window, jQuery, Routing);
