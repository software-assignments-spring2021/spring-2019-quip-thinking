import io from 'socket.io-client';


const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'



const socket = io(API_URL);

export const createPrivateRoom = (roomName, playerName, cb = () => {}) => {
    socket.emit('create-private-room', {
        playerName,
        roomName,
    });
    socket.on('create-private-room', (res) => {
        cb(res.roomCode);
    });
}

export const joinPrivateRoom = (roomCode, playerName, cb = () => {}) => {
    socket.emit('join-private-room', {code: roomCode, name: playerName});
    socket.on('join-private-room', output => {
        cb(output);
    })
}

export const addPrompt = (prompt, cb = () => {}) => {
    socket.emit('add-prompt', {prompt});
}

export const getPlayers = (roomCode, cb = () => {}) => {
    socket.emit('get-players', { roomCode })
    socket.on('get-players', ({ players }) => {
        cb(players);
    })
}

export const subscribeToJoins = (cb = () => {}) => {
    socket.on('join-private-room', ({players}) => {
        cb(null,players);
    })
}

// export const sendVote = (id, code, quip,  cb = () => {}) => {
//     socket.emit('end-vote', {id, code, quip});
// }

export const sendVote = (id, code,  cb = () => {}) => {
    socket.emit('end-vote', {player: id, roomCode: code});
}

export const getInfo = (roomCode, cb = () => {}) => {
    socket.on('start-vote', ({prompts}) => {
        cb(prompts);
    })
}

export const startGame = (roomCode, cb = () => {}) => {
    socket.emit('start-game', { code: roomCode });
}

export const getPrompts = (roomCode, cb = () => {}) => {
    socket.on('start-game', msg => {
        cb(msg);
    });
}

export const answerPrompt = ( round, roomCode, answer, prompt, cb = () => {}) => {
    socket.emit('submit-answer', {round: round, roomCode: roomCode, ans: answer , prmpt: prompt});
}

export const answersSuccessful = (cb = () => {}) => {
    socket.on('submit-answer', msg => {
        cb(msg);
    })
}

export const startTimer = ( cb = () => {}) => {
    socket.emit('reset', {});

}

export const startVote = (round, roomCode, cb = () => {}) => {
  socket.emit('start-vote', {roomCode: roomCode, round: round});
}

export const endRound = (round, roomCode, cb = () => {}) => {
  socket.emit('start-vote', {roomCode: roomCode, round: round});
}

export const endVote = ( cb = () => {}) => {
  socket.on('end-vote', msg => {
      cb(msg);
  });
}

export const gotoVote = ( cb = () => {}) => {
    socket.on('start-vote', msg => {
        cb(msg);
    });
}

export const updateTimer = ( cb = () => {}) => {
    socket.on('timer',msg => {

        cb(msg);
  });
}

export default socket;
