@MomsFriendlyDevCo/Patch
========================
Simple object patching.

This module is designed to compare two objects and return the differences between them in a third, patchable, object.

**Features:**
* Simple, fast, ES6 compatible object patching
* Arrays are treated as atomic - any change within them copies the entire array
* Functions for comparison or deep cloning can be customized
* Does not mutate A or B


```javascript
import {patch} from '@momsfriendlydevco/patch';

let a = {
    foo: 'Foo!',
    bar: 'Bar!',
    quz: [1, 2, 3],
    quark: {one: 1, two: 2},
    plugh: '123', // Wont be picked up as we're patching A against B
};

let b = {
    foo: 'Foo!',
    quz: [1, 2, 3, 4],
    quark: {two: 'two'},
    flarp: {uno: 1},
};

console.log( patch(a, b) ) //=
let c = {
    quz: [1, 2, 3, 4],
    quark: {two: 'two'},
    flarp: {uno: 1},
}
```


API
===

patch(a, b, options)
--------------------
Return a third, patch, object for the differences of B against A.

Options can be:

| Option      | Type       | Default       | Description                 |
|-------------|------------|---------------|-----------------------------|
| `isEqual`   | `Function` | `_.isEqual`   | Equality tester             |
| `cloneDeep` | `Function` | `_.cloneDeep` | Deep cloner used for arrays |
