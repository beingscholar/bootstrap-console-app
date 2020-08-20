const initState = {
  usersList: []
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_USERS_LIST":
      return { data: action.payload };
    default:
      return state;
  }
};

export default usersReducer;
