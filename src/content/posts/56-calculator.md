---
title: "calculator-227,224"
publishedat: 2024-08-25
description: "to calculate the result of a basic arithmetic expression represented as a string. It uses a stack to handle the operations and correctly respects operator precedence"
slug: "56-calculator"
ispublish: true
---

227:Given a string s which represents an expression, evaluate this expression and return its value. s consists of integers and operators ('+', '-', '\*', '/') separated by some number of spaces.

```js
function calculate(s: string): number {
  function isNum(s: string) {
    return !isNaN(+s);
  }

  let c = "";
  let sign = "+";
  let num = 0;
  const stack = [];
  s = s.replace(/\s+/g, "");

  for (let i = 0; i < s.length; i++) {
    c = s[i];

    if (isNum(c)) {
      num = num * 10 + +c;
    }

    if (i === s.length - 1 || !isNum(c)) {
      switch (sign) {
        case "+":
          stack.push(num);
          break;
        case "-":
          stack.push(-num);
          break;
        case "*":
          stack[stack.length - 1] *= num;
          break;
        case "/":
          stack[stack.length - 1] = Math.trunc(stack[stack.length - 1] / num);
          break;
      }
      sign = c;
      num = 0;
    }
  }
  return stack.reduce((arr, cur) => arr + cur, 0);
}
```

224:s consists of digits, '+', '-','\*'.'/', '(', ')', and ' '.

```js
function calculate(s: string): number {
    function isNum(s: string) {
        return !isNaN(+s);
    }

    function dfs(s: string, i: number): [number, number] {
        let c = '';
        let sign = "+";
        let num = 0;
        const stack = [];
        s = s.replace(/\s+/g, '');

        while (i < s.length) {
            c = s[i];

            if (isNum(c)) {
                num = num * 10 + (+c);
            }

            if (c === "(") {
                const [res, newIndex] = dfs(s, i + 1);
                num = res;
                i = newIndex; // Move the index forward
            }

            if (i === s.length - 1 || !isNum(c) && c !== "(" && c !== " ") {
                switch (sign) {
                    case "+":
                        stack.push(num);
                        break;
                    case "-":
                        stack.push(-num);
                        break;
                    case "*":
                        stack[stack.length - 1] *= num;
                        break;
                    case "/":
                        stack[stack.length - 1] = Math.trunc(stack[stack.length - 1] / num);
                        break;
                }
                sign = c;
                num = 0;
            }

            if (c === ")") {
                break; // Break out of the loop if a closing parenthesis is encountered
            }

            i++;
        }
        return [stack.reduce((arr, cur) => arr + cur, 0), i];
    }

    return dfs(s, 0)[0];
}
}

```
