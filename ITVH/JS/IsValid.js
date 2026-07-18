class IsValid {
    //s = ()[]{}
    execute(str) {
        if (str.length <= 1) return false;

        const stack = [];

        const pairs = {
            ')': '(',
            '}': '{',
            ']': '[',
        };

        for (const char of str) {
            if (['(', '{', '['].includes(char)) {
                stack.push(char);
            } else {
                if (stack.length === 0) {
                    return false;
                }

                const top = stack.pop();//

                if (top !== pairs[char]) {
                    return false;
                }
            }
        }

        return stack.length === 0;
    }
}
console.log(new IsValid().execute("({[]})"));
console.log(new IsValid().execute("()[]{}"));
console.log(new IsValid().execute("(]"));
