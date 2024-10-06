import { describe, expect, it } from 'vitest'
import Cpf from '../src/domain/valueObject/Cpf.ts'

describe('Cpf', () => {
it.each([
	"97456321558",
	"71428793860",
	"87748248800"
])("Should test the cpf is valid %s", function (cpf: string) {
	expect(new Cpf(cpf)).toBeDefined();
});

it.each([
	"",
	null,
	undefined,
	"123456",
	"12345678901234567890",
	"11111111111"
])("Should test the cpf is invalid %s", function (cpf: any) {
	expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});
})