$(document).ready(function(){

var received = $('#received');


var socket = new WebSocket("ws://fabfarm.local:8080/ws");
 
socket.onopen = function(){  
  console.log("connected"); 
}; 

socket.onmessage = function (message) {
  console.log("receiving: " + message.data);
  received.append(message.data);
  received.append($('<br/>'));
  
  var wtf    = $('#received'); //keep scroll down in div
  var height = wtf[0].scrollHeight;
  wtf.scrollTop(height);
  
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
