$(document).ready(function(){

var received = $('#received');

var input_airtemp = $('#input_airtemp');


var socket = new WebSocket("ws://fabfarm.local:8080/ws");
 
socket.onopen = function(){  
  console.log("connected"); 
  temp_aux = 0;
}; 

socket.onmessage = function (message) {
  console.log("receiving: " + message.data);
  received.append(message.data);
  received.append($('<br/>'));
  
  var wtf    = $('#received'); //keep scroll down in div
  var height = wtf[0].scrollHeight;
  wtf.scrollTop(height);
  
  temp_aux = temp_aux + 1;
  //airtemp.clear();
  input_airtemp.val(temp_aux);
  //airtemp.append($('<br/>'));
  
  $("#sensor0").text("valores");
  
  //get light value and print it
  //var str = "Hello world, welcome to the universe.";
  var n_light = message.data.indexOf("light = ");
  if (n_light > -1){
  	n_light += 8;
  	var light_value = message.data.substring(n_light, n_light + 3);
  	
  	$("#sens_light").css("background-color", "transparent");
  	$("#sens_light").text(light_value);
  }
  
  var n_humidity = message.data.indexOf("Humidity:");
    console.log("n_humidity ");
    console.log(n_humidity);
  if (n_humidity > -1){
  	n_humidity += 10;
  	var humidity_value = message.data.substring(n_humidity, n_humidity + 5);
  	
  	$("#sens_humidity").css("background-color", "transparent");
  	$("#sens_humidity").text(humidity_value+"%");
  }
  
  
};

socket.onclose = function(){
  console.log("disconnected"); 
};

var sendMessage = function(message) {
  console.log("sending:" + message.data);
  socket.send(message.data);
};


// GUI Stuff


// send a command to the serial port
$("#cmd_send").click(function(ev){
  ev.preventDefault();
  var cmd = $('#cmd_value').val();
  sendMessage({ 'data' : cmd});
  $('#cmd_value').val("");
});

$("#cmd_valve").click(function(ev){
  ev.preventDefault();
  var cmd = $("#cmd_valve").html()+"\n"
  //$('#cmd_value').val();
  sendMessage({ 'data' : cmd});
  //$('#cmd_value').val("");
    console.log($("#cmd_valve").html());
  if($("#cmd_valve").html() == "Open"){
  	$("#cmd_valve").html('Close');
  }
  else{
    $("#cmd_valve").html('Open');
  }
  
});

$('#clear').click(function(){
  received.empty();
});


});
