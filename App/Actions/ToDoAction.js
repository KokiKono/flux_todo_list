import dispatcher from '../Dispatcher/dispatcher';

export function addToDo(item){
  dispatcher.dispatch({type:'CREATE_TODO',item});
}
export function deleteToDo(item){
  dispatcher.dispatch({type:'DELETE_TODO',item});
}
export function updateToDo(item){
  dispatcher.dispatch({type:'UPDATE_TODO',item});
}
