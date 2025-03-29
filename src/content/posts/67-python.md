---
title: "learning notes when explore boot.dev"
publishedAt: 2025-02-03
description: "python"
slug: "67-python"
isPublish: true
---

Complete the file_type_getter function. This function accepts a list of tuples, where each tuple contains:

1, "file type" (e.g. "code", "document", "image", etc)
2, list of associated file extensions (e.g. [".py", ".js"] or [".docx", ".doc"])

```py
def file_type_getter(file_type_tuples):
    ext_to_type = {}

    for file_type, extensions in file_type_tuples:
        for ext in extensions:
            ext_to_type[ext] = file_type

    return lambda ext: ext_to_type.get(ext, "Unknown")


file_types = [
    ("code", [".py", ".js"]),
    ("document", [".docx", ".doc"]),
    ("image", [".jpg", ".png"])
]

get_file_type = file_type_getter(file_types)

print(get_file_type(".py"))     # "code"
print(get_file_type(".doc"))    # "document"
print(get_file_type(".mp3"))    # "Unknown"


```
dict.get(key, default) is a safe way to access dictionary values. It returns:

The value for the given key if it exists.

The default value (or None if not provided) if the key is not found — without raising a KeyError.

#### What is map() ,fitler()  and zip() in Python?
The map() function applies a given function to each item in an iterable (like a list, tuple, etc.) and returns a map object (which is an iterator).

filter() is used to filter elements from an iterable based on a condition (a function that returns True or False).


```py
# map()
numbers = [1, 2, 3, 4, 5]
squared = map(lambda x: x ** 2, numbers)

print(list(squared))  # Output: [1, 4, 9, 16, 25]

# filter()
words = ["hello", "", "world", "", "python"]
non_empty = filter(None, words)

print(list(non_empty))  # Output: ['hello', 'world', 'python']

# None as the function treats values as booleans — empty strings, 0, None, etc. are considered False.

```
The result of map() and filter() is a object, which is a lazy iterator. This means it doesn't actually compute the results until you loop through it or convert it to a list or other iterable.

zip() combines multiple iterables (like lists or tuples) into tuples, pairing elements by position.Returns a zip object (an iterator of tuples). You’ll usually convert it to a list() or tuple() to see the result.It stops at the shortest iterable by default.
```py
# Example 1: Combine two lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]

combined = zip(names, ages)
print(list(combined))

keys = ['a', 'b', 'c']
values = [1, 2, 3]
d = dict(zip(keys, values))
print(d)  # {'a': 1, 'b': 2, 'c': 3}

# Output: [('Alice', 25), ('Bob', 30), ('Charlie', 35)]
# Example 2: Use in a loop
for name, age in zip(names, ages):
    print(f"{name} is {age} years old.")


```

#### What is an Iterator in Python?
An iterator is an object that lets you loop through a sequence of data — one item at a time — without needing to load the entire sequence into memory at once.
An object is an iterator if it implements two methods:

__iter__() – returns the iterator object itself.

__next__() – returns the next item in the sequence, and raises StopIteration when there are no more items.
```py
# When an iterable object is passed as an argument to the built-in function iter(), it returns an iterator for the object.
nums = [1, 2, 3]
it = iter(nums)  # Get iterator from the list

print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3
# print(next(it))  # Raises StopIteration

```
##### join()
join() glues strings together using a separator.

Only works with iterables of strings.
```py
# separator.join(iterable)

# separator: The string that will appear between each element (can be a space, comma, newline, etc.)

# iterable: A list (or tuple, or any iterable) of strings
words = ["Hello", "world", "from", "Python"]
sentence = " ".join(words)
print(sentence)
# Output: Hello world from Python

```
#### reduce()
reduce() takes a function and an iterable, and reduces it to a single value by applying the function cumulatively.

It's like saying: “Take the first two items, combine them. Then take that result and combine it with the next item, and so on…”
```py
from functools import reduce

nums = [1, 2, 3, 4, 5]
total = reduce(lambda x, y: x + y, nums)

print(total)  # Output: 15

# Use with initializer
nums = [1, 2, 3]
result = reduce(lambda x, y: x + y, nums, 10)

print(result)  # Output: 16


```