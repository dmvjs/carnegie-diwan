var config = require('../app/config')
	, toLocal = require('../app/ui/getLocalizedString')
	, localStrings = require('../app/ui/localizedStrings');

function alert(message, callback, title, buttonLabel) {
	var ok = toLocal(localStrings.ok) || "OK";
	navigator.notification.alert(message, callback, title || toLocal(localStrings.diwan) || config.appName, buttonLabel || ok);
}

function confirm(message, callback, title, buttonLabels) {
	//title: defaults to 'Confirm'
	//buttonLabels: defaults to [OK, Cancel]
	var ok = toLocal(localStrings.ok) || "OK";
	var cancel = toLocal(localStrings.cancel) || "Cancel";
	var defaults = [ok, cancel];
	navigator.notification.confirm(message, callback, title || toLocal(localStrings.diwan) || config.appName, buttonLabels || defaults);
}

module.exports = {
	alert: alert,
	confirm: confirm
};