import { ALL_CLASSES, CLASSES_CREATED } from "../actions/actions";

const initialState = {
  class: {},
  allClasses: [],
  classCreated: true,
};

const classReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_CLASSES:
        return {
            ...state,
            allClasses: payload
        }
    case CLASSES_CREATED:
        return {
            ...state,
            class: payload,
            classCreated: true
        }

    default:
      return state;
  }
};

export default classReducer;
