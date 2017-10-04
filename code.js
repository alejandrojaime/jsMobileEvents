//Función para que el navegador reconozca los gestos de los teléfonos móviles.
function addMobileEvents(elemento) {

    //Posición inicial y final del puntero.
    var start = { x: 0, y: 0 };
    var end = { x: 0, y: 0 };

    //Al comenzar a moverse guardo la posición de inicio
    elemento.addEventListener('touchstart', function(e) {
        var ev = e || window.event || event;
        start.x = ev.screenX || ev.pageX || ev.changedTouches[0].pageX;
        start.y = ev.screenY || ev.pageY || ev.changedTouches[0].pageY;
    }, {passive: true});

    //Al terminar de moverse guardo la posición final
    elemento.addEventListener('touchend', function(e) {
        var ev = e || window.event || event;
        end.x = ev.screenX || ev.pageX || ev.changedTouches[0].pageX;
        end.y = ev.screenY || ev.pageY || ev.changedTouches[0].pageY;
        handleGesure(this);
    }, {passive: true});

    //Función para lanzar cada evento de forma Cross Browser 
    //(si no se hace así puede no funcionar en todos los móviles).
    function handleGesure(elem) {

        //El margen mínimo de pixels que tiene que mover el dedo para que se considere "swipe" y no "tap".
        var margen = 50;

        //Si tiene jQuery
        if (window.jQuery) {
            if (end.x < (start.x - margen)) { //izquierda
                $(elem).trigger('swipeleft');
            }
            if (end.x > (start.x + margen)) { //derecha
                $(elem).trigger('swiperight');
            }
            if (end.y < start.y) { //abajo
                $(elem).trigger('swipedown');
            }
            if (end.y > start.y) { //arriba
                $(elem).trigger('swipetop');
            }
            if (end.y == start.y && end.x == start.x) { //tap
                $(elem).trigger('tap');
            }
        }
        //Si no hay jQuery y si hay createEvent
        else if (document.createEvent) {
            if (end.x < (start.x - margen)) { //izquierda
                var event = new Event('swipeleft');
                elem.dispatchEvent(event);
            }
            if (end.x > (start.x + margen)) { //derecha
                var event = new Event('swiperight');
                elem.dispatchEvent(event);
            }
            if (end.y < start.y) { //abajo
                var event = new Event('swipedown');
                elem.dispatchEvent(event);
            }
            if (end.y > start.y) { //arriba
                var event = new Event('swipetop');
                elem.dispatchEvent(event);
            }
            if (end.y == start.y && end.x == start.x) { //tap
                var event = new Event('tap');
                elem.dispatchEvent(event);
            }

            //Si está utilizando un navegador antiguo
        } else {
            event = doc.createEventObject();
            if (end.x < (start.x - margen)) { //izquierda
                elem.fireEvent('swipeleft' + 'swipeleft', event);
            }
            if (end.x > (start.x + margen)) { //derecha
                elem.fireEvent('swiperight' + 'swiperight', event);
            }
            if (end.y < start.y) { //abajo
                elem.fireEvent('swipedown' + 'swipedown', event);
            }
            if (end.y > start.y) { //arriba
                elem.fireEvent('swipetop' + 'swipetop', event);
            }
            if (end.y == start.y && end.x == start.x) { //tap
                elem.fireEvent('tap' + 'tap', event);
            }
        }
    }
}
