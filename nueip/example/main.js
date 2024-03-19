// main.js - Example for workspaces
//
// Usage: 
//   import { func1, Car } from 'nueip/example/main.js';
//
//   func1();
// 
//   let car1 = new Car('TOYOTA');
//   car1.present();
export function func1() {
    cy.log('nueip.example.func1()');
}

export function func2() {
    cy.log('nueip.example.func2()');
}

export class Car {
    constructor(brand) {
        this.brand = brand;
    }
    present() {
        cy.log('I have a ' + this.brand);
    }
}