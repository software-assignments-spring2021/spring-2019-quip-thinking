import React from "react";

// notes: https://robdodson.me/building-a-countdown-timer-with-socket-dot-io/

var countdown = 90000;

timer(function() {
	countdown--;

	io.sockets.emit("timer", {countdown: countdown});

}, 5000);

io.sockets.on("on", function(socket) {
	socket.on("reset", function(data) {
		countdown = 90000;

		io.sockets.emit("timer", {countdown: countdown});
	});
});

// var count = 90;

// var counter = setInterval(timer, 1000);

// function timer() {
// 	count -= 1;

// 	if (count <= 0) {
// 		clearInterval(counter);
// 		return;
// 	}

// }

// var time = 90;

// var timer = setInterval(function() {
// 	// document.getElementById("countdown").innerHTML = time + " seconds";
// 	time -= 1;

// 	if (time <= 0) {
// 		clearInterval(timer);

// 		return;

// 		// document.getElementById("countdown").innerHTML = "time's up!";
// 	}

// 	document.getElementById("timer").innerHTML = time + " seconds";
// }, 1000);

// const timer = () => {
// 	return(
// 			<div className="timer">

// 				<p> Time Left: </p>

// 				<Row>

// 				<Col>

// 					<button onclick="setTimeout(myFunction, 90000)">timer</button>

// 					<script>
// 						function myFunction() {
// 							alert("time over");
// 						}
// 					</script>

// 				</Col>

// 				</Row>

// 			</div>
// 	)
// }

// export default timer;