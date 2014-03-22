function locationform_submit()
{
	location.href="pickgames.html";
}


function init_game_list(container_el)
{
	for (var i = 0; i < 10; i++) {
		var $box = $('.template', container_el).clone();
		$box.removeClass('template');
		$('.list_item_icon', $box).attr('src', 'images/person_icon.png');
		$('.list_item_label', $box).text('Dominion'+i);
		$(container_el).append($box);
	}

}

$(function() { // on page ready

	$('.game_list').each(function(i,el) { init_game_list(el); });

});
