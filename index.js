var CookieStore = require('cookie-store');
var Config = require('seedit-config');
var $ = require('jquery');

var defaults = {
	storeId: '', // cookie id,尽量简短
	scope: '', // 作用域名，可以用子域名就不用all
	when: true, // 什么条件下显示,可以为Boolean或者Function
	onShow: $.noop
};

var ooxxer = function(option) {
	this.o = $.extend(defaults, option);
	this._initCookie();
	if (!this.hasShown()) {
		this.onShow();
	}
};

ooxxer.prototype._initCookie = function() {
	var scope = this.o.scope;
	var domain;
	if (scope === 'all') {
		domain = Config.getMainDomain();
	} else {
		domain = scope + '.' + Config.getMainDomain();
	}
	this.store = new CookieStore('fe_', {
		domain: domain,
		path: '/',
		expires: 365
	});
};

// 是否满足显示条件
ooxxer.prototype.shouldBeShown = function() {
	if (typeof this.o.when === 'function') {
		return this.o.when() === true;
	} else {
		return true;
	}
};

// 是否已经显示过
ooxxer.prototype.hasShown = function() {
	var _this = this;
	return !!_this.store.get(_this.o.storeId);
};

// 显示时的行为
ooxxer.prototype.onShow = function() {
	if (this.shouldBeShown()) {
		this.o.onShow && this.o.onShow();
	}
};

// 设置为已经显示
ooxxer.prototype.setHasShown = function(cb) {
	var _this = this;
	cb && cb();
	_this.store.put(_this.o.storeId, '1');
};

// 清除显示数据
ooxxer.prototype.clear = function() {
	var _this = this;
	_this.store.remove(_this.o.storeId);
};

module.exports = ooxxer;