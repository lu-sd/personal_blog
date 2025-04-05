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
✅ JavaScript:
Only arrays have .map(), .filter(), .reduce() methods.

Other iterables (like Set, Map, String, custom iterables) must be converted to an array first.

You often use Array.from() or [...iterable] to make it work.

```js
const set = new Set([1, 2, 3]);
[...set].map(x => x * 2); // ✅ Works
set.map(x => x * 2);      // ❌ Error: not a function
```
✅ Python:
Any iterable (lists, sets, tuples, generators, strings...) works directly with map(), filter(), reduce() (with caveats).

map() and filter() return iterators (in Python 3), so you often wrap them in list().

Python's map() and filter() are functions, not methods. You pass the iterable to them.


### sorted(iterable, key?=function, reverse?=True)
--works on any iterable, returns a new list.

The key parameter takes a function that is applied to each item in the iterable before sorting. The values returned by this function are what Python uses to compare the items.

```py
def sort_dates(dates):
    return sorted(dates, key=format_date)


def format_date(date):
    month, day, year = date.split("-")
    return year + month + day

```

### extend()
.extend() is a method that adds elements from an iterable to the end of a list.

Unlike .append(), which adds a single item, .extend() unpacks the iterable and adds each element individually.
```py
# example 1
a = [1, 2]
b = [3, 4]

a.append(b)
print(a)  # [1, 2, [3, 4]]  ← b is added as a single element

a = [1, 2]
a.extend(b)
print(a)  # [1, 2, 3, 4]    ← b is unpacked and added element by element

# example 2
a = [1, 2]
a.extend("hi")
print(a)  # [1, 2, 'h', 'i'] — because strings are iterables!

# common use cases:

# 1.merging lists:
result = []
for sublist in [[1, 2], [3], [4, 5]]:
    result.extend(sublist)
print(result)  # [1, 2, 3, 4, 5]

# 2.Recursively collecting results:
def list_files(parent_directory, current_filepath):
    file_paths = []
    
    for name, content in parent_directory.items():
        new_path = f"{current_filepath}/{name}"
        
        if content is None:
            # It's a file
            file_paths.append(new_path)
        else:
            # It's a directory: recursive call
            file_paths.extend(list_files(content, new_path))
    
    return file_paths

```
#### .flat() in js vs .entend() in python
.flat() returns a new array where nested arrays are flattened one level deep.
```js
const arr = [1, 2, [3, 4], [5, [6]]];
console.log(arr.flat());     
// [1, 2, 3, 4, 5, [6]]     (flattens one level)
// You can flatten deeper by passing a depth: arr.flat(2)
```
.extend() adds all elements of another iterable to the list, but does not recurse into deeper levels.
It’s more like JavaScript’s push(...items)

#### enumerate(iterable, start = 0)

numerate() adds a counter (index) to an iterable, returning it as an enumerate object which yields (index, value) pairs.
```py
# without enumerate(), need manual indexing
i = 0
for fruit in fruits:
    print(i, fruit)
    i += 1

for i, val in enumerate([10, 20, 30]):
    if val == 20:
        print("Found at index", i)  # Output: Found at index 1

# example 
def args_logger(*args, **kwargs):
    # Print numbered positional arguments
    for i, arg in enumerate(args, 1):
        print(f"{i}. {arg}")
    
    # Print keyword arguments with *
    for key, value in kwargs.items():
        print(f"* {key}: {value}")

```
In Python, *args and **kwargs allow a function to accept and deal with a variable number of arguments.

*args collects positional arguments into a tuple
**kwargs collects keyword (named) arguments into a dictionary

```py
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Calling:", func.__name__)
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def some_func:
```


### pass by value and reference
Most collection types are passed by reference (except for tuples) and most primitive types are passed by value.

### currying and decorators
```py
# How many lines contain the sequence "aa"? 
def lines_with_sequence(char):
    def with_char(length):
        sequence = char * length

        def with_length(doc):
            lines = doc.splitlines()
            count = 0
            for line in lines:
                if sequence in line:
                    count += 1
            return count
q
        return with_length

    return with_char

```
Python decorators are just another (sometimes simpler) way of writing a higher-order function. The *args and **kwargs syntax is great for decorators that are intended to work on functions with different signatures.
### Enum
Enum (short for enumeration) is a class in the enum module that allows you to define a set of named constant values. It makes your code more readable, self-documenting, and less error-prone by avoiding "magic numbers" or ambiguous strings.
```py
from enum import Enum

class Status(Enum):
    PENDING = 1
    PROCESSING = 2
    SUCCESS = 3
    FAILURE = 4

print(Status.PENDING.name)   # "PENDING"
print(Status.PENDING.value)  # 1

for s in Status:
    print(s.name, s.value)

```