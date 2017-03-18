function getCssProperty(element, property)
{
    return window.getComputedStyle(element, null).getPropertyValue(property);
}

function fontAwesomeIsLoaded()
{
    var span = document.createElement('span');
    var fontAwesomeIsLoaded = false;

    span.className = 'fa';
    span.style.display = 'none';
    document.body.insertBefore(span, document.body.firstChild);
    fontAwesomeIsLoaded = (getCssProperty(span, 'font-family') === 'FontAwesome');
    document.body.removeChild(span);

    return fontAwesomeIsLoaded;
}

function getFramework()
{
    if ((typeof $.fn.alert.Constructor.VERSION !== 'undefined') &&
        ($.fn.alert.Constructor.VERSION.charAt(0) === '3')
    ) {
        return "bootstrap3";
    }

    if ((typeof $.fn.alert.Constructor.VERSION !== undefined) &&
        ($.fn.alert.Constructor.VERSION.charAt(0) === '4')
    ) {
        return "bootstrap4";
    }

    return 'vanilla';
}

function insertCssLink(path) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = path;
    link.media = 'all';
    head.append(link);
}

if (! fontAwesomeIsLoaded()) {
    insertCssLink('/genealabs-laravel-casts/font-awesome.css');
}

window['genealabsLaravelCasts'] = window.genealabsLaravelCasts || {};
window.genealabsLaravelCasts['framework'] = getFramework();

if ((window.genealabsLaravelCasts.dateTimeLoaders || false) !== false) {
    if (typeof moment === 'undefined') {
        $.getScript('/genealabs-laravel-casts/moment.js', function() {});
    }

    if (window.genealabsLaravelCasts.framework === "bootstrap3") {
        insertCssLink('/genealabs-laravel-casts/bootstrap3-datetimepicker.css');
        $.getScript('/genealabs-laravel-casts/bootstrap3-datetimepicker.js', function() {
            window.genealabsLaravelCasts.dateTimeLoaders.forEach(function(dateTimeLoader) {
                dateTimeLoader();
            });
        });
    } else if (window.genealabsLaravelCasts.framework === "bootstrap4") {
        insertCssLink('/genealabs-laravel-casts/bootstrap4-datetimepicker.css');
        $.getScript('/genealabs-laravel-casts/bootstrap4-datetimepicker.js', function() {
            window.genealabsLaravelCasts.dateTimeLoaders.forEach(function(dateTimeLoader) {
                dateTimeLoader();
            });
        });
    }
}

if ((window.genealabsLaravelCasts.signatureLoaders || false) !== false) {
    insertCssLink('/genealabs-laravel-casts/signature-pad.css');
    $.getScript('/genealabs-laravel-casts/signature-pad.js', function() {
        window.genealabsLaravelCasts.signatureLoaders.forEach(function(signatureLoader) {
            signatureLoader();
        });
    });
}

if ((window.genealabsLaravelCasts.switchLoaders || false) !== false) {
    insertCssLink('/genealabs-laravel-casts/bootstrap-switch.css');
    $.getScript('/genealabs-laravel-casts/bootstrap-switch.js', function() {
        window.genealabsLaravelCasts.switchLoaders.forEach(function(switchLoader) {
            switchLoader();
        });
    });
}
