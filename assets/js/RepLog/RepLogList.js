import React, { Component } from 'react';

export default class RepLogList extends Component {
    render() {
        const { highlightedRowId, onRowClick } = this.props;

        const repLogs = [
            { id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5 },
            { id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180 },
            { id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72 }
        ];

        return (
            <tbody>
            {repLogs.map((repLog) => (
                <tr
                    key={repLog.id}
                    className={highlightedRowId === repLog.id ? 'info' : ''}
                    onClick={() =>  onRowClick(repLog.id)}
                >
                    <td>{repLog.itemLabel}</td>
                    <td>{repLog.reps}</td>
                    <td>{repLog.totalWeightLifted}</td>
                    <td>...</td>
                </tr>
            ))}
            </tbody>
        )
    }
}
