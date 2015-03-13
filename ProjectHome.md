# `ComSym`: Widget for commenting and rating #
_Built on top of [Prototype JS](http://prototypejs.org)_

This idea to simply try to combine rating and reply actions together. Consider an often situation when user reads an article and wants to comment it. Also, he would rate this article. So, what really happens: user votes for article then he writes a comment and presses a 'Comment' button. Why not combine these actions together?

Widget allows you to do two common actions: comment and rate something at one place. The main objective is to unite two frequent actions and to encourage greater use of user ratings.

http://knell.ho.ua/comsym/ (See a demo video below)



When message is empty widget behaves in 'Rate' mode. When user inputs some message widget becomes in 'Comment' mode. This make sense for visual representation and for your event handlers. The visual representation is fully customizable by CSS.

Supports keyboard like regular buttons, such keys as _TAB_, _Enter_ or _Space_.


## Initialization ##

First, include PrototypeJS, widget code and ComSym CSS:
```
	<link rel="stylesheet" href="comsym.css"/>
	<script type="text/javascript" src="prototype.js"></script>
	<script type="text/javascript" src="comsym.js"></script>
```
Second, add an HTML element:
```
	<div id="comsym"></div>
```
Then, create a widget:
```
	<script type="text/javascript">
	var widget;
	Event.observe(window, 'load', function () {
		widget = new ComSym_ReplyBtn({
			elem:        'comsym',
			onClick:      onComment_callback,
			onPlusClick:  onPlus_callback,
			onMinusClick: onMinus_callback
		});
	});
	</script>
```
That's all.

## Configuration ##

Widget supports following configuration options:
|elem|DOM element ID or Element object|
|:---|:-------------------------------|
|rateLabel|Label for button in 'rate' mode|
|commentLabel|Label for button in 'comment' mode|
|comment|Initial comment in textarea|
|onClick|Callback for regular comment button|
|onPlus|Callback for 'plus' button|
|onMinus|Callback for 'minus' button|

## API functions ##

|getMessage|Returns current value of textarea|
|:---------|:--------------------------------|
|setMessage|Sets a message to textarea|
|setTitle|Sets a title for button|

## Full example of usage ##

```
<html>
<head>
	<title>ComSym example</title>
	<link rel="stylesheet" href="comsym.css"/>
	<script type="text/javascript" src="prototype.js"></script>
	<script type="text/javascript" src="comsym.js"></script>
	<script type="text/javascript">
	function postComment(rate)
	{
		var msg = w.getMessage();
		if (!msg.empty())
		{
			var c = new Element('div', { 'className': 'a_comment' });
			c.appendChild(new Element('em').update('[Rate: ' + rate + '] '));
			c.appendChild(new Element('span').update(msg));
			$('comments').appendChild(c);
		}

		var r = $('rate');
		var curr = parseInt(r.innerHTML);
		if (curr < 0)
			r.removeClassName('minus');
		else if (curr > 0)
			r.removeClassName('plus');
		curr += rate;
		if (curr < 0)
			r.addClassName('minus');
		else if (curr > 0)
			r.addClassName('plus');
		r.update(curr);
	}

	function reset()
	{
		var r = $('rate');
		r.update(0);
		r.removeClassName('minus');
		r.removeClassName('plus');
		$('comments').update();
		w.setMessage('');
	}

	var w;
	Event.observe(window, 'load', function () {
		w = new ComSym_ReplyBtn({
			elem:        'comsym',
			onClick:      postComment.bind(this, 0),
			onPlusClick:  postComment.bind(this, 1),
			onMinusClick: postComment.bind(this, -1)
		});

		$('reset').observe('click', reset.bind(this));
	});
	</script>
</head>
<body>
	<h1>Article title</h1>
	<p>A big and cool article.</p>

	<!-- Rate value element -->
	<p>Rate: <span id="rate">0</span></p>

	<div id="comsym"></div>

	<hr/>
	<span id="reset">Reset</span>

	<div id="comments"></div>
</body>
</html>
```

See  a video

<a href='http://www.youtube.com/watch?feature=player_embedded&v=XRgknWuIACs' target='_blank'><img src='http://img.youtube.com/vi/XRgknWuIACs/0.jpg' width='425' height=344 /></a>

or try it [Live](http://knell.ho.ua/comsym/)