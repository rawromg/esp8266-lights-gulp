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
    $('ul.tabs').tabs({
    swipeable: true,
    });
      $('.modal').modal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      inDuration: 300, // Transition in duration
      outDuration: 200, // Transition out duration
      startingTop: '4%', // Starting top style attribute
      endingTop: '10%', // Ending top style attribute
  });
    $(".carousel").css({ "height": "600px"});

// Sliders
var sliders = document.getElementsByClassName('hbc');
for ( var i = 0; i < sliders.length; i++ ) {

    noUiSlider.create(sliders[i], {
        start: 0,
        connect: [true, false],
        orientation: "horizontal",
        range: {
            'min': 0,
            'max': 1023
        },
    });

    sliders[i].noUiSlider.on('slide', addValues);
}

var palettes = document.getElementById('paletteselect');
noUiSlider.create(palettes, {
        start: 0,
        connect: [true, false],
        orientation: "horizontal",
        step: 1,
        range: {
            'min': 0,
            'max': 33
        },
    });
    
palettes.noUiSlider.on('slide', sendPalette);



function sendPalette(){
var pal = parseInt(palettes.noUiSlider.get().split('.')[0].toString(16));
var palstr = '*'+pal;
connection.send(palstr);
console.log(palstr);
}



function addValues(){
    var allValues = [];

    for (var i = 0; i < sliders.length; i++) {
        allValues.push(sliders[i].noUiSlider.get().split('.')[0]);
    };

var rgb = allValues[0] << 20 | allValues[1] << 10 | allValues[2];
var rgbstr = '#' + rgb.toString(16);
connection.send(rgbstr);
    console.log(rgbstr); 

}
// Sliders End


});








var connection = new WebSocket('ws://76.171.1.52:81/', ['arduino']);
		//Sync ICON INITIALIZE
	connection.onopen = function () {  connection.send('Connect ' + new Date()); }; 
	connection.onerror = function (error) {    console.log('WebSocket Error ', error);};
	connection.onmessage = function (e) {  
		console.log('Server: ', e.data);
		Materialize.toast('Websocket Connected', 4000)
		//check ICON UPDATE
	};
	connection.onclose = function(e) {
		console.log('Server: ', e.data);
		Materialize.toast('Websocket Disconnected', 4000)
		//sync_problem ICON UPDATE
	};