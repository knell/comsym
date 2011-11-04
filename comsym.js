var ComSym_ReplyBtn = Class.create({
	initialize: function (opts) {
		var defOpts = {
			'elem':         null,  // id or Element
			'rateLabel':    'Rate',
			'commentLabel': 'Comment',
			'comment':      '',
			'onClick':      Prototype.emptyFunction,
			'onPlusClick':  Prototype.emptyFunction,
			'onMinusClick': Prototype.emptyFunction
		};

		this.opts = Object.extend(Object.clone(defOpts), opts || {});
		this.elem = $(this.opts.elem);
		this.mode = this.opts.comment.empty() ? 'rate' : 'comment';
		this.wgt  = this._createWidget();

		this.elem.update('');
		this.elem.appendChild(this.wgt);
		this._updateWidget();
	},
	_createWidget: function () {
		this.msg = new Element('textarea', { 'className': 'comsym-comment_area' });
		var bh  = new Element('div');
		this.btn = this._createBtn();
		bh.appendChild(this.btn);
		var wgt = new Element('div', { 'className': 'comsym-widget' });
		wgt.appendChild(this.msg);
		wgt.appendChild(bh);

		this.msg.observe('keyup', this._onMessageKeyUp.bindAsEventListener(this));

		return wgt;
	},
	_createBtn: function () {
		var title = this.mode == 'comment' 
			? this.opts.commentLabel
			: this.opts.rateLabel;
		if (title.empty())
			title = this.elem.innerHTML;
		title = title.escapeHTML();

		var plus  = new Element('div', { 'className': 'comsym-plus_btn', 'tabIndex': 0 });
		var minus = new Element('div', { 'className': 'comsym-minus_btn', 'tabIndex': 0 });
		var pm_holder = new Element('div', { 'className': 'comsym-plusminus_holder' });
		pm_holder.appendChild(plus);
		pm_holder.appendChild(minus);
		
		this.label   = new Element('div', { 'className': 'comsym-label' }).update(title);
		var l_holder = new Element('div', { 'className': 'comsym-label_holder' });
		l_holder.appendChild(this.label);

		var btn = new Element('div', { 'className': 'comsym-btn', 'tabIndex': 0 });
		btn.appendChild(l_holder);
		btn.appendChild(pm_holder);

		btn.observe('click', this._onClick.bindAsEventListener(this));
		plus.observe('click', this._onPlus.bindAsEventListener(this));
		minus.observe('click', this._onMinus.bindAsEventListener(this));

		// Keyboard Enter and Space
		btn.observe('keyup', this._onKeyUp.bindAsEventListener(this, this._onClick.bind(this)));
		plus.observe('keyup', this._onKeyUp.bindAsEventListener(this, this._onPlus.bind(this)));
		minus.observe('keyup', this._onKeyUp.bindAsEventListener(this, this._onMinus.bind(this)));

		plus.observe('mouseover', this._overPlus.bindAsEventListener(this));
		plus.observe('focus',     this._overPlus.bindAsEventListener(this));
		plus.observe('mouseout',  this._onOutPlus.bindAsEventListener(this));
		plus.observe('blur',      this._onOutPlus.bindAsEventListener(this));

		minus.observe('mouseover', this._overMinus.bindAsEventListener(this));
		minus.observe('focus',     this._overMinus.bindAsEventListener(this));
		minus.observe('mouseout',  this._onOutMinus.bindAsEventListener(this));
		minus.observe('blur',      this._onOutMinus.bindAsEventListener(this));

		return btn;
	},
	// private:
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
	_onKeyUp: function (ev, cb) {
		if (ev.keyCode == 32 || ev.keyCode == 13)
			cb(ev);
	},
	_updateWidget: function () {
		var l = this.msg.getValue().length;
		if (l)
		{
			this.wgt.removeClassName('comsym-mode_rate');
			this.wgt.addClassName('comsym-mode_comment');
			this.setTitle(this.opts.commentLabel);
		}
		else
		{
			this.wgt.removeClassName('comsym-mode_comment');
			this.wgt.addClassName('comsym-mode_rate');
			this.setTitle(this.opts.rateLabel);
		}
	},
	_onMessageKeyUp: function (ev) {
		this._updateWidget();
	},
	// public: 
	getMessage: function () {
		return this.msg.getValue();
	},
	setTitle: function (title) {
		this.label.update(title);
	},
	setMessage: function (msg) {
		this.msg.setValue(msg);
		this._updateWidget();
	}
});
