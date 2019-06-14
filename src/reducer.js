


const defaultState={
  shows:[],
  bookmarks:[],
  potatoes:[],
  current_user: null,
  comments:[],
  selectShow:{}
}


function reducer(state=defaultState, action){

  switch(action.type){
    case "SET_CURRENT_USER":
    return{...state, current_user: action.payload}
      case "DELETE_CURRENT_USER":
      return{...state, current_user: action.payload}
      case "ADD_SHOWS":
      return{...state, shows: action.payload}
      case "ADD_BOOKMARK":
      return{...state,bookmarks:[...state.bookmarks,action.payload]}
      case "ADD_BOOKMARKS":
      return{...state,bookmarks: action.payload}
      case "ADD_SELECT_SHOW":
      return{...state,selectShow:action.payload}
      case "ADD_COMMENT":
      return{...state,comments:[...state.comments,action.payload]}
      case "ADD_COMMENTS":
      return{...state,comments:action.payload}
    default:
return state
  }
}













export default reducer
