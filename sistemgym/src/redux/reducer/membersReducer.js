import { ALL_MEMBERS, NEW_MEMBER } from "../actions/actions";

const initialState = {
  member: {},
  allMembers: [],
  memberCreated: true,
};

const membersReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_MEMBERS:
      return {
        ...state,
        allMembers: payload,
      };
    case NEW_MEMBER:
      return {
        ...state,
        memberCreated: true,
        member: payload,
      };
    default:
      return state;
  }
};

export default membersReducer;
