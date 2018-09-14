const initialState = {count: 0}
const incrementAction = {type: 'INC'}
const decrementAction = {type: 'DEC'}

function incrementReducer(state = initialState, action){
  switch(action.type){
    case 'INC': {
      return {count: state.count + 1};
    }
    case 'DEC': {
      return {count: state.count - 1};
    }
    default: return state;
  }
}

function createStore(reducer, initialState){
  let state = initialState || reducer(undefined, {});
  let subscriptions = [];

  return {
    dispatch(action){
      state = reducer(state, action);
      subscriptions.forEach(subscription => subscription());
    },
    getState(){
      return state;
    },
    subscribe(cb){
      subscriptions.push(cb);
      return function(){
        subscriptions = subscriptions.filter(sub => sub != cb);
      }
    }
  }
}

const store = createStore(incrementReducer, initialState);
const subcription = store.subscribe(() => console.log(store.getState()));
store.dispatch(incrementAction);
store.dispatch(decrementAction);
subcription()
