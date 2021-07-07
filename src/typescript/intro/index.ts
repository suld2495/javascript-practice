let hello = 'Hello World';

// 타입스크립트에서는 변수의 선언과 함께 타입을 설정한다.
// 아래 2개의 변수 선언은 동일한 것이다.
// let hello = 'Hello World';
// let hello:string = 'Hello World';
// hello = 1; // 그렇기 때문에 타입이 string인 hello에 숫자를 할당하는 것은 에러가 난다.

interface User {
    name: string;
    id: number;
    email: 'email'
}

const user: User = {
    name: 'hello',
    id: 1,
    email: 'email'
}

class UserAccount {
    name: string;
    id: number;
    email: 'email';

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}

const user2: User = new UserAccount('hello', 1);
const user3: User | boolean = true;

// 리터럴 값을 미리 지정해서 타입 검사를 할 수 도 있다.
type WindowStates = "open" | "closed" | "minimized";
const state: WindowStates = 'open';
// const state: WindowStates = 'hello'; type에 포함 된 리터럴이 아니라 에러 발생

interface Backpack<Type> {
    add: (obj: Type) => void;
    get: () => Type
}

declare const backpack: Backpack<string>;

const object = backpack.get(); // 자동으로 string 타입이 된다.
backpack.add("23"); // string 값만 파라미터로 사용 가능

interface Point {
    x: number;
    y: number;
}

function printPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}

const point = { x: 12, y: 26};
printPoint(point);