test('toBe는 값이 정확히 일치하는지 여부를 확인한다.', () => {
    expect(2 + 2).toBe(4);

    const data = { one: 1 };
    const expected = data;
    data.two = 2;

    // toBe에서 주의 해야 할 점은 객체를 테스트할때 이다.
    // toBe로 객체를 테스트할때는 객체의 값이 아닌 주소값이 일치하는지 여부를 확인한다.
    expect(data).toBe(expected);

    // 아래 코드는 값은 일치를 하나 toBe는 값이 아닌 주소값을 비교하기 때문에 에러가 발생한다.
    // expect(data).toBe({ one:1, two: 2 });
});

test('toEqual은 값이 일치하는지 여부를 확인한다.', () => {
    const data = { one: 1 };
    data.two = 2;

    // toEqual은 주소값이 아닌 객체의 값만 일치하는지 여부를 확인한다.
    expect(data).toEqual({ one:1, two: 2 });
});

test('"not은 matcher의 반대" 여부를 확인한다.', () => {
    for (let a = 1; a < 10; a++) {
        for (let b = 1; b < 10; b++) {
            expect(a + b).not.toBe(0);
        }
    }
});

describe('참이 아닌 값에 대한 테스트', () => {
    test('null', () => {
        const n = null;
        expect(n).toBeNull();

        // 값이 초기화 되어 있는지, null도 null이라는 값으로 초기화를 한것이기에 통과한다.
        expect(n).toBeDefined();

        // undefined라는 건 값이 초기화 되지 않은 걸 말하는 것이다.
        expect(n).not.toBeUndefined();
        
        expect(n).not.toBeTruthy();
        expect(n).toBeFalsy();
    });

    test('zero', () => {
        const z = 0;

        expect(z).not.toBeNull();
        expect(z).toBeDefined();
        expect(z).not.toBeUndefined();
        expect(z).not.toBeTruthy();
        expect(z).toBeFalsy();
    });
});

describe('숫자에 대한 matcher', () => {
    test('정수 테스트', () => {
        const value = 4;
        expect(value).toBeGreaterThan(3);
        expect(value).toBeGreaterThanOrEqual(3.5);
        expect(value).toBeLessThan(5);
        expect(value).toBeLessThanOrEqual(4.5);
    
        // 숫자 테스트에서는 toBe와 toEqual은 동일하다.
        expect(value).toBe(4);
        expect(value).toEqual(4);
    });

    test('실수 테스트', () => {
        const value = 0.1 + 0.2;

        expect(value).toBeCloseTo(0.3);

        // 실수를 테스트 할때 toBe를 사용하면 원하는 결과와 다른 결과를 도출할 수 있다.
        // const value = 0.3 으로 했을 때는 통과하나, 지금과 같이 0.1 + 0.2를 하는 경우에는 테스트에 실패한다.
        // 그렇기 때문에 실수에 대한 테스트는 toBeCloseTo를 사용하라
        // expect(value).toBe(0.3);
    })
});

test('문자열에 대한 matcher', () => {
    // 문자열에 대한 완전 일치 여부를 확인 할때는 toBe 또는 toEqual를 사용하면 된다.
    expect('team').toBe('team');
    expect('team').toEqual('team');

    // 정규식을 사용해서 문자열을 테스트 할때는 toMatch를 사용하라
    expect('Christoph').toMatch(/stop/);
    
});

test('배열, iterables 테스트', () => {
    const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'beer',
    ];

    expect(shoppingList).toContain('beer');
    expect(new Set(shoppingList)).toContain('beer');
});

function compileAndroidCode() {
    throw new Error('you are using the wrong JDK');
}

test('예외처리에 대한 테스트', () => {
    expect(() => compileAndroidCode()).toThrow();
    expect(() => compileAndroidCode()).toThrow(Error);

    expect(() => compileAndroidCode()).toThrow('you are using the wrong JDK');
    expect(() => compileAndroidCode()).toThrow(/JDK/);
});

test('객체 테스트', () => {
    const data = { position: { x: 0, y: 0 }, a: 1 };

    // toMatchObject는 expected 객체에 received 객체의 프로퍼티가 존재하면서 값도 일치하는지 여부를 확인한다.
    // 객체의 모든 값이 일치하는지를 확인하는게 아니라 일부만 확인 할때는 toMatchObject를 사용하라
    // 모든 값 일치 여부는 toEqual 이다.
    expect(data).toMatchObject({ a: 1 });
    expect(data).toMatchObject({ a: expect.any(Number) });

    // toEqual(expect.objectContaining(객체))을 사용 하면 toMatchObject와 유사하게 만들 수 있다.
    expect(data).toEqual(expect.objectContaining({ a: 1 }));

    // toMatchObject와 expect.objectContaining의 차이
    
    // toMatchObject는 전달된 expected 객체의 하위 요소까지 일부만 존재하는지 여부를 확인해 준다.
    expect(data).toMatchObject({
        position: {
            x: 0
        }
    });

    // 아래와 같이 작성해야 테스트에 통과한다.
    // expect.objectContaining는 하위 요소까지 일부분 일치여부를 확인해주지 않는다.
    // toMatchObject 처럼 작동하게 하려면 아래처럼 expect.objectContaining를 계속 사용해주어야 한다.
    // 한마디로 toEqual(expect.objectContaining와 toMatchObject 쓰임새는 같을 수도 있지만 사실상 다르다.
    // 아래와 같은 경우는 toMatchObject를 사용하라.
    expect(data).toEqual(expect.objectContaining({
        position: expect.objectContaining({
            x: 0
        })
    }));
    
    // 아래 코드는 실패한다.
    /* expect(data).toEqual(expect.objectContaining({
        position: {
            x: 0
        }
    })) */

    const houseForSale = {
        bath: true,
        bedrooms: 4,
        kitchen: {
          amenities: ['oven', 'stove'],
          area: 20
        }
    };
    const desiredHouse = {
        bath: true,
        kitchen: {
            amenities: expect.arrayContaining(['oven']),
            area: expect.any(Number),
        },
    }
    
    expect(houseForSale).toMatchObject(desiredHouse);
});

test('값이 아닌 타입 일치여부 확인하기', () => {
    // expect.any(Number)
    // expect.anything은 머지?
})