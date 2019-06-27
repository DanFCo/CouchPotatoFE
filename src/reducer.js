


const defaultState={
  shows:[],
  bookmarks:[],
  potatoes:[],
  current_user: null,
  comments:[],
  selectShow:{},
  hottestPotato: {}
}


function reducer(state=defaultState, action){

  switch(action.type){
    case "SET_CURRENT_USER":
    return{...state, current_user: action.payload}
      case "DELETE_CURRENT_USER":
      return{...state, current_user: action.payload, bookmarks:[], potatoes:[]}
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
      case "ADD_POTATOES":
      return{...state, potatoes:action.payload}
      case "REMOVE_POTATO":
      return{...state,potatoes: filterPotato(action.payload, state.potatoes)}
      case "REMOVE_BOOKMARK":
      return{...state,bookmarks: filterBookmark(action.payload, state.bookmarks)}
      case "ADD_HOT_POTATO":
      return{...state,hottestPotato:action.payload}
    default:
return state
  }
}


const filterPotato = (potato,state) =>{
let pots = [...state]
let newArr = pots.filter(pot =>{ return pot.id !== potato.id})
return newArr
}

const filterBookmark = (bkShow,state) =>{
  let shows = [...state]
  let newArr = shows.filter(show =>{return show.id !== bkShow.id})
  return newArr
}











export default reducer
