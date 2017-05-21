import dispatcher from '../Dispatcher/dispatcher';

export function createGroup(item){
  dispatcher.dispatch({type:'CREATE_GROUP',item});
}
export function deleteToDo(item){
  dispatcher.dispatch({type:'ADD_TODO',item});
}
