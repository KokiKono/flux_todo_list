import dispatcher from '../Dispatcher/dispatcher';

export function updateDraft(item){
  dispatcher.dispatch({type:'UPDATE_DRAFT',item});
}
export function addDraftImage(item){
  dispatcher.dispatch({type:'ADD_DRAFT_IMAGE',item});
}
export function changeToDoName(item){
  dispatcher.dispatch({type:'CAHNGE_TODO_NAME',item});
}
