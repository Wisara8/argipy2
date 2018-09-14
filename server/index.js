
const WebSocket = require('ws');
const {createStore} = require('redux');
const {gameLogicReducer, addPlayer, removePlayer, randomInt} = require('./game-logic');

const wss = new WebSocket.Server({ port: 8080 });
const store = createStore(gameLogicReducer);
store.subscribe(() => {
  wss.clients.forEach(client => {
    if(client.readyState === WebSocket.OPEN){
      client.send(JSON.stringify(store.getState()));
    }
  })
})
const consonants = 'bcdfghjklmnpqrstvwxyz\''
const vowels = 'aeiouyr'
function makeName(n = 3){
  if(n <= 0) return '';

  return consonants[randomInt(consonants.length)] + vowels[randomInt(vowels.length)] + makeName(n - 1);
}
wss.on('connection', function connection(ws) {
  const name = makeName();
  const playerAction = addPlayer(name);
  const {payload: {id}} = playerAction;
  store.dispatch(playerAction);

  // ws.on('message', function incoming(message) {
  //   console.log('received: %s', message);
  // });
  ws.on('close', () => {
    store.dispatch(removePlayer(id));
  })
});