const mocha = require('mocha');
const should = require('chai').should();
const expect = require('chai').expect;
const server = require('./../server.js');
const http = require('http');

const io = require('socket.io-client');
const url = "http://localhost:8080";

describe('Socket tests', function() {
	let testServer = undefined;
	let trand;
	let name;

	const options = {
		transports: ['websocket'],
		'force new connection': true
	};

	before(function(done) {
		testServer = server;
		console.log("Starting the server");
		done();
	});

	it("should return a random for the room code", function(done) {
		const client = io.connect(url, options);
		
		client.once('connect', function() {
		
			client.once('create-private-room', function(obj) {
				trand = obj.roomCode;
				(obj.roomCode).should.be.a('number');
				client.disconnect();
				done();
			});

			console.log(` Creating privatee room \n`);
			client.emit('create-private-room', " ");
		});
	});

	it('should join game with valid code', function(done) {
		const client = io.connect(url, options);
		name = 'Alice';

		client.once('connect', function() {
			
			client.once('join-private-room', function(msg) {
				(msg.msg).should.equal('success');
				client.disconnect();
				done();
			});
			
			//send random code
			console.log(`Sent random ${trand}\n`);
			client.emit('join-private-room', { code: trand, name: name });
		});

	});

	it('should not start game unless minimum of 3 players', function(done) {
		const client = io.connect(url, options) 

		client.once('connect', function() {
			client.once('start-game', function(msg) {
				(msg.start).should.equal('false');
				client.disconnect();
				done();
			});

			client.emit('start-game', { code: trand });

		});
	
	});

	it('should return array to clients when game starts', function(done) {
		const client = io.connect(url, options);

		client.once('connect', function() {
			client.once('join-private-room', function(msg) {
				(msg.msg).should.equal('success');
//				client2.disconnect();
				//done();
			});

			client.emit('join-private-room', { code: trand, name: 'client' });		

			const client2 = io.connect(url, options);
			const client3 = io.connect(url, options);

			client2.once('connect', function() {
					client2.once('join-private-room', function(msg) {
						(msg.msg).should.equal('success');
//						client2.disconnect();
						//done();
					});
					client2.once('start-game', function(msg) {
						(msg.prompts).should.be.an('array');
						client2.disconnect();
						//done();
					});
				client2.emit('join-private-room', { code: trand, name: 'client2' });	
			});
	
			client3.once('connect', function() {
					client3.once('join-private-room', function(msg) {
						(msg.msg).should.equal('success');
//						client3.disconnect();
//						done();
					});
					client3.once('start-game', function(msg) {
						(msg.prompts).should.be.an('array');
						client3.disconnect();
//						done();
					});
				client3.emit('join-private-room', { code: trand, name: 'client3' });
				client.emit('start-game', { code: trand });
			});

			client.on('start-game', function(msg) {
				(msg.prompts).should.be.an('array');
//				client.disconnect();
//				done();
				client.on('submit-answer', function(msg2) {
					console.log('submit-answer', msg2, msg, msg.prompts[0]);
					msg2.should.equal('success');
					client.disconnect();
					done();
				});

				client.emit('submit-answer', {round:1, roomCode:trand, prmpt: msg.prompts[1], ans: 'fowl'});
			});

//			client.emit('start-game', { code: trand });

		});
	
	});
	

	it('should remove code when game is done', function(done) {
		const client = io.connect(url, options);
		
		client.once('connect', function() {
		
			client.once('game-over', function(rand) {
				rand.should.have.lengthOf(0);
				trand = undefined;	//code is now invalid
				client.disconnect();
				done();
			});

			//send random code
			client.emit('game-over', trand);
		});
	});

	it('should not join game with invalid code', function(done) {
		const client = io.connect(url, options);
		
		console.log(`Sent random ${trand}\n`);
		client.once('connect', function() {
			
			client.once('join-private-room', function(msg) {
				(msg.msg).should.equal('code invalid');
				client.disconnect();
				done();
			});
			
			//send random code
			console.log(`Sent random ${trand}\n`);
			client.emit('join-private-room', { code: trand, name:'' });
		});

	});
});
