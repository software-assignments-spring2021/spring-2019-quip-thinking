import io from 'socket.io-client'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337'
const socket = io('http://localhost:8000');

export const createPrivateRoom = (roomName, playerName, cb = () => {}) => {
    socket.emit('create-private-room', {
        playerName,
        roomName
    })
    socket.on('create-private-room', (res) => {
        cb(res.roomCode)
    })
}

export const joinPrivateRoom = (roomCode, playerName, cb = () => {}) => {
    socket.emit('join-private-room', {code: roomCode, name: playerName})
    socket.on('join-private-room', output => {
        cb(output)
    })
}

export const addPrompt = (prompt, cb = () => {}) => {
    socket.emit('add-prompt', {prompt});
}

export const getPlayers = (roomCode, cb = () => {}) => {
    socket.emit('get-players', { roomCode })
    socket.on('get-players', ({ players }) => {
        cb(players)
    })
}

export const subscribeToJoins = (cb = () => {}) => {
    socket.on('join-private-room', ({players}) => {
        console.log("EVENT HEARD")
        cb(null,players)
    })
}

export const sendVote = (id, code, player,  cb = () => {}) => {
    socket.emit('end-vote', {id, code, player});
}

export const getInfo = (roomCode, cb = () => {}) => {
    socket.on('start-vote', ({prompts}) => {
        cb(prompts)
    })
}

export const startGame = (roomCode, cb = () => {}) => {
    socket.emit('start-game', { code: roomCode })
}

export const getPrompts = (roomCode, cb = () => {}) => {
    socket.on('start-game', msg => {
        cb(msg)
    })
}

export const answerPrompt = ( round, roomcode, answer, prompt, cb = () => {}) => {
    console.log('happening');
    socket.emit('submit-answer', {round: round, roomCode: roomcode, ans: answer , prmpt: prompt})
    socket.on('submit-answer', msg => {
        if(msg=='success'){
          
        }
    })
}

export default socket
