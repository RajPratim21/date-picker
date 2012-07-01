describe('unit/show.spec.js', function() {
	var ctor = require('../helpers/date-picker')
	  , dp

	beforeEach(function() {
		dp = new ctor();

		// We don't care about rendering. We will just make this a noop
		dp.render = function() { return document.createElement('div'); };
	});

	describe('When calling show()', function() {
		var showSpy
		  , showResult

		describe('with valid parameters', function() {
			beforeEach(function() {
				showSpy = sinon.spy();
				dp.on('show', showSpy);

				var elm = document.createElement('div')
				showResult = dp.show(elm);
			});

			it('should emit a "show" event', function() {
				expect(showSpy).to.have.been.called;
			});
			it('should pass the date-picker to the event-listener', function() {
				expect(showSpy).to.have.been.calledWith(dp);
			});

			it('should return the date-picker, for chaining', function() {
				expect(showResult).to.equal(dp);
			});
		});

		describe('with an invalid selector', function() {
			beforeEach(function() {
				sinon.stub(document, 'querySelector').returns(null);
			});
			afterEach(function() {
				document.querySelector.restore();
			});
			it('should attempt to look it up', function() {
				expect(function() {
					dp.show('invalid');
				}).to['throw']();

				expect(document.querySelector).to.have.been.calledWith('invalid');
			});
			it('should throw an exception', function() {
				expect(function() {
					dp.show('invalid');
				}).to['throw']('"invalid" does not resolve to an element!');
			});
		});
	});

	describe('When calling "hide()"', function() {
		describe('before calling show', function() {
			it('should not throw', function() {
				expect(function hide() {
					dp.hide();
				}).not.to.throw();
			});
			it('should not emit hide', function() {
				var spy = sinon.spy()
				dp.on('hide', spy);
				dp.hide();
				expect(spy).not.to.have.been.called;
			});
		});
		describe('after calling show', function() {
			var hideSpy
			beforeEach(function() {
				var elm = document.createElement('div')

				hideSpy = sinon.spy();
				dp.on('hide', hideSpy);

				dp.show(elm);
				dp.hide();
			});

			it('should emit a hide-event', function() {
				expect(hideSpy).to.have.been.called;
			});
		});
	});
});
