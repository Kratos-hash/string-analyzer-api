import assert from "assert";
import { analyzeString } from "../Utils/analyzer.js";

// Test 1: Basic string
const result1 = analyzeString("hello world");
console.log("Result 1:", result1);
assert.strictEqual(result1.length, 11);
assert.strictEqual(result1.is_palindrome, false);
assert.strictEqual(result1.word_count, 2);
assert.ok(result1.unique_characters > 5);
assert.strictEqual(typeof result1.sha256_hash, "string");
assert.ok(result1.sha256_hash.length === 64);

// Test 2: Palindrome
const result2 = analyzeString("madam");
console.log("Result 2:", result2);
assert.strictEqual(result2.is_palindrome, true);
assert.strictEqual(result2.character_frequency_map["m"], 2);

// Test 3: Empty string
const result3 = analyzeString("");
console.log("Result 3:", result3);
assert.strictEqual(result3.word_count, 0);
assert.strictEqual(result3.length, 0);

console.log("✅ All tests passed successfully!");

test("placeholder", () => {
  expect(true).toBe(true);
});

