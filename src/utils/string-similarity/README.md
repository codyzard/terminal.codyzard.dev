# String Similarity Utilities

[English](#english) | [Tiếng Việt](#tiếng-việt)

---

## English

A collection of utilities for calculating string similarity using the Levenshtein distance algorithm. Perfect for implementing fuzzy search, autocorrect, and "did you mean?" features.

### Features

- **Levenshtein Distance** - Calculate edit distance between strings
- **Similarity Score** - Get normalized similarity score (0-1)
- **Fuzzy Matching** - Find similar strings from a list of candidates
- **TypeScript Support** - Full type safety
- **Zero Dependencies** - Pure JavaScript implementation

### Installation

The utility is already part of the project. Import it like this:

```typescript
import {
  levenshteinDistance,
  calculateSimilarity,
  findSimilarStrings,
} from '@/src/utils/string-similarity'
```

### API Reference

#### `levenshteinDistance(str1: string, str2: string): number`

Calculate the Levenshtein distance between two strings. Returns the minimum number of single-character edits (insertions, deletions, or substitutions) required to change one string into another.

**Parameters:**

- `str1` - First string
- `str2` - Second string

**Returns:** Number of edits required (0 means identical strings)

**Examples:**

```typescript
levenshteinDistance('kitten', 'sitting')
// Returns: 3
// Edits: k→s, e→i, +g

levenshteinDistance('hello', 'hello')
// Returns: 0 (identical)

levenshteinDistance('abc', 'def')
// Returns: 3 (completely different)
```

**Time Complexity:** O(m × n) where m and n are string lengths

---

#### `calculateSimilarity(str1: string, str2: string): number`

Calculate a normalized similarity score between two strings.

**Parameters:**

- `str1` - First string
- `str2` - Second string

**Returns:** Similarity score from 0 to 1

- `1.0` = Identical strings
- `0.8` = 80% similar
- `0.0` = Completely different

**Examples:**

```typescript
calculateSimilarity('hello', 'hello')
// Returns: 1.0 (100% identical)

calculateSimilarity('hello', 'hallo')
// Returns: 0.8 (80% similar - 1 character different out of 5)

calculateSimilarity('theme', 'themme')
// Returns: 0.83 (83% similar)

calculateSimilarity('abc', 'xyz')
// Returns: 0.0 (0% similar)
```

**Use Cases:**

- Fuzzy string matching
- Autocorrect suggestions
- Spell checking
- Search result ranking

---

#### `findSimilarStrings(input: string, candidates: string[], threshold?: number, maxSuggestions?: number): string[]`

Find the most similar strings from a list of candidates.

**Parameters:**

- `input` - The input string to match against
- `candidates` - List of candidate strings to search through
- `threshold` - Minimum similarity score (0-1) to be considered a match (default: 0.5)
- `maxSuggestions` - Maximum number of suggestions to return (default: 3)

**Returns:** Array of similar strings sorted by similarity (most similar first)

**Examples:**

```typescript
const commands = ['help', 'clear', 'theme', 'skills', 'matrix', 'audio']

// Basic usage
findSimilarStrings('hlp', commands)
// Returns: ['help']

findSimilarStrings('themme', commands)
// Returns: ['theme']

findSimilarStrings('cleear', commands)
// Returns: ['clear']

// No matches above threshold
findSimilarStrings('xyz', commands)
// Returns: []

// Custom threshold and max suggestions
findSimilarStrings('sk', commands, 0.3, 2)
// Returns: ['skills'] (with lower 30% threshold)

// Multiple suggestions
findSimilarStrings('mat', commands, 0.4, 3)
// Returns: ['matrix'] (sorted by similarity)
```

**Use Cases:**

- Command-line autocorrect
- Search suggestions
- Typo correction
- Command "did you mean?" features

---

### Usage Examples

#### Example 1: Command Autocorrect

```typescript
import {findSimilarStrings} from '@/src/utils/string-similarity'

const availableCommands = ['help', 'clear', 'theme', 'skills']

function executeCommand(input: string) {
  if (isValidCommand(input)) {
    return runCommand(input)
  }

  // Find similar commands
  const suggestions = findSimilarStrings(input, availableCommands)

  if (suggestions.length > 0) {
    console.log('Did you mean:', suggestions.join(', '))
  } else {
    console.log('Command not found')
  }
}
```

#### Example 2: Search with Fuzzy Matching

```typescript
import {calculateSimilarity} from '@/src/utils/string-similarity'

function fuzzySearch(query: string, items: string[], threshold = 0.6) {
  return items
    .map((item) => ({
      text: item,
      score: calculateSimilarity(query, item),
    }))
    .filter((result) => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
}

const products = ['iPhone', 'iPad', 'MacBook', 'AirPods']
fuzzySearch('ipone', products)
// Returns: [{ text: 'iPhone', score: 0.83 }]
```

#### Example 3: Spell Checker

```typescript
import {levenshteinDistance} from '@/src/utils/string-similarity'

function isTypo(word: string, dictionary: string[]): boolean {
  // Check if any word in dictionary is within 1-2 edits
  return dictionary.some((dictWord) => levenshteinDistance(word, dictWord) <= 2)
}
```

---

### Algorithm Details

The Levenshtein distance algorithm uses dynamic programming to efficiently calculate the minimum edit distance:

1. **Matrix Initialization**: Create a (m+1) × (n+1) matrix
2. **Base Cases**: Fill first row and column with indices
3. **Dynamic Programming**: For each cell, calculate minimum of:
   - Deletion: `dp[i-1][j] + 1`
   - Insertion: `dp[i][j-1] + 1`
   - Substitution: `dp[i-1][j-1] + (str1[i] !== str2[j] ? 1 : 0)`
4. **Result**: Bottom-right cell contains the minimum edit distance

**Space Complexity:** O(m × n)
**Time Complexity:** O(m × n)

---

### Performance Tips

1. **Case Sensitivity**: Functions automatically convert to lowercase for comparison
2. **Short Circuits**: Empty string comparisons are optimized
3. **Threshold Tuning**:
   - `0.8+` = Very similar (1-2 character difference)
   - `0.6-0.8` = Moderately similar (good for suggestions)
   - `0.4-0.6` = Loosely similar (use for broad matching)
   - `<0.4` = Different strings

---

## Tiếng Việt

Bộ công cụ tính độ tương đồng chuỗi sử dụng thuật toán khoảng cách Levenshtein. Hoàn hảo cho việc triển khai tìm kiếm mờ, tự động sửa lỗi, và tính năng "bạn có ý muốn nói".

### Tính năng

- **Khoảng cách Levenshtein** - Tính khoảng cách chỉnh sửa giữa các chuỗi
- **Điểm độ tương đồng** - Lấy điểm tương đồng chuẩn hóa (0-1)
- **Khớp mờ** - Tìm chuỗi tương tự từ danh sách ứng viên
- **Hỗ trợ TypeScript** - An toàn kiểu đầy đủ
- **Không phụ thuộc** - Triển khai JavaScript thuần túy

### Cài đặt

Tiện ích đã là một phần của dự án. Import như sau:

```typescript
import {
  levenshteinDistance,
  calculateSimilarity,
  findSimilarStrings,
} from '@/src/utils/string-similarity'
```

### Tài liệu API

#### `levenshteinDistance(str1: string, str2: string): number`

Tính khoảng cách Levenshtein giữa hai chuỗi. Trả về số lần chỉnh sửa ký tự đơn tối thiểu (thêm, xóa, hoặc thay thế) cần thiết để biến đổi một chuỗi thành chuỗi khác.

**Tham số:**

- `str1` - Chuỗi thứ nhất
- `str2` - Chuỗi thứ hai

**Trả về:** Số lần chỉnh sửa cần thiết (0 nghĩa là hai chuỗi giống nhau)

**Ví dụ:**

```typescript
levenshteinDistance('kitten', 'sitting')
// Trả về: 3
// Chỉnh sửa: k→s, e→i, +g

levenshteinDistance('hello', 'hello')
// Trả về: 0 (giống hệt)

levenshteinDistance('abc', 'def')
// Trả về: 3 (hoàn toàn khác nhau)
```

**Độ phức tạp thời gian:** O(m × n) với m và n là độ dài chuỗi

---

#### `calculateSimilarity(str1: string, str2: string): number`

Tính điểm độ tương đồng chuẩn hóa giữa hai chuỗi.

**Tham số:**

- `str1` - Chuỗi thứ nhất
- `str2` - Chuỗi thứ hai

**Trả về:** Điểm độ tương đồng từ 0 đến 1

- `1.0` = Chuỗi giống hệt
- `0.8` = 80% tương đồng
- `0.0` = Hoàn toàn khác nhau

**Ví dụ:**

```typescript
calculateSimilarity('hello', 'hello')
// Trả về: 1.0 (100% giống hệt)

calculateSimilarity('hello', 'hallo')
// Trả về: 0.8 (80% tương đồng - 1 ký tự khác trên tổng 5)

calculateSimilarity('theme', 'themme')
// Trả về: 0.83 (83% tương đồng)

calculateSimilarity('abc', 'xyz')
// Trả về: 0.0 (0% tương đồng)
```

**Trường hợp sử dụng:**

- Khớp chuỗi mờ
- Gợi ý tự động sửa lỗi
- Kiểm tra chính tả
- Xếp hạng kết quả tìm kiếm

---

#### `findSimilarStrings(input: string, candidates: string[], threshold?: number, maxSuggestions?: number): string[]`

Tìm các chuỗi tương đồng nhất từ danh sách ứng viên.

**Tham số:**

- `input` - Chuỗi đầu vào để so sánh
- `candidates` - Danh sách các chuỗi ứng viên để tìm kiếm
- `threshold` - Điểm độ tương đồng tối thiểu (0-1) để được coi là khớp (mặc định: 0.5)
- `maxSuggestions` - Số lượng gợi ý tối đa để trả về (mặc định: 3)

**Trả về:** Mảng các chuỗi tương đồng được sắp xếp theo độ tương đồng (tương đồng nhất trước)

**Ví dụ:**

```typescript
const commands = ['help', 'clear', 'theme', 'skills', 'matrix', 'audio']

// Sử dụng cơ bản
findSimilarStrings('hlp', commands)
// Trả về: ['help']

findSimilarStrings('themme', commands)
// Trả về: ['theme']

findSimilarStrings('cleear', commands)
// Trả về: ['clear']

// Không có kết quả nào vượt ngưỡng
findSimilarStrings('xyz', commands)
// Trả về: []

// Ngưỡng và số gợi ý tùy chỉnh
findSimilarStrings('sk', commands, 0.3, 2)
// Trả về: ['skills'] (với ngưỡng 30% thấp hơn)

// Nhiều gợi ý
findSimilarStrings('mat', commands, 0.4, 3)
// Trả về: ['matrix'] (sắp xếp theo độ tương đồng)
```

**Trường hợp sử dụng:**

- Tự động sửa lỗi dòng lệnh
- Gợi ý tìm kiếm
- Sửa lỗi chính tả
- Tính năng "bạn có ý muốn nói" cho lệnh

---

### Ví dụ sử dụng

#### Ví dụ 1: Tự động sửa lỗi lệnh

```typescript
import {findSimilarStrings} from '@/src/utils/string-similarity'

const availableCommands = ['help', 'clear', 'theme', 'skills']

function executeCommand(input: string) {
  if (isValidCommand(input)) {
    return runCommand(input)
  }

  // Tìm lệnh tương tự
  const suggestions = findSimilarStrings(input, availableCommands)

  if (suggestions.length > 0) {
    console.log('Bạn có ý muốn nói:', suggestions.join(', '))
  } else {
    console.log('Không tìm thấy lệnh')
  }
}
```

#### Ví dụ 2: Tìm kiếm với khớp mờ

```typescript
import {calculateSimilarity} from '@/src/utils/string-similarity'

function fuzzySearch(query: string, items: string[], threshold = 0.6) {
  return items
    .map((item) => ({
      text: item,
      score: calculateSimilarity(query, item),
    }))
    .filter((result) => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
}

const products = ['iPhone', 'iPad', 'MacBook', 'AirPods']
fuzzySearch('ipone', products)
// Trả về: [{ text: 'iPhone', score: 0.83 }]
```

#### Ví dụ 3: Kiểm tra chính tả

```typescript
import {levenshteinDistance} from '@/src/utils/string-similarity'

function isTypo(word: string, dictionary: string[]): boolean {
  // Kiểm tra nếu có từ nào trong từ điển trong vòng 1-2 chỉnh sửa
  return dictionary.some((dictWord) => levenshteinDistance(word, dictWord) <= 2)
}
```

---

### Chi tiết thuật toán

Thuật toán khoảng cách Levenshtein sử dụng quy hoạch động để tính hiệu quả khoảng cách chỉnh sửa tối thiểu:

1. **Khởi tạo ma trận**: Tạo ma trận (m+1) × (n+1)
2. **Trường hợp cơ sở**: Điền hàng và cột đầu tiên với chỉ số
3. **Quy hoạch động**: Với mỗi ô, tính giá trị nhỏ nhất của:
   - Xóa: `dp[i-1][j] + 1`
   - Thêm: `dp[i][j-1] + 1`
   - Thay thế: `dp[i-1][j-1] + (str1[i] !== str2[j] ? 1 : 0)`
4. **Kết quả**: Ô dưới cùng bên phải chứa khoảng cách chỉnh sửa tối thiểu

**Độ phức tạp không gian:** O(m × n)
**Độ phức tạp thời gian:** O(m × n)

---

### Mẹo hiệu suất

1. **Phân biệt hoa thường**: Các hàm tự động chuyển sang chữ thường để so sánh
2. **Tối ưu hóa**: So sánh chuỗi rỗng được tối ưu hóa
3. **Điều chỉnh ngưỡng**:
   - `0.8+` = Rất tương đồng (khác 1-2 ký tự)
   - `0.6-0.8` = Tương đồng vừa phải (tốt cho gợi ý)
   - `0.4-0.6` = Tương đồng lỏng lẻo (dùng cho khớp rộng)
   - `<0.4` = Chuỗi khác nhau
