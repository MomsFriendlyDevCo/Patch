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

});
