/**
 * String Similarity Utilities
 *
 * This module provides utilities for calculating string similarity using the Levenshtein distance algorithm.
 * Useful for fuzzy string matching, autocorrect, and "did you mean?" features.
 *
 * ---
 *
 * Tiện ích So sánh Chuỗi
 *
 * Module này cung cấp các tiện ích để tính độ tương đồng giữa các chuỗi sử dụng thuật toán khoảng cách Levenshtein.
 * Hữu ích cho tìm kiếm mờ, tự động sửa lỗi, và tính năng "bạn có ý muốn nói".
 */

/**
 * Calculate Levenshtein distance between two strings.
 * Returns the minimum number of single-character edits (insertions, deletions, or substitutions)
 * required to change one string into another.
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The Levenshtein distance (0 means identical strings)
 *
 * @example
 * ```ts
 * levenshteinDistance('kitten', 'sitting') // Returns 3
 * levenshteinDistance('hello', 'hello')   // Returns 0
 * levenshteinDistance('abc', 'def')       // Returns 3
 * ```
 *
 * ---
 *
 * Tính khoảng cách Levenshtein giữa hai chuỗi.
 * Trả về số lần chỉnh sửa ký tự đơn (thêm, xóa, hoặc thay thế) tối thiểu
 * cần thiết để biến đổi một chuỗi thành chuỗi khác.
 *
 * @param str1 - Chuỗi thứ nhất
 * @param str2 - Chuỗi thứ hai
 * @returns Khoảng cách Levenshtein (0 nghĩa là hai chuỗi giống nhau)
 *
 * @example
 * ```ts
 * levenshteinDistance('kitten', 'sitting') // Trả về 3
 * levenshteinDistance('hello', 'hello')   // Trả về 0
 * levenshteinDistance('abc', 'def')       // Trả về 3
 * ```
 */
export const levenshteinDistance = (str1: string, str2: string): number => {
  const m = str1.length
  const n = str2.length

  // Create a 2D array to store distances
  const dp: number[][] = Array.from({length: m + 1}, () => Array(n + 1).fill(0))

  // Initialize base cases
  for (let i = 0; i <= m; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j <= n; j++) {
    dp[0][j] = j
  }

  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1, // insertion
          dp[i - 1][j - 1] + 1, // substitution
        )
      }
    }
  }

  return dp[m][n]
}

/**
 * Calculate similarity score between two strings.
 * Returns a normalized score between 0 and 1, where:
 * - 1 means the strings are identical
 * - 0 means the strings are completely different
 *
 * @param str1 - First string
 * @param str2 - Second string
 * @returns Similarity score (0-1)
 *
 * @example
 * ```ts
 * calculateSimilarity('hello', 'hello')   // Returns 1.0 (identical)
 * calculateSimilarity('hello', 'hallo')   // Returns 0.8 (80% similar)
 * calculateSimilarity('abc', 'xyz')       // Returns 0.0 (completely different)
 * ```
 *
 * ---
 *
 * Tính điểm độ tương đồng giữa hai chuỗi.
 * Trả về điểm chuẩn hóa từ 0 đến 1, trong đó:
 * - 1 nghĩa là hai chuỗi giống hệt nhau
 * - 0 nghĩa là hai chuỗi hoàn toàn khác nhau
 *
 * @param str1 - Chuỗi thứ nhất
 * @param str2 - Chuỗi thứ hai
 * @returns Điểm độ tương đồng (0-1)
 *
 * @example
 * ```ts
 * calculateSimilarity('hello', 'hello')   // Trả về 1.0 (giống hệt)
 * calculateSimilarity('hello', 'hallo')   // Trả về 0.8 (80% tương đồng)
 * calculateSimilarity('abc', 'xyz')       // Trả về 0.0 (hoàn toàn khác nhau)
 * ```
 */
export const calculateSimilarity = (str1: string, str2: string): number => {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase())
  const maxLength = Math.max(str1.length, str2.length)
  return maxLength === 0 ? 1 : 1 - distance / maxLength
}

/**
 * Find the most similar strings from a list of candidates.
 * Uses Levenshtein distance to rank candidates by similarity and returns the top matches.
 *
 * @param input - The input string to match against
 * @param candidates - List of candidate strings to search through
 * @param threshold - Minimum similarity score (0-1) to be considered a match (default: 0.5)
 * @param maxSuggestions - Maximum number of suggestions to return (default: 3)
 * @returns Array of similar strings sorted by similarity (most similar first)
 *
 * @example
 * ```ts
 * const commands = ['help', 'clear', 'theme', 'skills']
 *
 * findSimilarStrings('hlp', commands)
 * // Returns ['help']
 *
 * findSimilarStrings('themme', commands)
 * // Returns ['theme']
 *
 * findSimilarStrings('xyz', commands)
 * // Returns [] (no matches above threshold)
 *
 * findSimilarStrings('sk', commands, 0.3, 2)
 * // Returns ['skills'] (with lower threshold)
 * ```
 *
 * ---
 *
 * Tìm các chuỗi tương đồng nhất từ danh sách ứng viên.
 * Sử dụng khoảng cách Levenshtein để xếp hạng các ứng viên theo độ tương đồng và trả về các kết quả phù hợp nhất.
 *
 * @param input - Chuỗi đầu vào để so sánh
 * @param candidates - Danh sách các chuỗi ứng viên để tìm kiếm
 * @param threshold - Điểm độ tương đồng tối thiểu (0-1) để được coi là khớp (mặc định: 0.5)
 * @param maxSuggestions - Số lượng gợi ý tối đa để trả về (mặc định: 3)
 * @returns Mảng các chuỗi tương đồng được sắp xếp theo độ tương đồng (tương đồng nhất trước)
 *
 * @example
 * ```ts
 * const commands = ['help', 'clear', 'theme', 'skills']
 *
 * findSimilarStrings('hlp', commands)
 * // Trả về ['help']
 *
 * findSimilarStrings('themme', commands)
 * // Trả về ['theme']
 *
 * findSimilarStrings('xyz', commands)
 * // Trả về [] (không có kết quả nào vượt ngưỡng)
 *
 * findSimilarStrings('sk', commands, 0.3, 2)
 * // Trả về ['skills'] (với ngưỡng thấp hơn)
 * ```
 */
export const findSimilarStrings = (
  input: string,
  candidates: string[],
  threshold = 0.5,
  maxSuggestions = 3,
): string[] => {
  const similarities = candidates
    .map((candidate) => ({
      text: candidate,
      score: calculateSimilarity(input, candidate),
    }))
    .filter((item) => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxSuggestions)

  return similarities.map((item) => item.text)
}
