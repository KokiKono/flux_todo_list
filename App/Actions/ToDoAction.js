import dispatcher from '../Dispatcher/dispatcher';

export function addToDo(item){
  dispatcher.dispatch({type:'CREATE_TODO',item});
}
