import dispatcher from '../Dispatcher/dispatcher';

export function addToDo(item){
  dispatcher.dispatch({type:'CREATE_TODO',item});
}
export function deleteToDo(item){
  dispatcher.dispatch({type:'DELETE_TODO',item});
}
