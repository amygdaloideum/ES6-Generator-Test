function* GameGen(engine, initialState) {
  const states = [initialState];
  while(true) {
    const lastState =  states.slice(-1).pop();
    const action = yield lastState;
    states.push(engine(lastState, action));
  }
}

const Engine = (state, action) => {
  const INCREASE_LIFE = 'INCREASE_LIFE';
  const DECREASE_LIFE = 'DECREASE_LIFE';

  switch(action){
    case INCREASE_LIFE: 
      return { life: ++state.life };
    case DECREASE_LIFE:
      return { life: --state.life };
    default:
      return state;
  }
};

const initialState = {
  life: 20,
}

const gen = GameGen(Engine, initialState);

console.log(gen.next().value);
console.log(gen.next('INCREASE_LIFE').value);
console.log(gen.next('INCREASE_LIFE').value);
console.log(gen.next('INCREASE_LIFE').value);
console.log(gen.next('INCREASE_LIFE').value);
console.log(gen.next('DECREASE_LIFE').value);
console.log(gen.next('DECREASE_LIFE').value);
console.log(gen.next('DECREASE_LIFE').value);