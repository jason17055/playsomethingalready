function locationform_submit()
{
	location.href="pickgames.html";
}

function multi_select__mousedown(evt)
{
	evt.preventDefault();
	$(this).addClass('mousehold');

	evt.stopPropagation();
	return;
}

function multi_select__mouseup(evt)
{
	evt.preventDefault();
	$(this).removeClass('mousehold');

	var cbEl = $('input.list_item_btn', this).get(0);
	cbEl.checked = !cbEl.checked;

	multi_select__update_checks();

	evt.stopPropagation();
	return;
}

function multi_select__update_checks()
{
	var found = [];
	$('.multi_select_icon_list .list_item').each(function(i,el) {
		if ($('input.list_item_btn', el).get(0).checked) {
			$(el).addClass('selected');
			found.push(el.getAttribute('data-item-id'));
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
		$li.mouseup(multi_select__mouseup);
	}
}

function init_game_list(container_el)
{
	for (var i = 0; i < 10; i++) {
		var $box = $('.template', container_el).clone();
		$box.removeClass('template');
		$('.list_item_icon', $box).attr('src', 'images/person_icon.png');
		$('.list_item_label', $box).text('Dominion'+i);

		$box.attr('data-item-id', 'Dominion'+i);
		multi_select__add_list_item_listeners($box);
		$(container_el).append($box);
	}

}

$(function() { // on page ready

	$('.game_list').each(function(i,el) { init_game_list(el); });

});
