const redux = require("redux");
const produce = require("immer").produce;

const initialState = {
  name: "James",
  address: {
    street: "123 Main st",
    city: "Boston",
    state: "CA",
  },
};

const STREET_UPDATED = "STREET_UPDATED";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      }); //immer package to update the state which is required
    default:
      return state;
  }
};

const store = redux.createStore(reducer);
console.log("initial State", store.getState());

const unsubscribe = store.subscribe(() => {
  console.log("updated street", store.getState());
});

store.dispatch(updateStreet("456 main st"));
unsubscribe();
