from django.core.management.base import BaseCommand
from django.core.management.base import CommandError
from django.db import connection
from tutorials.models import Topic, Lesson, Quiz, Question


TOPICS = [

# ═══════════════════════════════════════════════════════
# 1. PYTHON BASICS
# ═══════════════════════════════════════════════════════
{
"title": "Python Basics", "slug": "python-basics", "color": "yellow",
"description": "Variables, data types, operators, and the foundations of Python",
"icon": "🐍", "order": 1,
"lessons": [
{
"title": "Variables & Data Types", "slug": "variables-data-types",
"difficulty": "beginner", "order": 1, "xp_reward": 10,
"content": '''# Variables & Data Types

Python is **dynamically typed** — you never declare a type, Python infers it.

## Core Types

```python
# Numbers
age     = 25          # int
price   = 9.99        # float
complex = 3 + 4j      # complex

# Text
name    = "Alice"     # str
multi   = """multi
line"""               # multi-line str

# Boolean
active  = True        # bool (True/False, capital!)
empty   = None        # NoneType

# Collections
fruits  = ["apple", "banana"]   # list — mutable, ordered
coords  = (10, 20)               # tuple — immutable
tags    = {"python", "code"}     # set — unique values
info    = {"name": "Alice"}      # dict — key-value pairs
```

## Type Checking & Conversion

```python
type(42)          # <class 'int'>
isinstance(42, int)  # True

int("42")         # 42    (str → int)
float("3.14")     # 3.14
str(100)          # "100"
list("abc")       # ['a', 'b', 'c']
bool(0)           # False (0, "", [], None are falsy)
```

## f-Strings (Python 3.6+)

```python
name = "Alice"
age  = 30
print(f"Hello, {name}! You are {age} years old.")
print(f"Next year: {age + 1}")
print(f"Upper: {name.upper()}")
```

> 💡 Python uses **snake_case** for variable names: `my_variable`, not `myVariable`.
''',
"code_example": """# Explore Python data types interactively

# Basic types
name    = "Alice"
age     = 30
score   = 98.5
active  = True
nothing = None

print("=== Basic Types ===")
variables = [("name", name), ("age", age), ("score", score), ("active", active), ("nothing", nothing)]
for var_name, value in variables:
    print(f"  {var_name:10} = {repr(value):15}  type={type(value).__name__}")

# Type conversion
print()
print("=== Type Conversion ===")
print(f"  int('42')    = {int('42')}")
print(f"  float('3.14')= {float('3.14')}")
print(f"  str(100)     = {repr(str(100))}")
print(f"  bool(0)      = {bool(0)}")
print(f"  bool('hi')   = {bool('hi')}")
print(f"  list('abc')  = {list('abc')}")

# f-strings
print()
print("=== f-Strings ===")
lang    = "Python"
version = 3.12
print(f"  {lang} {version} is amazing!")
print(f"  2 + 2 = {2 + 2}")
print(f"  Upper: {lang.upper()}")
print(f"  PI: {3.14159:.2f}")

# Truthiness
print()
print("=== Truthiness (falsy values) ===")
falsy = [0, 0.0, "", [], {}, None, False]
for v in falsy:
    print(f"  bool({repr(v):8}) = {bool(v)}")
""",
"quiz": {
    "title": "Variables & Data Types Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What is the type of `3.14` in Python?", "type": "mcq",
         "a": "int", "b": "float", "c": "str", "d": "decimal",
         "correct": "b", "explanation": "Decimal numbers like 3.14 are float in Python."},
        {"text": "Which of these is falsy in Python?", "type": "mcq",
         "a": "\"False\"", "b": "1", "c": "[]", "d": "[0]",
         "correct": "c", "explanation": "An empty list [] is falsy. The string 'False' is truthy!"},
        {"text": "What does `type('hello')` return?", "type": "mcq",
         "a": "string", "b": "<class 'str'>", "c": "str", "d": "text",
         "correct": "b", "explanation": "type() returns the class object, displayed as <class 'str'>."},
        {"text": "Python variable names use camelCase by convention.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "b", "explanation": "Python uses snake_case: my_variable, not myVariable."},
    ]
}
},
{
"title": "Strings & String Methods", "slug": "strings-methods",
"difficulty": "beginner", "order": 2, "xp_reward": 10,
"content": """# Strings & String Methods

Strings are **immutable sequences** of characters.

## Creation & Escaping

```python
s1 = 'single quotes'
s2 = "double quotes"
s3 = \"\"\"triple
quotes\"\"\"

# Escape sequences
tab    = "name\\tage"       # tab
newline= "line1\\nline2"    # newline
quote  = "He said \\"hi\\"" # escaped quote
raw    = r"C:\\Users\\Alice" # raw string (no escaping)
```

## Essential Methods

```python
s = "  Hello, World!  "

s.strip()          # "Hello, World!"   — remove whitespace
s.lower()          # "  hello, world!  "
s.upper()          # "  HELLO, WORLD!  "
s.replace("World", "Python")   # "  Hello, Python!  "
s.split(", ")      # ["  Hello", "World!  "]
", ".join(["a","b","c"])       # "a, b, c"
s.startswith("  Hello")        # True
s.endswith("!  ")              # True
s.count("l")       # 3
s.find("World")    # 9  (-1 if not found)
s.strip().center(20, "─")      # "───Hello, World!───"
```

## Slicing

```python
s = "Python"
s[0]      # 'P'    (first char)
s[-1]     # 'n'    (last char)
s[0:3]    # 'Pyt'  (slice)
s[::2]    # 'Pto'  (every 2nd)
s[::-1]   # 'nohtyP' (reverse)
```

## f-Strings Formatting

```python
pi = 3.14159
print(f"{pi:.2f}")        # 3.14
print(f"{1000000:,}")     # 1,000,000
print(f"{'hi':>10}")      # right-align
print(f"{'hi':<10}|")     # left-align
```
""",
"code_example": """s = "  Hello, Python World!  "

print("=== Core Methods ===")
print(f"  original:   {repr(s)}")
print(f"  strip():    {repr(s.strip())}")
print(f"  lower():    {s.lower().strip()}")
print(f"  upper():    {s.upper().strip()}")
print(f"  replace():  {s.strip().replace('World', 'Universe')}")
print(f"  split():    {s.strip().split()}")

print()
print("=== Slicing ===")
word = "Python"
print(f"  word        = {word}")
print(f"  word[0]     = {word[0]}")
print(f"  word[-1]    = {word[-1]}")
print(f"  word[0:3]   = {word[0:3]}")
print(f"  word[::-1]  = {word[::-1]}")
print(f"  word[::2]   = {word[::2]}")

print()
print("=== f-String Formatting ===")
pi   = 3.14159265
cash = 1234567.89
name = "Alice"
print(f"  pi:       {pi:.4f}")
print(f"  cash:     ${cash:,.2f}")
print(f"  padded:   |{'hi':^10}|  (centered)")
print(f"  padded:   |{name:<10}|  (left)")
print(f"  padded:   |{name:>10}|  (right)")

print()
print("=== Useful Checks ===")
tests = ["hello123", "HELLO", "12345", "  ", "Hello World"]
for t in tests:
    print(f"  {repr(t):20} isalpha={t.isalpha()} isdigit={t.isdigit()} isupper={t.isupper()}")
""",
"quiz": {
    "title": "Strings Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `'Python'[::-1]` return?", "type": "code",
         "code": "'Python'[::-1]",
         "a": "nohtyP", "b": "Python", "c": "Pyt", "d": "Error",
         "correct": "a", "explanation": "[::-1] reverses a string. 'Python' reversed is 'nohtyP'."},
        {"text": "Which method removes whitespace from both ends?", "type": "mcq",
         "a": "clean()", "b": "trim()", "c": "strip()", "d": "remove()",
         "correct": "c", "explanation": "strip() removes leading and trailing whitespace."},
        {"text": "What does `'a,b,c'.split(',')` return?", "type": "mcq",
         "a": "('a','b','c')", "b": "['a','b','c']", "c": "{'a','b','c'}", "d": "a b c",
         "correct": "b", "explanation": "split() returns a list of substrings."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 2. CONTROL FLOW
# ═══════════════════════════════════════════════════════
{
"title": "Control Flow", "slug": "control-flow", "color": "blue",
"description": "if/else, loops, comprehensions, and flow control",
"icon": "🔀", "order": 2,
"lessons": [
{
"title": "if / elif / else", "slug": "if-elif-else",
"difficulty": "beginner", "order": 1, "xp_reward": 10,
"content": """# if / elif / else

## Basic Syntax

```python
score = 85

if score >= 90:
    grade = 'A'
elif score >= 80:
    grade = 'B'
elif score >= 70:
    grade = 'C'
else:
    grade = 'F'

print(f"Grade: {grade}")   # Grade: B
```

## Comparison Operators

```python
x == y    # equal
x != y    # not equal
x > y     # greater than
x >= y    # greater than or equal
x < y     # less than
x <= y    # less than or equal
x is y    # same object (identity)
x is not y
x in [1,2,3]     # membership
x not in [1,2,3]
```

## Logical Operators

```python
if age >= 18 and has_id:       # both must be True
    print("Can enter")

if is_admin or is_moderator:   # at least one True
    print("Can moderate")

if not is_banned:              # negation
    print("Welcome")
```

## Ternary (One-line if)

```python
label = "adult" if age >= 18 else "minor"

# Nested (use sparingly)
rating = "A" if score >= 90 else "B" if score >= 80 else "C"
```

## match/case (Python 3.10+)

```python
command = "quit"

match command:
    case "start":  print("Starting...")
    case "stop":   print("Stopping...")
    case "quit":   print("Goodbye!")
    case _:        print("Unknown command")
```
""",
"code_example": """def classify_score(score):
    if score >= 90:   return "A", "Excellent!"
    elif score >= 80: return "B", "Great job!"
    elif score >= 70: return "C", "Good effort"
    elif score >= 60: return "D", "Needs work"
    else:             return "F", "Keep trying!"

print("=== Score Classifier ===")
for s in [95, 82, 73, 61, 45]:
    grade, msg = classify_score(s)
    print(f"  Score {s:3}: Grade {grade} — {msg}")

print()
print("=== Logical Operators ===")
def check_access(age, has_id, is_member):
    if age >= 18 and has_id:
        if is_member:
            return "VIP access"
        return "Standard access"
    return "Access denied"

users = [
    (21, True, True),
    (21, True, False),
    (17, True, True),
    (25, False, True),
]
for age, has_id, is_member in users:
    result = check_access(age, has_id, is_member)
    print(f"  age={age}, id={has_id}, member={is_member} -> {result}")

print()
print("=== Ternary Expressions ===")
for n in [-5, 0, 7, -2, 100]:
    sign  = "positive" if n > 0 else "negative" if n < 0 else "zero"
    even  = "even" if n % 2 == 0 else "odd"
    print(f"  {n:4} is {sign} and {even}")
""",
"quiz": {
    "title": "Control Flow Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `'adult' if 20 >= 18 else 'minor'` evaluate to?", "type": "code",
         "code": "'adult' if 20 >= 18 else 'minor'",
         "a": "minor", "b": "adult", "c": "True", "d": "Error",
         "correct": "b", "explanation": "20 >= 18 is True, so the ternary returns 'adult'."},
        {"text": "Which operator checks identity (same object)?", "type": "mcq",
         "a": "==", "b": "equals", "c": "is", "d": "===",
         "correct": "c", "explanation": "'is' checks object identity, '==' checks equality of value."},
    ]
}
},
{
"title": "Loops — for & while", "slug": "loops-for-while",
"difficulty": "beginner", "order": 2, "xp_reward": 10,
"content": """# Loops — for & while

## for Loop

```python
# Iterate over any iterable
for fruit in ["apple", "banana", "cherry"]:
    print(fruit)

# range()
for i in range(5):         # 0,1,2,3,4
    print(i)

for i in range(1, 10, 2):  # 1,3,5,7,9
    print(i)

# enumerate — index + value
for i, name in enumerate(["Alice","Bob","Carol"], start=1):
    print(f"{i}. {name}")

# zip — parallel iteration
names  = ["Alice", "Bob"]
scores = [90, 85]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

## while Loop

```python
count = 0
while count < 5:
    print(count)
    count += 1

# break and continue
for n in range(10):
    if n == 3: continue   # skip 3
    if n == 7: break      # stop at 7
    print(n)

# else on loop (runs if loop didn't break)
for n in range(5):
    if n == 10:
        break
else:
    print("Loop completed normally")
```

## List Comprehensions

```python
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]
matrix  = [[i*j for j in range(3)] for i in range(3)]
```
""",
"code_example": """print("=== for + range ===")
total = sum(i**2 for i in range(1, 6))
print(f"  Sum of squares 1-5: {total}")

print()
print("=== enumerate ===")
fruits = ["apple", "banana", "cherry", "date"]
for i, fruit in enumerate(fruits, 1):
    print(f"  {i}. {fruit}")

print()
print("=== zip ===")
names  = ["Alice", "Bob", "Carol", "Dave"]
scores = [92, 78, 88, 95]
for name, score in sorted(zip(names, scores), key=lambda x: -x[1]):
    bar = "█" * (score // 10)
    print(f"  {name:6}: {bar} {score}")

print()
print("=== while + break/continue ===")
n = 1
collatz = [n]
while n != 1:
    pass
n = 27
collatz = [n]
while n != 1:
    n = n // 2 if n % 2 == 0 else 3 * n + 1
    collatz.append(n)
print(f"  Collatz(27): {len(collatz)} steps, max={max(collatz)}")

print()
print("=== List Comprehensions ===")
squares = [x**2 for x in range(1, 11)]
evens   = [x for x in range(20) if x % 2 == 0]
words   = ["hello", "world", "python", "rocks"]
upper   = [w.upper() for w in words if len(w) > 4]
print(f"  squares: {squares}")
print(f"  evens:   {evens}")
print(f"  upper:   {upper}")
""",
"quiz": {
    "title": "Loops Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `list(range(2, 10, 3))` return?", "type": "code",
         "code": "list(range(2, 10, 3))",
         "a": "[2, 5, 8]", "b": "[2, 4, 6, 8]", "c": "[2, 3, 4]", "d": "[2, 5, 8, 11]",
         "correct": "a", "explanation": "range(2, 10, 3) starts at 2, steps by 3: 2, 5, 8."},
        {"text": "What does `[x**2 for x in range(4)]` produce?", "type": "code",
         "code": "[x**2 for x in range(4)]",
         "a": "[1, 4, 9, 16]", "b": "[0, 1, 4, 9]", "c": "[0, 1, 2, 3]", "d": "[1, 2, 3, 4]",
         "correct": "b", "explanation": "range(4) is 0,1,2,3. Squared: 0,1,4,9."},
        {"text": "The `else` block on a for loop runs only if the loop completed without a `break`.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "a", "explanation": "Correct — loop else runs when the loop finishes normally (no break)."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 3. FUNCTIONS
# ═══════════════════════════════════════════════════════
{
"title": "Functions", "slug": "functions", "color": "green",
"description": "Define functions, use *args/**kwargs, closures, and decorators",
"icon": "⚙️", "order": 3,
"lessons": [
{
"title": "Functions, Args & Kwargs", "slug": "functions-args-kwargs",
"difficulty": "beginner", "order": 1, "xp_reward": 15,
"content": """# Functions, Args & Kwargs

## Defining Functions

```python
def greet(name, greeting="Hello"):
    \"\"\"Docstring: what this function does.\"\"\"
    return f"{greeting}, {name}!"

greet("Alice")             # "Hello, Alice!"
greet("Bob", "Hi")         # "Hi, Bob!"
greet(greeting="Hey", name="Carol")  # keyword args
```

## *args — Variable Positional Arguments

```python
def total(*args):
    return sum(args)

total(1, 2, 3)        # 6
total(10, 20, 30, 40) # 100
```

## **kwargs — Variable Keyword Arguments

```python
def show_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

show_info(name="Alice", age=30, city="London")
```

## Combining All Parameter Types

```python
def func(pos, /, normal, *, kw_only, **kwargs):
    pass

# Order: positional-only / normal * keyword-only ** rest
def create_user(username, email, role="user", **extra):
    return {"username": username, "email": email, "role": role, **extra}
```

## Type Hints (Python 3.5+)

```python
def add(a: int, b: int) -> int:
    return a + b

def greet(name: str, times: int = 1) -> list[str]:
    return [f"Hello, {name}!"] * times
```

## Lambda Functions

```python
square = lambda x: x ** 2
add    = lambda x, y: x + y

# Common use in sorting
people = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
people.sort(key=lambda p: p["age"])
```
""",
"code_example": """from functools import reduce

# Basic functions with defaults
def bmi(weight_kg, height_m, unit="metric"):
    if unit == "imperial":
        weight_kg *= 0.453592
        height_m  *= 0.0254
    bmi_val = weight_kg / height_m**2
    cat = ("Underweight" if bmi_val < 18.5 else
           "Normal"      if bmi_val < 25   else
           "Overweight"  if bmi_val < 30   else "Obese")
    return round(bmi_val, 1), cat

print("=== Default Args ===")
for w, h in [(70, 1.75), (90, 1.80), (55, 1.60)]:
    val, cat = bmi(w, h)
    print(f"  {w}kg / {h}m -> BMI={val} ({cat})")

# *args
print()
print("=== *args ===")
def stats(*nums):
    return {"count": len(nums), "sum": sum(nums),
            "mean": round(sum(nums)/len(nums), 2),
            "min":  min(nums), "max": max(nums)}

result = stats(4, 7, 2, 9, 1, 5, 8, 3, 6)
for k, v in result.items():
    print(f"  {k}: {v}")

# **kwargs
print()
print("=== **kwargs ===")
def build_profile(name, **kwargs):
    profile = {"name": name}
    profile.update(kwargs)
    return profile

alice = build_profile("Alice", age=30, city="London", lang="Python", xp=1500)
for k, v in alice.items():
    print(f"  {k}: {v}")

# Lambda + sorted
print()
print("=== Lambda + sorted ===")
students = [
    {"name": "Bob",   "score": 78},
    {"name": "Alice", "score": 95},
    {"name": "Carol", "score": 88},
    {"name": "Dave",  "score": 72},
]
ranked = sorted(students, key=lambda s: s["score"], reverse=True)
for i, s in enumerate(ranked, 1):
    print(f"  {i}. {s['name']:6} — {s['score']}")
""",
"quiz": {
    "title": "Functions Quiz",
    "xp_reward": 25,
    "questions": [
        {"text": "What does `*args` collect into?", "type": "mcq",
         "a": "dict", "b": "set", "c": "tuple", "d": "list",
         "correct": "c", "explanation": "*args collects extra positional arguments into a tuple."},
        {"text": "What is the output of `(lambda x: x*2)(5)`?", "type": "code",
         "code": "(lambda x: x*2)(5)",
         "a": "25", "b": "10", "c": "5", "d": "Error",
         "correct": "b", "explanation": "The lambda doubles its input. 5*2=10."},
        {"text": "Type hints in Python enforce types at runtime.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "b", "explanation": "Type hints are just annotations. Python doesn't enforce them — use mypy for static checking."},
    ]
}
},
{
"title": "Decorators", "slug": "decorators",
"difficulty": "advanced", "order": 2, "xp_reward": 25,
"content": """# Decorators

A decorator is a function that **wraps another function** to add behaviour.

## The Concept

```python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Before
# Hello!
# After
```

## Practical Decorators

```python
import time
from functools import wraps

def timer(func):
    @wraps(func)      # preserves func.__name__
    def wrapper(*args, **kwargs):
        start  = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

def require_auth(func):
    @wraps(func)
    def wrapper(user, *args, **kwargs):
        if not user.get("authenticated"):
            raise PermissionError("Login required")
        return func(user, *args, **kwargs)
    return wrapper

@timer
@require_auth
def get_dashboard(user):
    return f"Dashboard for {user['name']}"
```

## Decorators with Arguments

```python
def repeat(n):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)
def wave():
    print("Hello!")

wave()  # Prints "Hello!" 3 times
```

## Built-in Decorators

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):           # access like attribute
        return 3.14 * self.radius ** 2

    @staticmethod
    def validate(r):          # no self, no cls
        return r > 0

    @classmethod
    def from_diameter(cls, d):  # cls instead of self
        return cls(d / 2)
```
""",
"code_example": """import time
from functools import wraps

# Timer decorator
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        t0     = time.perf_counter()
        result = func(*args, **kwargs)
        ms     = (time.perf_counter() - t0) * 1000
        print(f"  [{func.__name__}] {ms:.3f}ms")
        return result
    return wrapper

# Retry decorator
def retry(max_attempts=3, exceptions=(Exception,)):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"  Attempt {attempt} failed: {e}. Retrying...")
        return wrapper
    return decorator

# Cache decorator
def memoize(func):
    cache = {}
    @wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

# ─── Usage ───────────────────────────────────────────
print("=== Timer Decorator ===")

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1_000_000)
slow_sum(5_000_000)

print()
print("=== Memoize Decorator ===")

@memoize
@timer
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

for n in [10, 20, 30, 35]:
    print(f"  fib({n}) = {fibonacci(n)}")

print()
print("=== Retry Decorator ===")
attempt_count = [0]

@retry(max_attempts=3)
def flaky_api():
    attempt_count[0] += 1
    if attempt_count[0] < 3:
        raise ConnectionError(f"Timeout on attempt {attempt_count[0]}")
    return "API response: 200 OK"

result = flaky_api()
print(f"  Final result: {result}")

print()
print("=== @property Decorator ===")
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):    return self._celsius
    @property
    def fahrenheit(self): return self._celsius * 9/5 + 32
    @property
    def kelvin(self):     return self._celsius + 273.15

    @celsius.setter
    def celsius(self, value):
        if value < -273.15: raise ValueError("Below absolute zero!")
        self._celsius = value

for c in [0, 100, -40, 37]:
    t = Temperature(c)
    print(f"  {t.celsius:6}°C = {t.fahrenheit:7.1f}°F = {t.kelvin:.2f}K")
""",
"quiz": {
    "title": "Decorators Quiz",
    "xp_reward": 30,
    "questions": [
        {"text": "What does `@wraps(func)` do inside a decorator?", "type": "mcq",
         "a": "Speeds up the function", "b": "Copies __name__ and __doc__ from original func",
         "c": "Makes the function async", "d": "Caches the result",
         "correct": "b", "explanation": "@wraps preserves the original function's metadata like __name__ and __doc__."},
        {"text": "A decorator is just a function that takes a function and returns a function.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "a", "explanation": "Exactly! Decorators are higher-order functions."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 4. OBJECT-ORIENTED PROGRAMMING
# ═══════════════════════════════════════════════════════
{
"title": "Object-Oriented Python", "slug": "oop", "color": "purple",
"description": "Classes, inheritance, dunder methods, and OOP patterns",
"icon": "🏗️", "order": 4,
"lessons": [
{
"title": "Classes & Objects", "slug": "classes-objects",
"difficulty": "intermediate", "order": 1, "xp_reward": 20,
"content": """# Classes & Objects

## Defining a Class

```python
class BankAccount:
    interest_rate = 0.02    # Class attribute (shared)

    def __init__(self, owner, balance=0):
        self.owner   = owner      # Instance attributes
        self.balance = balance
        self._history = []        # _ = "private by convention"

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance   += amount
        self._history.append(f"+{amount}")
        return self

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("Insufficient funds")
        self.balance   -= amount
        self._history.append(f"-{amount}")
        return self

    def __str__(self):
        return f"Account({self.owner}: £{self.balance:,.2f})"

    def __repr__(self):
        return f"BankAccount(owner={self.owner!r}, balance={self.balance})"
```

## Dunder Methods

```python
def __len__(self):       # len(obj)
def __contains__(self, item):  # item in obj
def __eq__(self, other): # obj == other
def __lt__(self, other): # obj < other
def __add__(self, other): # obj + other
def __getitem__(self, key): # obj[key]
def __iter__(self):      # for x in obj
```

## Inheritance

```python
class SavingsAccount(BankAccount):
    def __init__(self, owner, balance=0):
        super().__init__(owner, balance)
        self.interest_rate = 0.05   # Override class attr

    def apply_interest(self):
        interest = self.balance * self.interest_rate
        self.deposit(interest)
        return interest
```
""",
"code_example": """class Vector:
    def __init__(self, x, y):
        self.x = x; self.y = y

    def __add__(self, other): return Vector(self.x + other.x, self.y + other.y)
    def __sub__(self, other): return Vector(self.x - other.x, self.y - other.y)
    def __mul__(self, scalar): return Vector(self.x * scalar, self.y * scalar)
    def __abs__(self):        return (self.x**2 + self.y**2)**0.5
    def __eq__(self, other):  return self.x == other.x and self.y == other.y
    def __repr__(self):       return f"Vector({self.x}, {self.y})"
    def dot(self, other):     return self.x*other.x + self.y*other.y

print("=== Vector Class with Dunder Methods ===")
v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(f"  v1       = {v1}")
print(f"  v2       = {v2}")
print(f"  v1 + v2  = {v1 + v2}")
print(f"  v1 - v2  = {v1 - v2}")
print(f"  v1 * 3   = {v1 * 3}")
print(f"  |v1|     = {abs(v1)}")
print(f"  v1.dot(v2) = {v1.dot(v2)}")

print()
print("=== Inheritance ===")
class Animal:
    def __init__(self, name, sound):
        self.name  = name
        self.sound = sound
    def speak(self):
        return f"{self.name} says {self.sound}!"

class Dog(Animal):
    def __init__(self, name):
        super().__init__(name, "Woof")
    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

class Cat(Animal):
    def __init__(self, name):
        super().__init__(name, "Meow")
    def purr(self):
        return f"{self.name} purrs..."

animals = [Dog("Rex"), Cat("Whiskers"), Dog("Buddy"), Cat("Luna")]
for a in animals:
    print(f"  {a.speak()}")
    if isinstance(a, Dog):
        print(f"  {a.fetch('ball')}")
""",
"quiz": {
    "title": "OOP Quiz",
    "xp_reward": 25,
    "questions": [
        {"text": "What does `super().__init__()` do?", "type": "mcq",
         "a": "Creates a new class", "b": "Calls the parent class __init__",
         "c": "Deletes the parent class", "d": "Returns the parent class",
         "correct": "b", "explanation": "super().__init__() calls the parent's __init__ to properly initialize inherited attributes."},
        {"text": "Which dunder method is called by `len(obj)`?", "type": "mcq",
         "a": "__size__", "b": "__count__", "c": "__length__", "d": "__len__",
         "correct": "d", "explanation": "Python calls obj.__len__() when you do len(obj)."},
        {"text": "A single underscore prefix `_attr` makes the attribute truly private.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "b", "explanation": "Single underscore is just convention for 'internal use'. Double underscore __ triggers name mangling."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 5. DATA STRUCTURES
# ═══════════════════════════════════════════════════════
{
"title": "Data Structures", "slug": "data-structures", "color": "orange",
"description": "Lists, dicts, sets, tuples, and collections module",
"icon": "📦", "order": 5,
"lessons": [
{
"title": "Lists & Tuples", "slug": "lists-tuples",
"difficulty": "beginner", "order": 1, "xp_reward": 10,
"content": """# Lists & Tuples

## Lists — Ordered, Mutable

```python
nums = [3, 1, 4, 1, 5, 9, 2, 6]

# Add / Remove
nums.append(7)          # add to end
nums.insert(0, 0)       # insert at index
nums.extend([10, 11])   # add multiple
nums.pop()              # remove last
nums.pop(0)             # remove at index
nums.remove(1)          # remove first occurrence
del nums[0:2]           # remove slice

# Search & Sort
nums.index(5)           # index of value
nums.count(1)           # how many times
nums.sort()             # in-place sort
sorted(nums)            # returns new sorted list
nums.sort(reverse=True) # descending
nums.reverse()          # in-place reverse
```

## List as Stack and Queue

```python
# Stack (LIFO)
stack = []
stack.append("a")   # push
stack.pop()         # pop

# Queue (FIFO) — use deque for efficiency
from collections import deque
queue = deque()
queue.append("a")   # enqueue
queue.popleft()     # dequeue
```

## Tuples — Ordered, Immutable

```python
point   = (3, 4)
rgb     = (255, 128, 0)
single  = (42,)       # note the comma!

# Unpacking
x, y     = point
r, g, b  = rgb
first, *rest = [1, 2, 3, 4, 5]   # extended unpacking

# Named tuple
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(3, 4)
p.x     # 3
```
""",
"code_example": """from collections import deque, namedtuple
import heapq

print("=== List Operations ===")
nums = [64, 34, 25, 12, 22, 11, 90]
print(f"  Original:   {nums}")
print(f"  sorted():   {sorted(nums)}")
print(f"  reversed:   {list(reversed(nums))}")
print(f"  min/max:    {min(nums)} / {max(nums)}")
print(f"  sum/avg:    {sum(nums)} / {sum(nums)/len(nums):.1f}")

print()
print("=== Stack (LIFO) ===")
stack = []
for op in ["push A", "push B", "push C", "pop", "push D", "pop"]:
    if op.startswith("push"):
        stack.append(op.split()[1])
        print(f"  {op:10} -> stack={stack}")
    else:
        item = stack.pop()
        print(f"  {op:10} -> popped={item}, stack={stack}")

print()
print("=== deque Queue (FIFO) ===")
q = deque()
for task in ["task1", "task2", "task3"]:
    q.append(task)
    print(f"  enqueue {task} -> {list(q)}")
while q:
    task = q.popleft()
    print(f"  dequeue -> {task}, remaining={list(q)}")

print()
print("=== Tuple Unpacking ===")
Point = namedtuple('Point', ['x', 'y', 'z'])
points = [Point(1,2,3), Point(4,5,6), Point(7,8,9)]
for p in points:
    dist = (p.x**2 + p.y**2 + p.z**2)**0.5
    print(f"  {p} distance={dist:.2f}")

first, *middle, last = [10, 20, 30, 40, 50]
print(f"  first={first}, middle={middle}, last={last}")
""",
"quiz": {
    "title": "Lists & Tuples Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `[1,2,3].pop(0)` return?", "type": "code",
         "code": "lst = [1,2,3]; lst.pop(0)",
         "a": "3", "b": "1", "c": "[2,3]", "d": "None",
         "correct": "b", "explanation": "pop(0) removes and returns the element at index 0, which is 1."},
        {"text": "How do you create a single-element tuple?", "type": "mcq",
         "a": "(42)", "b": "[42]", "c": "(42,)", "d": "tuple(42)",
         "correct": "c", "explanation": "(42) is just parentheses around an int. You need (42,) — the comma makes it a tuple."},
    ]
}
},
{
"title": "Dictionaries & Sets", "slug": "dicts-sets",
"difficulty": "intermediate", "order": 2, "xp_reward": 15,
"content": """# Dictionaries & Sets

## Dictionaries

```python
user = {"name": "Alice", "age": 30, "city": "London"}

# Access
user["name"]                   # 'Alice' — KeyError if missing
user.get("phone", "N/A")       # 'N/A' — safe access

# Modify
user["email"] = "a@x.com"      # add
user.update({"age": 31, "role": "admin"})
del user["city"]

# Iterate
for key in user:               # keys
for key, value in user.items():
for value in user.values():

# Useful methods
user.keys()    # dict_keys(...)
user.values()  # dict_values(...)
user.pop("age", None)           # remove, safe
"name" in user                  # True
user.setdefault("role", "user") # set only if missing
```

## Dict Comprehensions

```python
squares = {x: x**2 for x in range(10)}
upper   = {k: v.upper() for k, v in data.items() if v}
```

## Sets — Unique, Unordered

```python
tags = {"python", "code", "django", "python"}  # {'python', 'code', 'django'}

tags.add("flask")
tags.discard("code")        # remove, no error if missing
tags.remove("django")       # remove, KeyError if missing

# Set operations
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
a | b    # union:        {1,2,3,4,5,6}
a & b    # intersection: {3,4}
a - b    # difference:   {1,2}
a ^ b    # symmetric diff: {1,2,5,6}
```
""",
"code_example": """from collections import Counter, defaultdict

print("=== Dict Comprehensions ===")
words  = "the quick brown fox jumps over the lazy dog the fox".split()
freq   = {word: words.count(word) for word in set(words)}
sorted_freq = dict(sorted(freq.items(), key=lambda x: -x[1]))
for word, count in sorted_freq.items():
    bar = "█" * count
    print(f"  {word:6} {bar} {count}")

print()
print("=== Counter ===")
counter = Counter(words)
print(f"  Most common: {counter.most_common(3)}")
print(f"  'the' count: {counter['the']}")

print()
print("=== defaultdict ===")
graph = defaultdict(list)
edges = [("A","B"),("A","C"),("B","C"),("B","D"),("C","E")]
for u, v in edges:
    graph[u].append(v)
    graph[v].append(u)
for node, neighbors in sorted(graph.items()):
    print(f"  {node} -> {neighbors}")

print()
print("=== Set Operations ===")
python_devs = {"Alice", "Bob", "Carol", "Dave"}
django_devs = {"Bob", "Carol", "Eve", "Frank"}
print(f"  Python devs:      {sorted(python_devs)}")
print(f"  Django devs:      {sorted(django_devs)}")
print(f"  Both (AND):       {sorted(python_devs & django_devs)}")
print(f"  Either (OR):      {sorted(python_devs | django_devs)}")
print(f"  Python only:      {sorted(python_devs - django_devs)}")
print(f"  Exactly one:      {sorted(python_devs ^ django_devs)}")
""",
"quiz": {
    "title": "Dicts & Sets Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `{1,2,3} & {2,3,4}` return?", "type": "code",
         "code": "{1,2,3} & {2,3,4}",
         "a": "{1,2,3,4}", "b": "{2,3}", "c": "{1,4}", "d": "{1,2,3,2,3,4}",
         "correct": "b", "explanation": "& is intersection — elements in BOTH sets."},
        {"text": "What does `dict.get('missing', 'default')` return if key is missing?", "type": "mcq",
         "a": "None", "b": "KeyError", "c": "'default'", "d": "False",
         "correct": "c", "explanation": "get() returns the second argument as default when the key doesn't exist."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 6. ERROR HANDLING
# ═══════════════════════════════════════════════════════
{
"title": "Error Handling", "slug": "error-handling", "color": "red",
"description": "try/except, custom exceptions, and context managers",
"icon": "🛡️", "order": 6,
"lessons": [
{
"title": "Exceptions & Custom Errors", "slug": "exceptions",
"difficulty": "intermediate", "order": 1, "xp_reward": 20,
"content": """# Exceptions & Custom Errors

## try / except / else / finally

```python
try:
    result = 10 / int(input("Enter a number: "))
except ZeroDivisionError:
    print("Cannot divide by zero!")
except ValueError as e:
    print(f"Invalid input: {e}")
except (TypeError, AttributeError) as e:
    print(f"Type error: {e}")
else:
    print(f"Result: {result}")   # Runs if NO exception
finally:
    print("Always runs!")        # Cleanup code
```

## Common Built-in Exceptions

```python
ValueError       # Wrong value type/range
TypeError        # Wrong type
KeyError         # Dict key not found
IndexError       # List index out of range
AttributeError   # Object has no attribute
FileNotFoundError
PermissionError
ConnectionError
TimeoutError
RuntimeError
```

## Custom Exceptions

```python
class AppError(Exception):
    \"\"\"Base exception for this app.\"\"\"

class ValidationError(AppError):
    def __init__(self, field, message):
        self.field   = field
        self.message = message
        super().__init__(f"{field}: {message}")

class AuthError(AppError):
    pass

# Usage
try:
    raise ValidationError("email", "Invalid format")
except ValidationError as e:
    print(f"Field '{e.field}' failed: {e.message}")
```

## Context Managers (with)

```python
# File — auto-closes on exit
with open("file.txt", "r") as f:
    content = f.read()

# Custom context manager
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.perf_counter()
    yield
    print(f"Took {time.perf_counter()-start:.3f}s")

with timer():
    sum(range(1_000_000))
```
""",
"code_example": """import time
from contextlib import contextmanager

# Custom exception hierarchy
class AppError(Exception): pass

class ValidationError(AppError):
    def __init__(self, field, msg):
        self.field=field; self.msg=msg
        super().__init__(f"[{field}] {msg}")

class NotFoundError(AppError):
    def __init__(self, resource, id):
        super().__init__(f"{resource} #{id} not found")

class AuthError(AppError): pass

# Simulated DB
DB = {1: {"name":"Alice","email":"alice@x.com","age":30},
      2: {"name":"Bob",  "email":"bob@x.com",  "age":-5}}

def validate_user(data):
    import re
    if not data.get("name"): raise ValidationError("name","Required")
    if not re.match(r"[^@]+@[^@]+\\.[^@]+", data.get("email","")): raise ValidationError("email","Invalid format")
    if data.get("age",0) < 0: raise ValidationError("age","Must be non-negative")
    return True

def get_user(uid):
    if uid not in DB: raise NotFoundError("User", uid)
    return DB[uid]

print("=== Custom Exceptions ===")
test_ids = [1, 2, 3, 99]
for uid in test_ids:
    try:
        user = get_user(uid)
        validate_user(user)
        print(f"  User {uid}: OK — {user['name']}")
    except ValidationError as e:
        print(f"  User {uid}: Validation failed — {e}")
    except NotFoundError as e:
        print(f"  User {uid}: {e}")

print()
print("=== try/except/else/finally ===")
operations = [("10/2", lambda: 10/2), ("10/0", lambda: 10/0), ("int('x')", lambda: int('x'))]
for name, op in operations:
    try:
        result = op()
    except ZeroDivisionError:
        print(f"  {name:15} -> ZeroDivisionError")
    except ValueError as e:
        print(f"  {name:15} -> ValueError: {e}")
    else:
        print(f"  {name:15} -> {result}")
    finally:
        pass  # cleanup

print()
print("=== Context Manager ===")
@contextmanager
def tracked_operation(name):
    print(f"  Starting: {name}")
    t0 = time.perf_counter()
    try:
        yield
        ms = (time.perf_counter()-t0)*1000
        print(f"  Done:     {name} ({ms:.2f}ms)")
    except Exception as e:
        print(f"  Failed:   {name} — {e}")
        raise

with tracked_operation("sum 1M numbers"):
    result = sum(range(1_000_000))
    print(f"  Result: {result:,}")
""",
"quiz": {
    "title": "Error Handling Quiz",
    "xp_reward": 25,
    "questions": [
        {"text": "When does the `else` block run in try/except/else?", "type": "mcq",
         "a": "When an exception occurs", "b": "Always", "c": "When NO exception occurs", "d": "Never",
         "correct": "c", "explanation": "The else block only runs when the try block completed without raising any exception."},
        {"text": "The `finally` block always runs regardless of exceptions.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "a", "explanation": "finally always runs — it's used for cleanup (closing files, DB connections, etc.)."},
        {"text": "What exception is raised when a dict key doesn't exist?", "type": "mcq",
         "a": "IndexError", "b": "KeyError", "c": "ValueError", "d": "AttributeError",
         "correct": "b", "explanation": "KeyError is raised when accessing a dict key that doesn't exist."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 7. GENERATORS & ITERATORS
# ═══════════════════════════════════════════════════════
{
"title": "Generators & Iterators", "slug": "generators-iterators", "color": "teal",
"description": "yield, lazy evaluation, and memory-efficient iteration",
"icon": "🔄", "order": 7,
"lessons": [
{
"title": "Generators & yield", "slug": "generators-yield",
"difficulty": "advanced", "order": 1, "xp_reward": 25,
"content": """# Generators & yield

A **generator** produces values lazily — one at a time — instead of building a full list in memory.

## Generator Function

```python
def count_up(n):
    i = 0
    while i < n:
        yield i      # Pause here, return i
        i += 1       # Resume here on next()

gen = count_up(5)
next(gen)    # 0
next(gen)    # 1
list(gen)    # [2, 3, 4]
```

## Generator vs List

```python
# List — computes ALL values immediately (memory heavy)
squares_list = [x**2 for x in range(1_000_000)]  # ~8MB

# Generator — computes ONE at a time (memory efficient)
squares_gen  = (x**2 for x in range(1_000_000))  # ~200 bytes

import sys
sys.getsizeof(squares_list)   # 8056648
sys.getsizeof(squares_gen)    # 200
```

## Practical Generators

```python
def read_large_file(path, chunk_size=1024):
    with open(path, 'r') as f:
        while chunk := f.read(chunk_size):
            yield chunk

def fibonacci():
    a, b = 0, 1
    while True:        # Infinite generator!
        yield a
        a, b = b, a + b

def pipeline(data):
    # Chained generator pipeline
    cleaned  = (x.strip() for x in data)
    filtered = (x for x in cleaned if x)
    upper    = (x.upper() for x in filtered)
    return upper
```

## yield from

```python
def flatten(nested):
    for item in nested:
        if isinstance(item, list):
            yield from flatten(item)   # delegate to sub-generator
        else:
            yield item

list(flatten([1, [2, [3, 4]], 5]))   # [1, 2, 3, 4, 5]
```
""",
"code_example": """import sys
import time

# Fibonacci generator
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

print("=== Fibonacci Generator (infinite!) ===")
fib = fibonacci()
fibs = [next(fib) for _ in range(15)]
print(f"  First 15: {fibs}")

print()
print("=== Memory Comparison ===")
n = 100_000
lst  = [x**2 for x in range(n)]
gen  = (x**2 for x in range(n))
print(f"  List  ({n:,} items): {sys.getsizeof(lst):>10,} bytes")
print(f"  Gen   ({n:,} items): {sys.getsizeof(gen):>10,} bytes")
print(f"  Ratio: {sys.getsizeof(lst)/sys.getsizeof(gen):.0f}x more memory for list")

print()
print("=== Generator Pipeline ===")
raw_data = ["  Alice,30,London  ", "Bob,25,Paris", "  ,invalid,  ",
            "Carol,28,Tokyo", "", "Dave,35,NYC  "]

def parse_records(lines):
    for line in lines:
        line = line.strip()
        if not line: continue
        parts = line.split(",")
        if len(parts) != 3: continue
        name, age_str, city = [p.strip() for p in parts]
        if not name: continue
        try:
            yield {"name": name, "age": int(age_str), "city": city}
        except ValueError:
            continue

def filter_adults(records):
    return (r for r in records if r["age"] >= 18)

def format_record(records):
    return (f"{r['name']:8} age={r['age']} from {r['city']}" for r in records)

pipeline = format_record(filter_adults(parse_records(raw_data)))
print("  Processed records:")
for record in pipeline:
    print(f"    {record}")

print()
print("=== yield from (flatten) ===")
def flatten(nested):
    for item in nested:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)
        else:
            yield item

data = [1, [2, 3, [4, 5]], 6, [7, [8, [9]]]]
print(f"  nested: {data}")
print(f"  flat:   {list(flatten(data))}")
""",
"quiz": {
    "title": "Generators Quiz",
    "xp_reward": 30,
    "questions": [
        {"text": "What is the main advantage of generators over lists?", "type": "mcq",
         "a": "Faster computation", "b": "Memory efficiency (lazy evaluation)",
         "c": "Better type safety", "d": "Thread safety",
         "correct": "b", "explanation": "Generators produce values one at a time, using minimal memory vs storing everything in a list."},
        {"text": "What does `yield from` do?", "type": "mcq",
         "a": "Returns from a function", "b": "Delegates to a sub-generator",
         "c": "Creates a new generator", "d": "Yields a list",
         "correct": "b", "explanation": "yield from delegates iteration to another iterable/generator."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 8. FILE I/O
# ═══════════════════════════════════════════════════════
{
"title": "File I/O", "slug": "file-io", "color": "indigo",
"description": "Read/write files, JSON, CSV, and work with pathlib",
"icon": "📁", "order": 8,
"lessons": [
{
"title": "Files, JSON & CSV", "slug": "files-json-csv",
"difficulty": "intermediate", "order": 1, "xp_reward": 20,
"content": """# Files, JSON & CSV

## Reading & Writing Files

```python
# Read entire file
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()

# Read line by line (memory efficient)
with open("data.txt") as f:
    for line in f:
        print(line.strip())

# Read all lines into list
lines = open("data.txt").readlines()

# Write
with open("output.txt", "w") as f:
    f.write("Hello, World!\\n")
    f.writelines(["line1\\n", "line2\\n"])

# Append
with open("log.txt", "a") as f:
    f.write("New entry\\n")
```

## JSON

```python
import json

# Dict → JSON string
data   = {"name": "Alice", "scores": [95, 87, 92]}
text   = json.dumps(data, indent=2)

# JSON string → Dict
parsed = json.loads(text)

# File I/O
with open("data.json", "w") as f:
    json.dump(data, f, indent=2)

with open("data.json") as f:
    data = json.load(f)
```

## CSV

```python
import csv

# Read
with open("users.csv") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row["name"], row["age"])

# Write
fields = ["name", "age", "city"]
rows   = [["Alice", 30, "London"], ["Bob", 25, "Paris"]]
with open("output.csv", "w", newline="") as f:
    writer = csv.writer(f)
    writer.writerow(fields)
    writer.writerows(rows)
```

## pathlib (Modern File Paths)

```python
from pathlib import Path

p = Path("data") / "users" / "alice.json"
p.exists()          # True/False
p.suffix            # ".json"
p.stem              # "alice"
p.parent            # Path("data/users")
p.read_text()       # Read as string
p.write_text("hi")  # Write string
list(Path(".").glob("*.py"))   # Find all .py files
```
""",
"code_example": """import json
import csv
import io
from pathlib import PurePosixPath as Path

# JSON simulation
print("=== JSON ===")
user = {
    "id": 1,
    "name": "Alice",
    "skills": ["Python", "Django", "React"],
    "scores": {"python": 95, "django": 88, "react": 72},
    "active": True,
}

json_str = json.dumps(user, indent=2)
print(f"  Serialized ({len(json_str)} chars):")
for line in json_str.split("\\n")[:8]:
    print(f"    {line}")

parsed = json.loads(json_str)
print(f"  Parsed name: {parsed['name']}")
print(f"  Top skill:   {max(parsed['scores'], key=parsed['scores'].get)}")

# CSV simulation (in-memory)
print()
print("=== CSV ===")
data = [
    {"name":"Alice","lang":"Python","score":95,"years":5},
    {"name":"Bob","lang":"JavaScript","score":82,"years":3},
    {"name":"Carol","lang":"Python","score":91,"years":7},
    {"name":"Dave","lang":"Rust","score":78,"years":2},
]

buf = io.StringIO()
writer = csv.DictWriter(buf, fieldnames=["name","lang","score","years"])
writer.writeheader()
writer.writerows(data)
csv_content = buf.getvalue()
print("  CSV output:")
for line in csv_content.strip().split("\\n"):
    print(f"    {line}")

buf.seek(0)
reader = csv.DictReader(buf)
python_devs = [r for r in reader if r["lang"]=="Python"]
print(f"  Python devs: {[r['name'] for r in python_devs]}")

# pathlib
print()
print("=== pathlib ===")
paths = [
    "data/users/alice.json",
    "src/app/main.py",
    "docs/README.md",
    "tests/test_models.py",
]
for p_str in paths:
    p = Path(p_str)
    print(f"  {p_str}")
    print(f"    name={p.name}, stem={p.stem}, suffix={p.suffix}, parent={p.parent}")
""",
"quiz": {
    "title": "File I/O Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `json.dumps()` do?", "type": "mcq",
         "a": "Reads JSON from a file", "b": "Converts Python dict to JSON string",
         "c": "Writes JSON to a file", "d": "Parses JSON string to dict",
         "correct": "b", "explanation": "dumps = dump string. json.dumps() serializes Python objects to a JSON string."},
        {"text": "Which mode opens a file for appending?", "type": "mcq",
         "a": "r+", "b": "w", "c": "a", "d": "x",
         "correct": "c", "explanation": "'a' mode appends to existing content. 'w' would overwrite."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 9. CONCURRENCY
# ═══════════════════════════════════════════════════════
{
"title": "Concurrency & Async", "slug": "concurrency", "color": "cyan",
"description": "Threading, multiprocessing, asyncio and concurrent programming",
"icon": "⚡", "order": 9,
"lessons": [
{
"title": "asyncio & async/await", "slug": "asyncio-async-await",
"difficulty": "advanced", "order": 1, "xp_reward": 30,
"content": """# asyncio & async/await

asyncio lets Python do multiple I/O operations **concurrently** without threads.

## The Basics

```python
import asyncio

async def fetch_user(id):
    await asyncio.sleep(1)   # simulate network call
    return {"id": id, "name": f"User {id}"}

async def main():
    user = await fetch_user(1)
    print(user)

asyncio.run(main())
```

## Concurrent Execution

```python
# Sequential — takes 3 seconds total
async def slow():
    u1 = await fetch_user(1)   # wait 1s
    u2 = await fetch_user(2)   # wait 1s
    u3 = await fetch_user(3)   # wait 1s

# Concurrent — takes ~1 second total
async def fast():
    u1, u2, u3 = await asyncio.gather(
        fetch_user(1),
        fetch_user(2),
        fetch_user(3),
    )
```

## async with & async for

```python
async with aiohttp.ClientSession() as session:
    async with session.get(url) as response:
        data = await response.json()

async for chunk in stream:
    process(chunk)
```

## When to Use What

| Problem | Solution |
|---------|----------|
| Many I/O tasks (API calls, DB) | **asyncio** |
| CPU-heavy tasks (data processing) | **multiprocessing** |
| Simple parallelism | **threading** |

> 💡 asyncio is not truly parallel — it's **cooperative multitasking** on one thread.
""",
"code_example": """import asyncio
import time
import random

# Simulate async API calls
async def fetch_data(endpoint, delay=None):
    delay = delay or random.uniform(0.1, 0.5)
    await asyncio.sleep(delay)
    return {"endpoint": endpoint, "status": 200, "delay_ms": round(delay*1000)}

async def sequential_fetch(endpoints):
    results = []
    start = time.perf_counter()
    for ep in endpoints:
        result = await fetch_data(ep)
        results.append(result)
    elapsed = time.perf_counter() - start
    return results, elapsed

async def concurrent_fetch(endpoints):
    start   = time.perf_counter()
    results = await asyncio.gather(*[fetch_data(ep) for ep in endpoints])
    elapsed = time.perf_counter() - start
    return list(results), elapsed

async def main():
    endpoints = ["/users", "/posts", "/comments", "/topics", "/lessons", "/quiz"]

    print("=== Sequential (one at a time) ===")
    results, elapsed = await sequential_fetch(endpoints)
    for r in results:
        print(f"  {r['endpoint']:12} {r['delay_ms']}ms")
    print(f"  Total: {elapsed:.3f}s")

    print()
    print("=== Concurrent (gather) ===")
    results, elapsed = await concurrent_fetch(endpoints)
    for r in results:
        print(f"  {r['endpoint']:12} {r['delay_ms']}ms")
    print(f"  Total: {elapsed:.3f}s")
    print(f"  Speedup: ~{len(endpoints)}x faster with gather!")

    print()
    print("=== asyncio.wait_for (timeout) ===")
    try:
        result = await asyncio.wait_for(fetch_data("/slow", delay=2.0), timeout=0.5)
        print(f"  Got: {result}")
    except asyncio.TimeoutError:
        print("  Request timed out after 0.5s!")

asyncio.run(main())
""",
"quiz": {
    "title": "Async/Await Quiz",
    "xp_reward": 30,
    "questions": [
        {"text": "What does `await asyncio.gather(t1, t2, t3)` do?", "type": "mcq",
         "a": "Runs tasks sequentially", "b": "Runs all tasks concurrently and waits for all",
         "c": "Runs only the fastest task", "d": "Creates threads for each task",
         "correct": "b", "explanation": "gather() runs all coroutines concurrently and returns all results when all complete."},
        {"text": "asyncio uses multiple CPU cores for true parallelism.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "b", "explanation": "asyncio runs on a single thread. For CPU parallelism, use multiprocessing."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 10. TESTING
# ═══════════════════════════════════════════════════════
{
"title": "Testing", "slug": "testing", "color": "emerald",
"description": "unittest, pytest, mocking, and test-driven development",
"icon": "🧪", "order": 10,
"lessons": [
{
"title": "pytest & unittest", "slug": "pytest-unittest",
"difficulty": "intermediate", "order": 1, "xp_reward": 20,
"content": """# pytest & unittest

## unittest (built-in)

```python
import unittest

class TestMath(unittest.TestCase):
    def setUp(self):       # Runs before each test
        self.calc = Calculator()

    def tearDown(self):    # Runs after each test
        pass

    def test_add(self):
        self.assertEqual(self.calc.add(2, 3), 5)

    def test_divide_by_zero(self):
        with self.assertRaises(ZeroDivisionError):
            self.calc.divide(10, 0)

    def test_negative(self):
        self.assertLess(self.calc.add(-5, -3), 0)

if __name__ == '__main__':
    unittest.main()
```

## pytest (recommended)

```python
# test_math.py
import pytest

def test_add():
    assert add(2, 3) == 5

def test_divide_by_zero():
    with pytest.raises(ZeroDivisionError):
        divide(10, 0)

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, -50, 50),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected
```

## Mocking

```python
from unittest.mock import patch, MagicMock

def test_send_email():
    with patch('myapp.send_email') as mock_send:
        register_user("alice@x.com")
        mock_send.assert_called_once_with("alice@x.com", subject="Welcome!")
```

## Running Tests

```bash
pytest                          # all tests
pytest tests/test_models.py     # specific file
pytest -v                       # verbose
pytest -k "test_add"            # filter by name
pytest --cov=myapp              # coverage report
```
""",
"code_example": """# Full test suite simulation

class AssertError(Exception): pass

class TestCase:
    _passed = 0; _failed = 0
    def assertEqual(self,a,b,m=None):
        if a!=b: raise AssertError(m or f"Expected {repr(a)}=={repr(b)}")
    def assertNotEqual(self,a,b):
        if a==b: raise AssertError(f"Expected {repr(a)}!={repr(b)}")
    def assertTrue(self,v,m=None):
        if not v: raise AssertError(m or f"Expected truthy, got {repr(v)}")
    def assertFalse(self,v):
        if v: raise AssertError(f"Expected falsy, got {repr(v)}")
    def assertRaises(self, exc_type, fn, *args):
        try: fn(*args); raise AssertError(f"{exc_type.__name__} not raised")
        except exc_type: pass
    def assertIn(self,item,container):
        if item not in container: raise AssertError(f"{repr(item)} not in collection")

# Code under test
class Stack:
    def __init__(self):         self._items=[]
    def push(self, item):       self._items.append(item); return self
    def pop(self):
        if not self._items: raise IndexError("Stack is empty")
        return self._items.pop()
    def peek(self):
        if not self._items: raise IndexError("Stack is empty")
        return self._items[-1]
    def is_empty(self):         return len(self._items)==0
    def __len__(self):          return len(self._items)
    def __repr__(self):         return f"Stack({self._items})"

# Tests
class TestStack(TestCase):
    def test_push_pop(self):
        s=Stack(); s.push(1).push(2).push(3)
        self.assertEqual(s.pop(),3)
        self.assertEqual(s.pop(),2)

    def test_empty_pop_raises(self):
        self.assertRaises(IndexError, Stack().pop)

    def test_is_empty(self):
        s=Stack()
        self.assertTrue(s.is_empty())
        s.push("x")
        self.assertFalse(s.is_empty())

    def test_len(self):
        s=Stack()
        for i in range(5): s.push(i)
        self.assertEqual(len(s),5)

    def test_peek_no_pop(self):
        s=Stack(); s.push(42)
        self.assertEqual(s.peek(),42)
        self.assertEqual(len(s),1)

    def test_chaining(self):
        s=Stack()
        s.push("a").push("b").push("c")
        self.assertEqual(len(s),3)

def run_tests(cls):
    passed=failed=0
    methods=[n for n in dir(cls) if n.startswith("test_")]
    for name in sorted(methods):
        inst=cls()
        try:
            getattr(inst,name)()
            print(f"  PASS  {name}"); passed+=1
        except AssertError as e:
            print(f"  FAIL  {name}: {e}"); failed+=1
        except Exception as e:
            print(f"  ERROR {name}: {e}"); failed+=1
    total=passed+failed
    print(f"\\n  {passed}/{total} tests passed ({round(passed/total*100)}%)")

print("=== Running TestStack ===")
run_tests(TestStack)
""",
"quiz": {
    "title": "Testing Quiz",
    "xp_reward": 25,
    "questions": [
        {"text": "What does `setUp()` do in unittest.TestCase?", "type": "mcq",
         "a": "Runs once before all tests", "b": "Runs before each individual test",
         "c": "Configures the test runner", "d": "Runs after all tests",
         "correct": "b", "explanation": "setUp() runs before EACH test method, not just once. Use setUpClass for once-only setup."},
        {"text": "What does `@pytest.mark.parametrize` allow?", "type": "mcq",
         "a": "Skip a test", "b": "Run the same test with multiple inputs",
         "c": "Mark a test as slow", "d": "Mock a function",
         "correct": "b", "explanation": "parametrize runs the same test function with different arguments automatically."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 11. STANDARD LIBRARY
# ═══════════════════════════════════════════════════════
{
"title": "Standard Library", "slug": "standard-library", "color": "violet",
"description": "datetime, collections, itertools, re, and other built-in modules",
"icon": "📚", "order": 11,
"lessons": [
{
"title": "datetime, collections & itertools", "slug": "datetime-collections-itertools",
"difficulty": "intermediate", "order": 1, "xp_reward": 20,
"content": """# datetime, collections & itertools

## datetime

```python
from datetime import datetime, date, timedelta

now   = datetime.now()
today = date.today()

# Formatting
now.strftime("%Y-%m-%d %H:%M")    # "2024-01-15 14:30"
datetime.strptime("2024-01-15", "%Y-%m-%d")

# Arithmetic
tomorrow  = today + timedelta(days=1)
last_week = now   - timedelta(weeks=1)
diff      = date(2025, 1, 1) - today
print(f"{diff.days} days until 2025")
```

## collections

```python
from collections import Counter, defaultdict, deque, OrderedDict, namedtuple

# Counter
Counter("hello world")             # {'l':3, 'o':2, ...}
Counter([1,2,2,3,3,3]).most_common(2)  # [(3,3),(2,2)]

# defaultdict
graph = defaultdict(list)          # never KeyError

# deque — fast append/pop from both ends
d = deque([1,2,3], maxlen=5)
d.appendleft(0)                    # prepend
d.rotate(1)                        # rotate right

# namedtuple
Point = namedtuple('Point', ['x','y'])
p = Point(3, 4); p.x; p.y
```

## itertools

```python
from itertools import chain, islice, product, combinations, permutations, groupby

list(chain([1,2], [3,4], [5]))    # [1,2,3,4,5]
list(islice(range(1000), 5))      # [0,1,2,3,4]
list(product("AB", repeat=2))     # [('A','A'),('A','B'),('B','A'),('B','B')]
list(combinations("ABC", 2))      # [('A','B'),('A','C'),('B','C')]

# groupby
data = sorted([{"type":"a"},{"type":"b"},{"type":"a"}], key=lambda x:x["type"])
for key, group in groupby(data, key=lambda x:x["type"]):
    print(key, list(group))
```
""",
"code_example": """from datetime import datetime, date, timedelta
from collections import Counter, defaultdict, deque
from itertools import groupby, chain, combinations

print("=== datetime ===")
now   = datetime.now()
today = date.today()
events = [
    ("Python release",  date(1991, 2, 20)),
    ("Django release",  date(2005, 7, 21)),
    ("Python 3.0",      date(2008, 12, 3)),
]
for name, d in events:
    age = (today - d).days
    print(f"  {name:20} {d}  ({age//365} years ago)")

print()
print("=== Counter ===")
code = "python is awesome and python is powerful"
words    = code.split()
word_freq = Counter(words)
print(f"  Most common: {word_freq.most_common(3)}")
print(f"  'python':    {word_freq['python']}")
print(f"  Total words: {sum(word_freq.values())}")
print(f"  Unique:      {len(word_freq)}")

print()
print("=== defaultdict (graph) ===")
edges = [("A","B"),("A","C"),("B","C"),("B","D"),("C","E"),("D","E")]
graph = defaultdict(set)
for u,v in edges:
    graph[u].add(v); graph[v].add(u)

def bfs(start):
    visited = {start}
    queue   = deque([start])
    order   = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in sorted(graph[node] - visited):
            visited.add(neighbor); queue.append(neighbor)
    return order

print(f"  BFS from A: {bfs('A')}")

print()
print("=== itertools.combinations ===")
team = ["Alice","Bob","Carol","Dave"]
pairs = list(combinations(team, 2))
print(f"  Possible pairs from {len(team)}: {len(pairs)}")
for pair in pairs:
    print(f"    {pair[0]} & {pair[1]}")
""",
"quiz": {
    "title": "Standard Library Quiz",
    "xp_reward": 20,
    "questions": [
        {"text": "What does `Counter('hello').most_common(1)` return?", "type": "code",
         "code": "from collections import Counter; Counter('hello').most_common(1)",
         "a": "[('h', 1)]", "b": "[('l', 2)]", "c": "[('e', 1)]", "d": "[('o', 1)]",
         "correct": "b", "explanation": "l appears twice in 'hello', making it the most common character."},
        {"text": "What does `timedelta(days=7)` represent?", "type": "mcq",
         "a": "7 seconds", "b": "7 months", "c": "7 hours", "d": "7 days",
         "correct": "d", "explanation": "timedelta(days=7) represents exactly 7 days duration."},
    ]
}
},
]
},

# ═══════════════════════════════════════════════════════
# 12. TYPE HINTS & PYDANTIC
# ═══════════════════════════════════════════════════════
{
"title": "Type Hints & Pydantic", "slug": "type-hints", "color": "rose",
"description": "Add type safety to Python with hints, mypy, and Pydantic models",
"icon": "🏷️", "order": 12,
"lessons": [
{
"title": "Type Hints & Pydantic", "slug": "type-hints-pydantic",
"difficulty": "advanced", "order": 1, "xp_reward": 25,
"content": """# Type Hints & Pydantic

## Type Hints Basics

```python
# Variables
name: str = "Alice"
age:  int = 30
scores: list[int] = [90, 85, 92]
info:   dict[str, str] = {"city": "London"}

# Functions
def greet(name: str, times: int = 1) -> list[str]:
    return [f"Hello {name}"] * times

# Optional (can be None)
from typing import Optional
def find_user(id: int) -> Optional[dict]:
    return DB.get(id)   # Returns dict or None
```

## Union, Literal, TypedDict

```python
from typing import Union, Literal, TypedDict

def process(data: Union[str, bytes]) -> str:
    return data.decode() if isinstance(data, bytes) else data

Mode = Literal["read", "write", "append"]
def open_file(path: str, mode: Mode) -> None: ...

class UserDict(TypedDict):
    name: str
    age:  int
    email: str
```

## Pydantic (Runtime Validation)

```python
from pydantic import BaseModel, validator, Field
from typing import Optional

class User(BaseModel):
    name:  str               = Field(..., min_length=2)
    email: str
    age:   int               = Field(..., ge=0, le=150)
    role:  Literal["user","admin"] = "user"
    bio:   Optional[str]     = None

    @validator("email")
    def validate_email(cls, v):
        if "@" not in v:
            raise ValueError("Invalid email")
        return v.lower()

# Usage
user = User(name="Alice", email="Alice@X.COM", age=30)
print(user.email)    # "alice@x.com" — auto lowercased
user.dict()          # Python dict
user.json()          # JSON string
```
""",
"code_example": """from typing import Optional, Union, Literal
import re

# Pydantic-like validator (pure Python)
class Field:
    def __init__(self, **constraints): self.constraints = constraints
    def validate(self, name, value):
        c = self.constraints
        if value is None and c.get("required", True):
            raise ValueError(f"{name}: required")
        if value is None: return value
        if "min_length" in c and len(str(value)) < c["min_length"]:
            raise ValueError(f"{name}: min length {c['min_length']}")
        if "max_length" in c and len(str(value)) > c["max_length"]:
            raise ValueError(f"{name}: max length {c['max_length']}")
        if "ge" in c and value < c["ge"]:
            raise ValueError(f"{name}: must be >= {c['ge']}")
        if "le" in c and value > c["le"]:
            raise ValueError(f"{name}: must be <= {c['le']}")
        if "choices" in c and value not in c["choices"]:
            raise ValueError(f"{name}: must be one of {c['choices']}")
        return value

class BaseModel:
    _fields: dict = {}
    _validators: dict = {}

    def __init__(self, **data):
        self._data = {}; errors = {}
        for name, field in self.__class__._fields.items():
            val = data.get(name)
            try:
                val = field.validate(name, val)
                custom = self.__class__._validators.get(name)
                if custom: val = custom(val)
                self._data[name] = val
            except ValueError as e: errors[name] = str(e)
        if errors: raise ValueError(errors)
        for k,v in self._data.items(): setattr(self, k, v)

    def dict(self): return dict(self._data)

class UserModel(BaseModel):
    _fields = {
        "name":  Field(min_length=2, max_length=50),
        "email": Field(),
        "age":   Field(ge=0, le=150),
        "role":  Field(choices=["user","admin","moderator"], required=False),
    }
    _validators = {
        "email": lambda v: v.lower() if v else v,
        "name":  lambda v: v.strip().title() if v else v,
    }

print("=== Pydantic-style Validation ===")
valid_users = [
    {"name":"alice smith","email":"ALICE@EXAMPLE.COM","age":30},
    {"name":"BOB","email":"bob@test.org","age":25,"role":"admin"},
    {"name":"Carol","email":"carol@x.com","age":28,"role":"moderator"},
]
for data in valid_users:
    try:
        user = UserModel(**data)
        print(f"  OK: {user.dict()}")
    except ValueError as e:
        print(f"  FAIL: {e}")

print()
print("=== Invalid Data ===")
invalid = [
    {"name":"X","email":"alice@x.com","age":30},   # name too short
    {"name":"Alice","email":"alice@x.com","age":-1}, # age negative
    {"name":"Alice","email":"alice@x.com","age":25,"role":"superuser"}, # invalid role
]
for data in invalid:
    try:
        UserModel(**data)
    except ValueError as e:
        print(f"  Error: {e}")
""",
"quiz": {
    "title": "Type Hints Quiz",
    "xp_reward": 25,
    "questions": [
        {"text": "What does `Optional[str]` mean in type hints?", "type": "mcq",
         "a": "str or None", "b": "Any string", "c": "str only", "d": "Required string",
         "correct": "a", "explanation": "Optional[str] is shorthand for Union[str, None] — the value can be a string or None."},
        {"text": "Type hints in Python are enforced at runtime by default.", "type": "truefalse",
         "a": "True", "b": "False", "c": "", "d": "",
         "correct": "b", "explanation": "Python doesn't enforce type hints at runtime. Use Pydantic for runtime validation, or mypy for static checking."},
    ]
}
},
]
},

]  # end TOPICS


class Command(BaseCommand):
    help = "Seed PythonLearn with comprehensive Python tutorial content"

    def _ensure_tables_exist(self):
        existing_tables = set(connection.introspection.table_names())
        required_tables = {
            Topic._meta.db_table,
            Lesson._meta.db_table,
            Quiz._meta.db_table,
            Question._meta.db_table,
        }
        missing_tables = sorted(required_tables - existing_tables)
        if missing_tables:
            raise CommandError(
                "Missing database tables: "
                f"{', '.join(missing_tables)}. Run `python manage.py migrate` "
                "before running `python manage.py seed_data`."
            )

    def handle(self, *args, **kwargs):
        self._ensure_tables_exist()
        self.stdout.write("Clearing existing data...")
        Question.objects.all().delete()
        Quiz.objects.all().delete()
        Lesson.objects.all().delete()
        Topic.objects.all().delete()

        total_lessons = total_quizzes = total_questions = 0

        for topic_data in TOPICS:
            lessons_data = topic_data.pop("lessons")
            topic, _ = Topic.objects.update_or_create(
                slug=topic_data["slug"], defaults=topic_data
            )
            self.stdout.write(f"\n  {topic.icon} {topic.title}")

            for lesson_data in lessons_data:
                quiz_data = lesson_data.pop("quiz", None)
                lesson, _ = Lesson.objects.update_or_create(
                    slug=lesson_data["slug"], topic=topic,
                    defaults={**lesson_data, "topic": topic}
                )
                self.stdout.write(f"    + {lesson.title} [{lesson.difficulty}]")
                total_lessons += 1

                if quiz_data:
                    questions_data = quiz_data.pop("questions", [])
                    quiz, _ = Quiz.objects.update_or_create(
                        lesson=lesson,
                        defaults={"title": quiz_data["title"],
                                  "xp_reward": quiz_data.get("xp_reward", 20)}
                    )
                    total_quizzes += 1
                    for i, q in enumerate(questions_data, 1):
                        Question.objects.update_or_create(
                            quiz=quiz, order=i,
                            defaults={
                                "question_type": q.get("type", "mcq"),
                                "text":          q["text"],
                                "code_snippet":  q.get("code", ""),
                                "option_a":      q["a"],
                                "option_b":      q["b"],
                                "option_c":      q.get("c", ""),
                                "option_d":      q.get("d", ""),
                                "correct":       q["correct"],
                                "explanation":   q.get("explanation", ""),
                            }
                        )
                        total_questions += 1
                    self.stdout.write(f"      ✓ Quiz: {len(questions_data)} questions")

                lesson_data["quiz"] = quiz_data if quiz_data else None

            topic_data["lessons"] = lessons_data

        self.stdout.write(self.style.SUCCESS(
            f"\nDone! {len(TOPICS)} topics | {total_lessons} lessons | "
            f"{total_quizzes} quizzes | {total_questions} questions"
        ))