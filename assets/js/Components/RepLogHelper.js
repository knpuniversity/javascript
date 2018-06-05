'use strict';

class Helper {
    constructor(repLogs) {
        this.repLogs = repLogs;
    }

    calculateTotalWeight() {
        return Helper._calculateWeights(
            this.repLogs
        );
    }

    getTotalWeightString(maxWeight = 500) {
        let weight = this.calculateTotalWeight();

        if (weight > maxWeight) {
            weight = maxWeight + '+';
        }

        return weight + ' lbs';
    }

    static _calculateWeights(repLogs) {
        let totalWeight = 0;
        for (let repLog of repLogs) {
            totalWeight += repLog.totalWeightLifted;
        }

        return totalWeight;
    }
}

export default Helper;
