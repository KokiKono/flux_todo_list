import {EventEmitter} from 'events';
import dispatcher from '../Dispatcher/dispatcher';

class DraftToDoStore extends EventEmitter{
  constructor(){
    super();
    this.id = -1;
    this.name = '';
    this.images = [];
  }
  handelActions(action){
    switch (action.type) {
      case 'UPDATE_DRAFT':
        this.updateDraft(action.item);
        break;
      case 'ADD_DRAFT_IMAGE':
        this.addDraftImage(action.item);
        break;
      case 'CAHNGE_TODO_NAME':
        this.changeToDoName(action.item);
        break;
    }
  }
  getDraft(){
    return {
      id:this.id,
      name:this.name,
      images:this.images
    };
  }
  updateDraft(item){
    this.id=item.id;
    this.name=item.name;
    this.images=item.images;
    this.emit('DraftToDoStore.change');
  }
  addDraftImage(image){
    this._addImage(image);
    this.emit('DraftToDoStore.change');
  }
  _addImage(image){
    this.images.push({
      id:this.images.length+1,
      title:'none',
      source:null,
      uri:image.uri
    });
  }
  changeToDoName(name){
    this.name=name;
    this.emit('DraftToDoStore.change');
  }
}

const draftToDoStore = new DraftToDoStore;
dispatcher.register(draftToDoStore.handelActions.bind(draftToDoStore));
export default draftToDoStore;
