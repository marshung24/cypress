// Car.js
export default class Car {
    constructor(brand) {
        this.brand = brand;
    }
    present() {
        return 'I have a ' + this.brand;
    }
}