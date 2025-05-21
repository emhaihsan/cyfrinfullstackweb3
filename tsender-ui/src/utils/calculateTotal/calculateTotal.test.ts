import { describe, it, expect } from "vitest"
import { calculateTotal, calculateTotalAsNumber } from "./calculateTotal"

describe("calculateTotal", () => {
    // Basic test: sum of valid numbers (BigInt)
    it("sums valid numbers separated by commas as BigInt", () => {
        expect(calculateTotal("100,200,300")).toBe(BigInt(600))
    })

    // Test: sum of valid numbers separated by newlines (BigInt)
    it("sums valid numbers separated by newlines as BigInt", () => {
        expect(calculateTotal("100\n200\n300")).toBe(BigInt(600))
    })

    // Test: combination of commas and newlines (BigInt)
    it("sums valid numbers separated by commas and newlines as BigInt", () => {
        expect(calculateTotal("100,200\n300,400\n500")).toBe(BigInt(1500))
    })

    // Test: ignores spaces between numbers (BigInt)
    it("ignores spaces between numbers as BigInt", () => {
        expect(calculateTotal(" 100 ,  200 , 300 ")).toBe(BigInt(600))
    })

    // Test: empty string input (BigInt)
    it("returns 0 for empty string as BigInt", () => {
        expect(calculateTotal("")).toBe(BigInt(0))
    })

    // Test: input with only spaces (BigInt)
    it("returns 0 for string with only spaces as BigInt", () => {
        expect(calculateTotal("     ")).toBe(BigInt(0))
    })

    // Test: all entries invalid (BigInt)
    it("returns 0 if all entries are invalid as BigInt", () => {
        expect(calculateTotal("abc,def,ghi")).toBe(BigInt(0))
    })

    // Test: ignores invalid entries and sums the rest (BigInt)
    it("ignores invalid entries and sums valid numbers as BigInt", () => {
        expect(calculateTotal("100,abc,300,xyz")).toBe(BigInt(400))
    })

    // Test: trailing comma (BigInt)
    it("ignores trailing comma as BigInt", () => {
        expect(calculateTotal("100,200,")).toBe(BigInt(300))
    })

    // Test: leading comma (BigInt)
    it("ignores leading comma as BigInt", () => {
        expect(calculateTotal(",100,200")).toBe(BigInt(300))
    })

    // Test: multiple consecutive commas (BigInt)
    it("ignores consecutive commas as BigInt", () => {
        expect(calculateTotal("100,,200,,,300")).toBe(BigInt(600))
    })

    // Test: negative numbers (BigInt)
    it("sums negative numbers as BigInt", () => {
        expect(calculateTotal("100,-50,200")).toBe(BigInt(250))
    })

    // Test: large numbers (BigInt)
    it("sums large numbers as BigInt", () => {
        expect(calculateTotal("1000000000000000000,2000000000000000000")).toBe(BigInt("3000000000000000000"))
    })

    // Test: input with mix of newlines, commas, spaces, and invalid entries (BigInt)
    it("handles mix of newlines, commas, spaces, and invalid entries as BigInt", () => {
        expect(calculateTotal("100, 200\nabc, 300\n, ,400,xyz")).toBe(BigInt(1000))
    })

    // Test: input with only one number (BigInt)
    it("returns the number itself if only one valid number as BigInt", () => {
        expect(calculateTotal("12345")).toBe(BigInt(12345))
    })

    // Test: input with zero (BigInt)
    it("sums zero correctly as BigInt", () => {
        expect(calculateTotal("0,0,0")).toBe(BigInt(0))
    })

    // Backward compatibility: number version

    // Test: sum of valid numbers (number)
    it("sums valid numbers as number", () => {
        expect(calculateTotalAsNumber("100,200,300")).toBe(600)
    })

    // Test: sum of valid numbers separated by newlines (number)
    it("sums valid numbers separated by newlines as number", () => {
        expect(calculateTotalAsNumber("100\n200\n300")).toBe(600)
    })

    // Test: combination of commas and newlines (number)
    it("sums valid numbers separated by commas and newlines as number", () => {
        expect(calculateTotalAsNumber("100,200\n300,400\n500")).toBe(1500)
    })

    // Test: ignores spaces between numbers (number)
    it("ignores spaces between numbers as number", () => {
        expect(calculateTotalAsNumber(" 100 ,  200 , 300 ")).toBe(600)
    })

    // Test: empty string input (number)
    it("returns 0 for empty string as number", () => {
        expect(calculateTotalAsNumber("")).toBe(0)
    })

    // Test: input with only spaces (number)
    it("returns 0 for string with only spaces as number", () => {
        expect(calculateTotalAsNumber("     ")).toBe(0)
    })

    // Test: all entries invalid (number)
    it("returns 0 if all entries are invalid as number", () => {
        expect(calculateTotalAsNumber("abc,def,ghi")).toBe(0)
    })

    // Test: ignores invalid entries and sums the rest (number)
    it("ignores invalid entries and sums valid numbers as number", () => {
        expect(calculateTotalAsNumber("100,abc,300,xyz")).toBe(400)
    })

    // Test: trailing comma (number)
    it("ignores trailing comma as number", () => {
        expect(calculateTotalAsNumber("100,200,")).toBe(300)
    })

    // Test: leading comma (number)
    it("ignores leading comma as number", () => {
        expect(calculateTotalAsNumber(",100,200")).toBe(300)
    })

    // Test: multiple consecutive commas (number)
    it("ignores consecutive commas as number", () => {
        expect(calculateTotalAsNumber("100,,200,,,300")).toBe(600)
    })

    // Test: negative numbers (number)
    it("sums negative numbers as number", () => {
        expect(calculateTotalAsNumber("100,-50,200")).toBe(250)
    })

    // Test: large numbers (number)
    it("sums large numbers as number", () => {
        expect(calculateTotalAsNumber("1000000000,2000000000")).toBe(3000000000)
    })

    // Test: input with mix of newlines, commas, spaces, and invalid entries (number)
    it("handles mix of newlines, commas, spaces, and invalid entries as number", () => {
        expect(calculateTotalAsNumber("100, 200\nabc, 300\n, ,400,xyz")).toBe(1000)
    })

    // Test: input with only one number (number)
    it("returns the number itself if only one valid number as number", () => {
        expect(calculateTotalAsNumber("12345")).toBe(12345)
    })

    // Test: input with zero (number)
    it("sums zero correctly as number", () => {
        expect(calculateTotalAsNumber("0,0,0")).toBe(0)
    })
})

// 10:52