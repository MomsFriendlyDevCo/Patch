import {expect} from 'chai';
import patch from '../lib/patch.js';

describe('patch - mixed tests', ()=> {
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


	it('should patch together two objects', ()=> {
		let res = patch(a, b);
		expect(res).to.be.deep.equal({
			quz: [1, 2, 3, 4],
			quark: {two: 'two'},
			flarp: {uno: 1},
		});
	});

	it('should be a deep clone', ()=> {
		let res = patch(a, b);
		expect(res).to.not.be.equal(b);
		expect(res.quz).to.not.be.equal(b.quz);
	});

	it('should combine back into the RHS object', ()=> {
		let res = patch(a, b);
		expect(res).to.be.deep.equal(res, b);
	});
})

describe('patch - type handling', ()=> {

	it('should handle dates as scalars', ()=> {
		let a = {now: new Date('2022-11-16T23:48:53.434Z')};
		let b = {now: new Date('2022-11-16T23:54:34.618Z')};

		let c = patch(a, b);
		expect(c).to.deep.equal(b);

		expect(patch(a, a)).to.deep.equal({});
	});

	it('should treat buffers as scalars', ()=> {
		let a = {myBuffer: Buffer.from('hello')};
		let b = {myBuffer: Buffer.from('goodbye')};

		let c = patch(a, b);
		expect(c).to.deep.equal(b);
		expect(patch(a, a)).to.deep.equal({});
	});

	it('should treat maps as scalars', ()=> {
		let a = {myMap: new Map([['foo', 'foo']])};
		let b = {myMap: new Map([['foo', 'Foo!']])};

		let c = patch(a, b);
		expect(c).to.deep.equal(b);
		expect(patch(a, a)).to.deep.equal({});
	});

	it('should treat sets as scalars', ()=> {
		let a = {mySet: new Set(['a', 'b', 'c'])};
		let b = {mySet: new Set(['c', 'd', 'e'])};

		let c = patch(a, b);
		expect(c).to.deep.equal(b);
		expect(patch(a, a)).to.deep.equal({});
	});

});
