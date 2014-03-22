var multi_select__mouse = null;
function multi_select__mousecancel()
{
	var boxEl = multi_select__mouse.el;
	$(boxEl).removeClass('mousehold');

	if (multi_select__mouse.longpress_timer) {
		clearTimeout(multi_select__mouse.longpress_timer);
		multi_select__mouse.longpress_timer = null;
	}

	multi_select__mouse = null;

	boxEl.removeEventListener('mouseenter', multi_select__mouseenter, false);
	boxEl.removeEventListener('mouseleave', multi_select__mouseleave, false);
	document.removeEventListener('mouseup', multi_select__mouseup, false);
}

function multi_select__longpress()
{
	if (multi_select__mouse) {
		multi_select__mouse.longpress_timer = null;

		var boxEl = multi_select__mouse.el;
		if ($(boxEl).triggerHandler('longpress', [])) {

			// event was handled
			multi_select__mousecancel();
		}
	}
}

function multi_select__mousedown(evt)
{
	evt.preventDefault();
	$(this).addClass('mousehold');

	if (multi_select__mouse) {
		multi_select__mousecancel();
	}

	multi_select__mouse = {
		'down': true,
		'el': this
		};
	this.addEventListener('mouseenter', multi_select__mouseenter, false);
	this.addEventListener('mouseleave', multi_select__mouseleave, false);
	document.addEventListener('mouseup', multi_select__mouseup, false);

	var tmr = setTimeout(multi_select__longpress, 1200);
	multi_select__mouse.longpress_timer = tmr;

	evt.stopPropagation();
	return;
}

function multi_select__mouseenter(evt)
{
	if (multi_select__mouse) {
		$(multi_select__mouse.el).addClass('mousehold');
		multi_select__mouse.down = true;
	}
}

function multi_select__mouseleave(evt)
{
	if (multi_select__mouse) {
		$(multi_select__mouse.el).removeClass('mousehold');
		multi_select__mouse.down = false;

		// once pointer has moved off the button,
		// stop looking for a long-press to happen.

		if (multi_select__mouse.longpress_timer) {
			clearTimeout(multi_select__mouse.longpress_timer);
			multi_select__mouse.longpress_timer = null;
		}
	}
}

function multi_select__mouseup(evt)
{
	evt.preventDefault();

	if (multi_select__mouse) {

		if (multi_select__mouse.down) {

			var boxEl = multi_select__mouse.el;
			var cbEl = $('input.list_item_btn', boxEl).get(0);
			cbEl.checked = !cbEl.checked;
			multi_select__update_checks();

			$(boxEl).triggerHandler('toggled');
		}

		multi_select__mousecancel();
	}

	evt.stopPropagation();
	return;
}

function multi_select__get_selected()
{
	var found = [];
	$('.multi_select_icon_list .list_item').each(function(i,el) {
		if ($('input.list_item_btn', el).get(0).checked) {
			found.push(el.getAttribute('data-item-id'));
		}
	});
	return found;
}

function multi_select__update_checks()
{
	$('.multi_select_icon_list .list_item').each(function(i,el) {
		if ($('input.list_item_btn', el).get(0).checked) {
			$(el).addClass('selected');
		} else {
			$(el).removeClass('selected');
		}
	});
}

function multi_select__add_list_item_listeners($li)
{
	if ('ontouchstart' in window) {
		$li.get(0).addEventListener("touchstart", multi_select__mousedown, false);
		$li.get(0).addEventListener("touchend", multi_select__mouseup, false);
	}
	else {
		$li.mousedown(multi_select__mousedown);
	}
}

