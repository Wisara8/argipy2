const width = 50;
const height = 50;

function randomInt(maxExclusive){
  return Math.floor(Math.random() * maxExclusive);
}

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function randomId(n = 6){
  if(n <= 0) return '';
  return alphabet[randomInt(alphabet.length)] + randomId(n - 1);
}

function randomPos(){
  return {x: randomInt(width), y: randomInt(height)};
}
const initialState = {
  gridsize: {width, height},
  players: {},
  treasures: [randomPos()]
}

function addPlayer(name){
  return {
    type: 'ADD_PLAYER',
    payload: {
      name,
      id: randomId(),
      pos: randomPos()
    }
  }
}

function removePlayer(id){
  return {
    type: 'REMOVE_PLAYER',
    payload: id
  };
}

function gameLogicReducer(state = initialState, {type, payload}){
  switch(type){
    case 'ADD_PLAYER': {
      return {
        ...state,
        players: {
          ...state.players,
          [payload.id]: payload
        }
      }
    }
    case 'REMOVE_PLAYER': {
      const players = {...state.players};
      delete players[payload]
      return {
        ...state,
        players: players
      };
    }
    default: return state;
  }
}

module.exports = {
  gameLogicReducer,
  addPlayer,
  removePlayer,
  randomInt
};