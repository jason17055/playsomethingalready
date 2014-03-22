var PACKAGE='playsomething';

function locationform_submit()
{
	location.href="pickgames.html";
}

var editperson_id = null;
function editperson_remove()
{
	mystor_remove_from_set(PACKAGE+'.known_persons', editperson_id);
	hide_dialog();

	location.reload();
}

function person_longpress(evt)
{
	var boxEl = this;
	var id = boxEl.getAttribute('data-item-id');
	var p = {
		'name': localStorage.getItem(PACKAGE+'.persons['+id+'].name')
		};

	editperson_id = id;
	$('#dimmer').show();
	$('#edit_person_dialog .person_name').text(p.name);
	$('#edit_person_dialog').show();

	return true;
}

function init_person_list(container_el)
{
	var person_ids = mystor_get_list(PACKAGE+'.known_persons');

	for (var i = 0; i < person_ids.length; i++) {
		var id = person_ids[i];
		var p = {
			'name': localStorage.getItem(PACKAGE+'.persons['+id+'].name')
			};

		var $box = $('.template', container_el).clone();
		$box.removeClass('template');
		$('.list_item_icon', $box).attr('src',
			'images/generic_person.png'
			);
		$('.list_item_label', $box).text(p.name);

		$box.attr('data-item-id', id);
		multi_select__add_list_item_listeners($box);
		$(container_el).append($box);

		$box.on('longpress', person_longpress);
	}
}

var editgame_id = null;
function editgame_remove()
{
	mystor_remove_from_set(PACKAGE+'.known_games', editgame_id);
	hide_dialog();

	location.reload();
}

function game_longpress(evt)
{
	var boxEl = this;
	var id = boxEl.getAttribute('data-item-id');
	var g = {
		'name': localStorage.getItem(PACKAGE+'.games['+id+'].name'),
		'icon': localStorage.getItem(PACKAGE+'.games['+id+'].icon')
		};

	editgame_id = id;
	$('#dimmer').show();
	$('#edit_game_dialog .game_name').text(g.name);
	$('#edit_game_dialog .game_icon').attr('src',
			g.icon ? ('images/games/'+g.icon+'.png') :
				'images/generic_game.png'
			);
	$('#edit_game_dialog').show();

	return true;
}

function init_game_list(container_el)
{
	var game_ids = mystor_get_list(PACKAGE+'.known_games');

	for (var i = 0; i < game_ids.length; i++) {
		var id = game_ids[i];
		var g = {
			'name': localStorage.getItem(PACKAGE+'.games['+id+'].name'),
			'icon': localStorage.getItem(PACKAGE+'.games['+id+'].icon')
			};

		var $box = $('.template', container_el).clone();
		$box.removeClass('template');
		$('.list_item_icon', $box).attr('src',
			g.icon ? ('images/games/'+g.icon+'.png') :
				'images/generic_game.png'
			);
		$('.list_item_label', $box).text(g.name);

		$box.attr('data-item-id', id);
		multi_select__add_list_item_listeners($box);
		$(container_el).append($box);

		$box.on('longpress', game_longpress);
	}

}

function hide_dialog()
{
	$('#dimmer').hide();
	$('.dialog').hide();
}

function other_game_clicked()
{
	var f = document.newgame_form;
	f.game_name.value = '';
	f.game_icon.value = '';
	f.players_range.value = '';

	$('#dimmer').show();
	$('#new_game_dialog').show();
}

function next_id()
{
	var last_id = +(localStorage.getItem(PACKAGE+'.last_dynamic_id') || 0);
	last_id--;
	localStorage.setItem(PACKAGE+'.last_dynamic_id', last_id);
	return last_id;
}

function mystor_get_list(key)
{
	var x = localStorage.getItem(key);
	return x ? x.split(',') : [];
}

function mystor_add_to_list(key, value)
{
	var a = mystor_get_list(key);
	a.push(value);
	localStorage.setItem(key, a.join(','));
}

function mystor_remove_from_set(set_name, value)
{
	// stringify
	value = ""+value;

	var a = mystor_get_list(set_name);
	var any_found = false;
	var b = [];
	for (var i = 0; i < a.length; i++) {
		if (a[i] == value) {
			any_found = true;
		}
		else {
			b.push(a[i]);
		}
	}
	if (any_found) {
		localStorage.setItem(set_name, b.join(','));
	}
	return any_found;
}

function newgame_submit()
{
	var f = document.newgame_form;
	if (f.game_name.value == '') {
		alert("Name is missing.");
		return;
	}

	var id = next_id();
	localStorage.setItem(PACKAGE+'.games['+id+'].name', f.game_name.value);
	localStorage.setItem(PACKAGE+'.games['+id+'].icon', f.game_icon.value);
	localStorage.setItem(PACKAGE+'.games['+id+'].players_range', f.players_range.value);

	mystor_add_to_list(PACKAGE+'.known_games', id);
	location.reload();
}

function newgame_cancel()
{
	hide_dialog();
}

function newperson_clicked()
{
	var f = document.newperson_form;
	f.person_name.value = '';

	$('#dimmer').show();
	$('#new_person_dialog').show();
}

function newperson_submit()
{
	var f = document.newperson_form;
	if (f.person_name.value == '') {
		alert("Name is missing.");
		return;
	}

	var id = next_id();
	localStorage.setItem(PACKAGE+'.persons['+id+'].name', f.person_name.value);

	mystor_add_to_list(PACKAGE+'.known_persons', id);
	location.reload();
}

function newperson_cancel()
{
	hide_dialog();
}

function pickgames_back_clicked()
{
	location.href = "index.html";
}

function pickgames_next_clicked()
{
	location.href = "pickpersons.html";
}

function pickpersons_back_clicked()
{
	location.href = "pickgames.html";
}

function pickpersons_next_clicked()
{
	alert('not implemented');
}

$(function() { // on page ready

	$('.game_list').each(function(i,el) { init_game_list(el); });
	$('.persons_list').each(function(i,el) { init_person_list(el); });

});
