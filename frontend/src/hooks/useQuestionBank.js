export const useQuestionBank = () => {
    const questionBank = {
        JavaScript: [
            {
                id: 1,
                question: "What will be the output of the following JavaScript code?",
                code: `console.log(typeof null);`,
                options: ["null", "undefined", "object", "boolean"],
                correctAnswer: 2,
                explanation: "In JavaScript, typeof null returns 'object'. This is a well-known quirk in the language.",
                difficulty: "Easy",
                topic: "Data Types"
            },
            {
                id: 2,
                question: "What is the result of the following expression?",
                code: `console.log(0.1 + 0.2 === 0.3);`,
                options: ["true", "false", "undefined", "NaN"],
                correctAnswer: 1,
                explanation: "Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
                difficulty: "Medium",
                topic: "Number Precision"
            },
            {
                id: 3,
                question: "Which method is used to add elements to the end of an array?",
                code: `let arr = [1, 2, 3];\n// Which method adds 4 to the end?`,
                options: ["arr.push(4)", "arr.unshift(4)", "arr.pop(4)", "arr.shift(4)"],
                correctAnswer: 0,
                explanation: "push() adds elements to the end of an array, while unshift() adds to the beginning.",
                difficulty: "Easy",
                topic: "Arrays"
            }
        ],
        Python: [
            {
                id: 1,
                question: "What will be the output of this Python code?",
                code: `print(type([]) is list)`,
                options: ["True", "False", "None", "Error"],
                correctAnswer: 0,
                explanation: "The 'is' operator checks for identity. An empty list literal creates a list object, so type([]) is list returns True.",
                difficulty: "Easy",
                topic: "Data Types"
            },
            {
                id: 2,
                question: "What is the result of the following list comprehension?",
                code: `result = [x**2 for x in range(5) if x % 2 == 0]\nprint(result)`,
                options: ["[0, 4, 16]", "[1, 9]", "[0, 1, 4, 9, 16]", "[2, 8]"],
                correctAnswer: 0,
                explanation: "The comprehension squares even numbers from 0-4: 0²=0, 2²=4, 4²=16.",
                difficulty: "Medium",
                topic: "List Comprehensions"
            },
            {
                id: 3,
                question: "Which keyword is used to define a function in Python?",
                code: `# Complete the syntax:\n___ my_function():\n    pass`,
                options: ["function", "def", "func", "define"],
                correctAnswer: 1,
                explanation: "Python uses the 'def' keyword to define functions.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ],
        Java: [
            {
                id: 1,
                question: "What will be the output of this Java code?",
                code: `String str1 = "Hello";\nString str2 = "Hello";\nSystem.out.println(str1 == str2);`,
                options: ["true", "false", "Compilation Error", "Runtime Error"],
                correctAnswer: 0,
                explanation: "String literals are stored in the string pool, so both str1 and str2 reference the same object.",
                difficulty: "Medium",
                topic: "String Pool"
            },
            {
                id: 2,
                question: "Which access modifier makes a member accessible only within the same class?",
                code: `class Example {\n    ___ int value;\n}`,
                options: ["public", "protected", "private", "default"],
                correctAnswer: 2,
                explanation: "The 'private' access modifier restricts access to within the same class only.",
                difficulty: "Easy",
                topic: "Access Modifiers"
            },
            {
                id: 3,
                question: "What is the correct way to create an ArrayList in Java?",
                code: `// Which declaration is correct?`,
                options: [
                    "ArrayList<String> list = new ArrayList<String>();",
                    "ArrayList list = new ArrayList();",
                    "List<String> list = new ArrayList<>();",
                    "All of the above"
                ],
                correctAnswer: 3,
                explanation: "All three are valid ways to create an ArrayList, with the third being the most modern approach using diamond operator.",
                difficulty: "Easy",
                topic: "Collections"
            }
        ],
        "C++": [
            {
                id: 1,
                question: "What will be the output of this C++ code?",
                code: `int x = 5;\nint* ptr = &x;\nstd::cout << *ptr << std::endl;`,
                options: ["5", "Address of x", "0", "Compilation Error"],
                correctAnswer: 0,
                explanation: "*ptr dereferences the pointer to get the value stored at the address, which is 5.",
                difficulty: "Easy",
                topic: "Pointers"
            },
            {
                id: 2,
                question: "Which header file is required for input/output operations?",
                code: `#include <____>\nint main() {\n    std::cout << "Hello";\n    return 0;\n}`,
                options: ["stdio.h", "iostream", "conio.h", "stdlib.h"],
                correctAnswer: 1,
                explanation: "iostream header is required for std::cout and std::cin operations in C++.",
                difficulty: "Easy",
                topic: "Headers"
            },
            {
                id: 3,
                question: "What is the difference between ++i and i++?",
                code: `int i = 5;\nint a = ++i;  // a = ?\nint b = i++;  // b = ?`,
                options: ["a=6, b=6", "a=5, b=6", "a=6, b=5", "a=5, b=5"],
                correctAnswer: 0,
                explanation: "++i increments first then returns (pre-increment), i++ returns first then increments (post-increment). After ++i, both a and the new i are 6.",
                difficulty: "Medium",
                topic: "Operators"
            }
        ],
        Go: [
            {
                id: 1,
                question: "How do you declare a variable in Go?",
                code: `// Which is the correct way to declare a string variable?`,
                options: ["var name string", "string name", "name := string", "declare name string"],
                correctAnswer: 0,
                explanation: "Go uses 'var' keyword followed by variable name and type for explicit declaration.",
                difficulty: "Easy",
                topic: "Variables"
            },
            {
                id: 2,
                question: "What will be the output of this Go code?",
                code: `package main\nimport "fmt"\nfunc main() {\n    x := []int{1, 2, 3}\n    fmt.Println(len(x))\n}`,
                options: ["1", "2", "3", "Error"],
                correctAnswer: 2,
                explanation: "len() function returns the length of the slice, which contains 3 elements.",
                difficulty: "Easy",
                topic: "Slices"
            },
            {
                id: 3,
                question: "Which keyword is used to define a function in Go?",
                code: `___ add(a, b int) int {\n    return a + b\n}`,
                options: ["function", "func", "def", "fn"],
                correctAnswer: 1,
                explanation: "Go uses the 'func' keyword to define functions.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ],
        Rust: [
            {
                id: 1,
                question: "What is the correct way to declare a mutable variable in Rust?",
                code: `// Which declaration allows changing the variable?`,
                options: ["let x = 5;", "let mut x = 5;", "mut let x = 5;", "var x = 5;"],
                correctAnswer: 1,
                explanation: "Rust variables are immutable by default. Use 'let mut' to make them mutable.",
                difficulty: "Easy",
                topic: "Variables"
            },
            {
                id: 2,
                question: "What will happen with this Rust code?",
                code: `let s1 = String::from("hello");\nlet s2 = s1;\nprintln!("{}", s1);`,
                options: ["Prints 'hello'", "Compilation Error", "Runtime Error", "Prints nothing"],
                correctAnswer: 1,
                explanation: "This causes a compilation error because s1's ownership is moved to s2, making s1 invalid.",
                difficulty: "Medium",
                topic: "Ownership"
            },
            {
                id: 3,
                question: "How do you define a function that returns a value in Rust?",
                code: `fn square(x: i32) -> ______ {\n    x * x\n}`,
                options: ["int", "i32", "integer", "number"],
                correctAnswer: 1,
                explanation: "Rust uses specific integer types like i32 for 32-bit signed integers.",
                difficulty: "Easy",
                topic: "Functions"
            }
        ]
    };

    return questionBank;
};