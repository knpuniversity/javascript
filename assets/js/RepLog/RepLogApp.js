import React, { Component } from 'react';

export default class RepLogApp extends Component {
    render() {
        let heart = '';
        if (this.props.withHeart) {
            heart = <span>❤️</span>;
        }

        return (
            <div className="col-md-7 js-rep-log-table">
                <h2>Lift Stuff! {heart}</h2>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>What</th>
                        <th>How many times?</th>
                        <th>Weight</th>
                        <th>&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>Total</th>
                        <th className="js-total-weight"></th>
                        <td>&nbsp;</td>
                    </tr>
                    </tfoot>
                </table>
            </div>

        );
    }
}
