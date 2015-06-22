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
  var n_light = message.data.indexOf("light = ");
  if (n_light > -1){
  	n_light += 8;
  	var light_value = message.data.substring(n_light, n_light + 3);
  	
  	$("#sens_light").css("background-color", "transparent");
  	$("#sens_light").text(light_value);
  }
    //get Humidity value and print it
  var n_humidity = message.data.indexOf("Humidity:");
    //console.log("n_humidity ");
    //console.log(n_humidity);
  if (n_humidity > -1){
  	n_humidity += 10;
  	var humidity_value = message.data.substring(n_humidity, n_humidity + 5);
  	
  	$("#sens_humidity").css("background-color", "transparent");
  	$("#sens_humidity").text(humidity_value+"%");
  }
    //get moisture value and print it
  var n_moisture = message.data.indexOf("moisture = ");
  if (n_moisture > -1){
  	n_moisture += 10;
  	var moisture_value = message.data.substring(n_moisture, n_moisture + 5);
  	
  	$("#sens_moisture").css("background-color", "transparent");
  	$("#sens_moisture").text(moisture_value);
  }
  
  //get temperature value and print it
  var n_temperature = message.data.indexOf("Temperature: ");
      console.log("n_temperature ");
    console.log(n_temperature);
  if (n_temperature > -1){
  	n_temperature += 13;
  	var temperature_value = message.data.substring(n_temperature, n_temperature + 5);
  	
  	$("#sens_temperature").css("background-color", "transparent");
  	$("#sens_temperature").text(temperature_value+"ºC");
  }
  
    //get tap close signal and print it
  var n_tap = message.data.indexOf("Close");
      console.log("n_tap ");
    console.log(n_tap);
  if (n_tap > -1){
  	$("#sens_tap").css("background-color", "transparent");
  	$("#sens_tap").text("");
  	$("#sens_temperature").text("Close it");
  }
  
      //get tap open signal and print it
  var n_tap2 = message.data.indexOf("Open");
      console.log("n_tap2 ");
    console.log(n_tap2);
  if (n_tap2 > -1){
  	$("#sens_tap").css("background-color", "transparent");
  	$("#sens_tap").text("Close it");
  	$("#sens_temperature").text("Close it");
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
  
$("#cmd_tap").click(function(ev){
  ev.preventDefault();
  var cmd = $("#cmd_tap").val()+"\n"
  //$('#cmd_value').val();
  sendMessage({ 'data' : cmd});
  //$('#cmd_value').val("");
    console.log($("#cmd_tap").val());
  if($("#cmd_tap").val() == "Open"){
  	$("#cmd_tap").val('Close');
  }
  else{
    $("#cmd_tap").val('Open');
  }
  
});

$('#clear').click(function(){
  received.empty();
});


});
