var ComSym_ReplyBtn = Class.create({
	initialize: function (opts) {
		var defOpts = {
			'elem':         null,  // id or Element
			'label':        '',
			'onClick':      Prototype.emptyFunction,
			'onPlusClick':  Prototype.emptyFunction,
			'onMinusClick': Prototype.emptyFunction
		};

		this.opts = Object.extend(Object.clone(defOpts), opts || {});
		this.elem = $(this.opts.elem);
		this.btn  = this._createBtn();

		this.elem.update();
		this.elem.appendChild(this.btn);
	},
	_createBtn: function () {
		var label = (this.opts.label || this.elem.innerHTML).escapeHTML();
		var plus  = new Element('div', { 'className': 'comsym-plus_btn' });
		var minus = new Element('div', { 'className': 'comsym-minus_btn' });
		var pm_holder = new Element('div', { 'className': 'comsym-plusminus_holder' });
		pm_holder.appendChild(plus);
		pm_holder.appendChild(minus);
		
		var label    = new Element('div', { 'className': 'comsym-label' }).update(label);
		var l_holder = new Element('div', { 'className': 'comsym-label_holder' });
		l_holder.appendChild(label);

		var btn = new Element('div', { 'className': 'comsym-btn' });
		btn.appendChild(l_holder);
		btn.appendChild(pm_holder);

		btn.observe('click', this._onClick.bindAsEventListener(this));
		plus.observe('click', this._onPlus.bindAsEventListener(this));
		minus.observe('click', this._onMinus.bindAsEventListener(this));

		plus.observe('mouseover', this._overPlus.bindAsEventListener(this));
		minus.observe('mouseover', this._overMinus.bindAsEventListener(this));
		plus.observe('mouseout', this._onOutPlus.bindAsEventListener(this));
		minus.observe('mouseout', this._onOutMinus.bindAsEventListener(this));

		return btn;
	},
	_onClick: function (ev) {
		this.opts.onClick(ev);
	},
	_onPlus: function (ev) {
		ev.stop();
		this.opts.onPlusClick(ev);
	},
	_onMinus: function (ev) {
		ev.stop();
		this.opts.onMinusClick(ev);
	},
	_overPlus: function (ev) {
		this.btn.addClassName('comsym-when_on_plus');
	},
	_onOutPlus: function (ev) {
		this.btn.removeClassName('comsym-when_on_plus');
	},
	_overMinus: function (ev) {
		this.btn.addClassName('comsym-when_on_minus');
	},
	_onOutMinus: function (ev) {
		this.btn.removeClassName('comsym-when_on_minus');
	},
});
