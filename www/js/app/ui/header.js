/*global $, require, module */
var story = require('./story')
	, toLocal = require('./getLocalizedString')
	, localStrings = require('./localizedStrings')
	, loading = require('./loading');

$(document)
	.on('touchstart', 'header .show-menu', function (e) {
		$(e.currentTarget).addClass('active');
	})
	.on('touchend', 'header .show-menu', function (e) {
		var ui = $(e.currentTarget);
		setTimeout(function () {
			$('header').addClass('stay');
			if ($('section.menu').hasClass('active')) {
				showStoryList();
			} else {
				showMenu();
			}
			ui.removeClass('active');
		}, 100);
	})
	.on('touchstart', 'header .story .back', function (e) {
		$(e.currentTarget).addClass('active');
	})
	.on('touchend', 'header .story .back', function (e) {
		var ui = $(e.currentTarget);
		setTimeout(function () {
			showStoryList();
			ui.removeClass('active');
		}, 100);
	})
	.on('touchend', 'header .story-list .toggle-feed', function (e) {
		var $0 = e.currentTarget;
	    loading.show();
		$('.container section.story-list').fadeOut();
		setTimeout(function () {
		    var ai = $($0).hasClass("english-toggle");

			var activeIndex = $('.menu-item.active').index();

            $(document.body).removeClass(ai ? 'arabic-ui' : 'english-ui');
            $(document.body).addClass(ai ? 'english-ui' : 'arabic-ui');
            window.__languageForCarnegie = ai ? "en" : "ar";
            updateLanguageUI();

			$('.menu-item').eq(activeIndex).removeClass('active');
			var newItem = $('.menu-item').eq(ai ? 0 : 1);
			newItem.addClass('active');
			newItem.find('.menu-link').click();
		}, 100);
	});

addListeners();

function addListeners() {
  addListener('previous');
  addListener('next');
}

function removeListeners() {
  removeListener('previous');
  removeListener('next');
}

function removeListener(className) {
  if (className === 'previous' || className === 'next') {
    $(document)
			.off('touchstart', 'header .story .btn-group .' + className)
			.off('touchend', 'header .story .btn-group .' + className);
  }
}

function addListener(className) {
  if (className === 'previous' || className === 'next') {
    $(document)
			.on('touchstart', 'header .story .btn-group .' + className, function (e) {
				$(e.currentTarget).addClass('active');
				setTimeout(function () {
					story[className]();
				}, 0);
			})
			.on('touchend', 'header .story .btn-group .' + className, function (e) {
				var ui = $(e.currentTarget);
				removeListeners();
				setTimeout(function () {
					addListeners();
					ui.removeClass('active');
				}, 350)
			})
  }
}

function show(sel) {
	var sels = ['.menu', '.story', '.story-list']
		, $h = $('header')
		, $sel = $h.find(sel).stop(true);

	sels.splice(sels.indexOf(sel), 1);

	sels.forEach(function (el) {
		var $el = $h.find(el);

		$el.removeClass('active');
	});

  $sel.addClass('active');
}

function showStoryList() {
	$('section.story').removeClass('active');
	$('section.story-list').addClass('active');
	$('section.menu').removeClass('active');
	$('footer.story-footer').removeClass('active');
	show('.story-list');
	story.hide();
}

function showMenu() {
	$('section.menu').addClass('active');
	show('.menu');
}

function showStory() {
	$('header').removeClass('stay');
	$('section.menu').removeClass('active');
	$('footer.story-footer').addClass('active');
	$('section.story').addClass('active');
	show('.story');
}

function updateLanguageUI () {
	$('header .story .back .label').text(toLocal(localStrings.back));
	$('#loading-int').text(toLocal(localStrings.loading));
}

module.exports = {
	showStoryList: showStoryList
	, showMenu: showMenu
	, showStory: showStory
	, updateLanguageUI: updateLanguageUI
};