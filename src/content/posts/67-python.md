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

