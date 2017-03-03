
class AGreatClass {
    constructor(greatNumber) {
        this.greatNumber = greatNumber;
    }

    returnGreatThings() {
        return this.greatNumber;
    }
}

class AnotherGreatClass extends AGreatClass{

}

const aGreatObject = new AnotherGreatClass(42);
console.log(
    aGreatObject.returnGreatThings()
);
