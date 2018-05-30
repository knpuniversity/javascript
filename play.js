
class AGreatClass {
    constructor(greatNumber) {
        this.greatNumber = greatNumber;
    }

    returnGreatThings() {
        return this.greatNumber;
    }
}

const aGreatObject = new AGreatClass(42);
console.log(
    aGreatObject.returnGreatThings()
);
