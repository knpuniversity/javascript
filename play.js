
class AGreatClass {
    constructor(greatNumber) {
        this.greatNumber = greatNumber;
    }

    returnGreatThings() {
        return this.greatNumber;
    }
}

class AnotherGreatClass extends AGreatClass{
    constructor(greatWord) {
        this.greatWord = greatWord;
    }

    returnGreatThings() {
        let greatNumber = super.returnGreatThings();

        return [greatNumber, this.greatWord];
    }
}

const aGreatObject = new AnotherGreatClass(42);
console.log(
    aGreatObject.returnGreatThings()
);
