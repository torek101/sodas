// TypeScript

//it is not a different languaga
//a set of static typings over the existing language
//TypeScripte gets compiled to javaScript at compiletime

const test = 3;

let sentence = 'hello';

if (test>2) {
    console.log('Hello.');
}
const add = (num1: number, num2: number): number => {
    return num1 + num2;
}

const cat = (str1: string, str2: string): string => {
    return str1 + str2;
}

const testFunc = (condition: boolean): string | number => {
    if (condition) return 'string';
    else return 42;
}

const list: number[] = [4, 2, 3, 56, 6, 69, 420];
const strList: string[] = ['42'];
const varyingList: (string | number | boolean)[] = ['hello', 42, true];

const obj: ObjType = {
    hello: 3,
    list: [1, 23, 4, 5],
    obj: {
        hello: 3,
        list: [1, 23, 4, 5]
    },
    test: [
        {
            prop1: true,
            prop2: false
        },
        {
            prop1: false,
            prop2: true
        }
    ]
};

interface ObjType {
    hello: number;
    list: number[];
    obj: {
        hello: number;
        list: number[];
    },
    test: {
        prop1: boolean;
        prop2: boolean;
    }[]
};

interface user {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
};

console.log(add(4,3));

console.log(cat(sentence,' Jason'));