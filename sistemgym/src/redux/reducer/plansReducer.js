import { ALL_PLANS, PLAN_CREATED } from "../actions/actions";


const initialState = {
  plan: {},
  allPlans: [],
  planCreated: false,
};

const plansReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case PLAN_CREATED:
        return{
            ...state,
            planCreated: true,
            plan: payload
        }
    case ALL_PLANS:
        return{
            ...state,
            allPlans: payload
        }
    default:
      return state;
  }
};

export default plansReducer;
