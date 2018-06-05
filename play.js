
class AGreatClass {
    constructor(greatNumber) {
        this.greatNumber = greatNumber;
    }

    returnGreatThings() {
        return this.greatNumber;
    }
}

class AnotherGreatClass extends AGreatClass{
    constructor(greatNumber, greatWord) {
        super(greatNumber);

        this.greatWord = greatWord;
    }

    returnGreatThings() {
        let greatNumber = super.returnGreatThings();

        return [greatNumber, this.greatWord];
    }
}

const aGreatObject = new AnotherGreatClass(42, 'adventure');
console.log(
    aGreatObject.returnGreatThings()
);
