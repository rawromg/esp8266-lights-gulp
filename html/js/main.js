$( document ).ready(function(){
	$('.leftmenu').sideNav({
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: true, // Choose whether you can drag to open on touch screens,
    });
    
    $('.rightmenu').sideNav({
	menuWidth: '100%',
    edge: 'right', // Choose the horizontal origin
    closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    draggable: false, // Choose whether you can drag to open on touch screens,
    });
    //Menu ^^
});




var connection = new WebSocket('ws://192.168.0.103:81/', ['arduino']);
	connection.onopen = function () {  connection.send('Connect ' + new Date()); }; 
	connection.onerror = function (error) {    console.log('WebSocket Error ', error);};
	connection.onmessage = function (e) {  
		console.log('Server: ', e.data);
		Materialize.toast('Websocket Connected', 4000)
	};
	connection.onclose = function(e) {
		console.log('Server: ', e.data);
		Materialize.toast('Websocket Disconnected', 4000)
	};




