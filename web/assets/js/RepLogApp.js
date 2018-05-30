(function(window, $) {
    window.RepLogApp = {
        initialize: function ($wrapper) {
            this.$wrapper = $wrapper;
            Helper.initialize(this.$wrapper);

            this.$wrapper.find('.js-delete-rep-log').on(
                'click',
                this.handleRepLogDelete.bind(this)
            );
            this.$wrapper.find('tbody tr').on(
                'click',
                this.handleRowClick.bind(this)
            );
        },
        updateTotalWeightLifted: function () {
            this.$wrapper.find('.js-total-weight').html(
                Helper.calculateTotalWeight()
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
                method: 'DELETE',
                success: function () {
                    $row.fadeOut('normal', function () {
                        $(this).remove();
                        self.updateTotalWeightLifted();
                    });
                }
            });
        },

        handleRowClick: function () {
            console.log('row clicked!');
        }
    };

    /**
     * A "private" object
     */
    var Helper = {
        initialize: function ($wrapper) {
            this.$wrapper = $wrapper;
        },

        calculateTotalWeight: function() {
            var totalWeight = 0;
            this.$wrapper.find('tbody tr').each(function () {
                totalWeight += $(this).data('weight');
            });

            return totalWeight;
        }
    };
})(window, jQuery);
