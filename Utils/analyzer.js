import crypto from "crypto";

export function analyzeString(input) {
    const length = input.length;
    const is_palindrome = input.toLowerCase()=== input.split('').reverse().join('').toLowerCase();
    const unique_characters = new Set(input).size;
    const word_count = input.trim() === '' ? 0 : input.trim().split(/\s+/).length;
    const sha256_hash = crypto.createHash('sha256').update(input).digest('hex');

    const character_frequency_map = {};
  for (const char of input) {
    character_frequency_map[char] =
      (character_frequency_map[char] || 0) + 1;
  }
  
    return {
        length,
        is_palindrome,
        unique_characters,
        word_count,
        sha256_hash,
        character_frequency_map
    };

}