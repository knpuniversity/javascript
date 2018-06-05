
class AGreatClass {
    constructor(greatNumber) {
        this.greatNumber = greatNumber;
    }

    returnGreatThings() {
        return this.greatNumber;
    }
}

class AnotherGreatClass extends AGreatClass{
    returnGreatThings() {
        return 'adventure';
    }
}

const aGreatObject = new AnotherGreatClass(42);
console.log(
    aGreatObject.returnGreatThings()
);
