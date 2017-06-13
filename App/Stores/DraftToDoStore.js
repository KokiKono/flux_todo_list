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
      case 'REMOVE_DRAFT_IMAGE':
        this.removeDraftImage(action.item);
        break;
      case 'UPDATE_IMAGE':
        this.updateImage(action.item);
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
  removeDraftImage(image){
    this.images.forEach((val,index,array)=>{
      if(val.id==image.id){
        array.splice(index,1);
        this.emit('DraftToDoStore.change');
      }
    });
  }
  updateImage(image){
    this.images.forEach((val,index,array)=>{
      if(val.id==image.id){
        val.title=image.title;
        val.source=image.source;
        val.uri=image.uri;
        val.origURL=image.origURL;
        val.path=image.path
        this.emit('DraftToDoStore.change');
      }
    });
  }
  _addImage(image){
    this.images.push({
      id:this.images.length+1,
      title:'none',
      source:image.source,
      uri:image.uri,
      origURL:image.origURL,
      path:image.path,
      latitude:image.latitude,
      longitude:image.longitude
    });
  }
  changeToDoName(name){
    this.name=name;
    this.emit('DraftToDoStore.change');
  }
  nextImageId(){
    let draftId=this.images.length+1;
    while(true){
      if(indexOf(draftId)==-1){
        return draftId;
      }
      draftId++;
    }
  }
  indexOf(id){
    this.images.forEach((val,index,array)=>{
      if(val.id==id){return index;}
    });ß
    return -1;
  }
}

const draftToDoStore = new DraftToDoStore;
dispatcher.register(draftToDoStore.handelActions.bind(draftToDoStore));
export default draftToDoStore;
