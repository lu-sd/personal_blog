---
title: "Implement a class with a check contain method "
publishedAt: 2024-04-30
description: "use different ways"
slug: "38-worldChecker"
isPublish: true
---

To implement a class in JavaScript that takes an array as input and provides a method to check if any given word exists in that array, you can follow this basic structure:

Constructor - To initialize the class with an array.
Method - To check if a given word is present in the array.

```js
class WordChecker {
  constructor(words) {
    this.words = words;
  }

  // Check if the word exists in the array
  contains(word) {
    return this.words.includes(word);
  }
}

// Example usage:
const myWordList = new WordChecker(["cat", "dog", "apple"]);

console.log(myWordList.contains("dog")); // true
console.log(myWordList.contains("banana")); // false
```

If you want to make this class more flexible, for example, by allowing case-insensitive checks, you could modify the contains method as follows:

```js
class WordChecker {
  constructor(words) {
    // Convert all words in the array to lower case for case-insensitive comparison
    this.words = words.map((word) => word.toLowerCase());
  }

  // Check if the word exists in the array, case-insensitively
  contains(word) {
    return this.words.includes(word.toLowerCase());
  }
}
```

To extend the WordChecker class to handle wildcard patterns such as *at or c*t, where _ can represent any sequence of characters, you'll need to interpret these patterns using regular expressions. The _ wildcard in common pattern matching corresponds to .\* in regex, which matches any sequence of characters (including an empty sequence).

Here's how you can modify the WordChecker class to support such wildcard pattern checks:

Modify the contains Method: Instead of using includes(), you'll use regular expressions to match the patterns.
Pattern Conversion: Convert a pattern like *at to a regular expression like .*at.

```js
class WordChecker {
  constructor(words) {
    this.words = words;
  }

  // Check if any word in the array matches the given pattern
  contains(pattern) {
    // Replace '*' with '.*' to create a regex pattern
    const regex = new RegExp("^" + pattern.replaceAll("*", ".*") + "$");

    // Check each word against the regex
    return this.words.some((word) => regex.test(word));
  }
}

// Example usage:
const myWordList = new WordChecker([
  "cat",
  "bat",
  "rat",
  "mat",
  "combat",
  "flat",
]);

console.log(myWordList.contains("*at")); // true (matches 'cat', 'bat', 'rat', 'mat', 'flat')
console.log(myWordList.contains("c*t")); // true (matches 'cat', 'combat')
console.log(myWordList.contains("f*at")); // true (matches 'flat')
console.log(myWordList.contains("*ar")); // false
```

Detailed Explanation

Regular Expression Creation: The pattern.replaceAll('_', '._') replaces all instances of _ with ._, adapting the simple wildcard syntax to regex syntax. The ^ and $ are added to ensure the entire string matches the pattern from start to end, not just any part of it.

Regex Testing: The Array.prototype.some() method is used to test each word in the array against the created regex. The some() function returns true as soon as one element in the array satisfies the test implemented by the provided function, which in this case is a regex match.

check for patterns like *at or c*t without regular expressions and without extensive preprocessing like a trie, you can use a more straightforward approach with basic string operations. This method will rely on simpler checks and direct string manipulation, aiming to provide clarity and ease of implementation, though it may not be as efficient for large datasets or complex matching requirements.

```js
class WordChecker {
  constructor(words) {
    this.words = words;
  }

  contains(pattern) {
    // Handle exact matches quickly
    if (!pattern.includes("*")) {
      return this.words.includes(pattern);
    }

    // Process patterns with wildcards
    let splitParts = pattern.split("*");
    let start = splitParts[0];
    let end = splitParts[splitParts.length - 1];

    return this.words.some((word) => {
      // Check if the word starts with the first part of the pattern (if any)
      if (start && !word.startsWith(start)) {
        return false;
      }
      // Check if the word ends with the last part of the pattern (if any)
      if (end && !word.endsWith(end)) {
        return false;
      }
      return true;
    });
  }
}
```

To optimize the WordChecker class so that it does not use regular expressions for matching and offloads more computational work to the constructor, we can consider preprocessing the array elements in a way that makes the pattern checking more efficient during runtime. This approach involves restructuring the data for quicker lookups based on possible input patterns. A trie (prefix tree) is well-suited for this purpose, especially for matching patterns with wildcards efficiently.

Here's how you can modify the WordChecker class using a trie data structure:

Using a Trie for Pattern Matching

A trie can be built from the input array, where each node represents a character of a word. This structure allows for fast and efficient pattern matching, especially for operations that involve prefixes. For simplicity, here we will just preprocess the data into sets for direct matching and subsequent methods to handle wildcards effectively without regex.

Constructor: Preprocesses the words into a set for direct matches and a map for prefix-based matches (which will assist in handling wildcard patterns).

Contains Method: Implement logic to handle wildcards by leveraging the map and set created during the preprocessing stage.

```js
class WordChecker {
  constructor(words) {
    this.wordsSet = new Set(words);
    this.prefixMap = new Map();

    // Preprocess words to facilitate quick prefix searches
    for (let word of words) {
      for (let i = 1; i <= word.length; i++) {
        let prefix = word.substring(0, i);
        if (!this.prefixMap.has(prefix)) {
          this.prefixMap.set(prefix, new Set());
        }
        this.prefixMap.get(prefix).add(word);
      }
    }
  }

  contains(pattern) {
    // Direct check for exact matches
    if (!pattern.includes("*")) {
      return this.wordsSet.has(pattern);
    }

    // Split the pattern at '*' to get leading and trailing parts
    let parts = pattern.split("*");
    let prefix = parts[0];
    let suffix = parts.length > 1 ? parts[1] : "";

    // If there's no prefix, just a suffix (e.g., '*suffix')
    if (prefix === "" && suffix !== "") {
      for (let word of this.wordsSet) {
        if (word.endsWith(suffix)) {
          return true;
        }
      }
      return false;
    }

    // If there's a prefix but no suffix (e.g., 'prefix*')
    if (suffix === "") {
      return this.prefixMap.has(prefix);
    }

    // Handle cases with both prefix and suffix (e.g., 'prefix*suffix')
    if (this.prefixMap.has(prefix)) {
      let possibleMatches = this.prefixMap.get(prefix);
      for (let match of possibleMatches) {
        if (match.endsWith(suffix)) {
          return true;
        }
      }
    }

    return false;
  }
}
```
