var expect = require('expect.js');
var Oncetip = require('../index');

describe('seedit-oncetip', function() {

	it('should be show is false', function() {
		var ooxxer = new Oncetip({
			storeId: 'bk',
			scope: 'bbs',
			when: function() {
				return window.fid && window.fid === 24;
			},
			onShow: function() {}
		});

		expect(ooxxer.shouldBeShown()).to.be(false);
	});

	it('should be show is true', function() {
		var ooxxer = new Oncetip({
			storeId: 'bk',
			scope: 'bbs',
			when: function() {
				window.oncetip = true;
				return window.oncetip;
			},
			onShow: function() {}
		});

		expect(ooxxer.shouldBeShown()).to.be(true);
	});

	it('should be show is true', function() {
		var ooxxer = new Oncetip({
			storeId: 'bk',
			scope: 'bbs',
			onShow: function() {}
		});

		expect(ooxxer.shouldBeShown()).to.be(true);
	});

});