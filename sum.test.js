const sum = require('./sum');

describe('Sum', () => {
    test('Should return positive number', () => {
        expect(sum(4, 5)).toBe(9);
    })

    test('Should return negative number', () => {
        expect(sum(-1, -2)).toBe(-3);
    })

    test('add 0 + 0 to equal 0', () => { 
        expect(sum(0, 0)).toBe(0);
     })
});