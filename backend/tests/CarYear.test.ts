import { describe, expect, it } from 'vitest'
import CarYear from '../src/domain/valueObject/CarYear.ts'
describe('CarYearly', () => {
    it('should return the car year vo when year is valid', () => {
        const sut = new CarYear('2024')
        expect(sut.getValue()).to.equal('2024')
    })
    it('should return error when year is not valid', () => {
        expect.assertions(1)
        expect(() => new CarYear('22')).toThrowError('Invalid car year')
    })
})