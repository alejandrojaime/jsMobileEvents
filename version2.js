$(function(){
		var elem = window;
		elem.start = { x: 0, y: 0 };
		elem.end = { x: 0, y: 0 };
		$(elem).on('touchstart', function(e) {
			var ev = e || window.event || event;
			elem.start.x = ev.screenX || ev.pageX || ev.changedTouches[0].pageX;
			elem.start.y = ev.screenY || ev.pageY || ev.changedTouches[0].pageY;
		});
		$(elem).on('touchend', function(e) {
			var ev = e || window.event || event;
			ev.preventDefault();ev.stopPropagation();ev.cancelBuble = true;
			elem.end.x = ev.screenX || ev.pageX || ev.changedTouches[0].pageX;
			elem.end.y = ev.screenY || ev.pageY || ev.changedTouches[0].pageY;
			var margen = 50;
			if (elem.end.x < (elem.start.x - margen)) { //izquierda
				$.event.trigger('swipeleft', [{type:'swipeleft', time: new Date()}], ev.target);
			}else if (elem.end.x > (elem.start.x + margen)) { //derecha
				$.event.trigger('swiperight', [{type:'swiperight', time: new Date()}], ev.target);
			}else if (elem.end.y < elem.start.y) { //abajo
				$.event.trigger('swipedown', [{type:'swipedown', time: new Date()}], ev.target);
			}else if (elem.end.y > elem.start.y) { //arriba
				$.event.trigger('swipetop', [{type:'swipetop', time: new Date()}], ev.target);
			}else if (elem.end.y == elem.start.y && elem.end.x == elem.start.x) { //tap
				$.event.trigger('tap', [{type:'tap', time: new Date()}], ev.target);
			}
		});
	});

	$('div').on('swipeleft swiperight swipedown swipetop tap', function(e){
		var ev = e || window.event || event;
		console.log(ev.type+' '+ev.target);
	});
