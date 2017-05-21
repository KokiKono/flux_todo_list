import {EventEmitter} from 'events';
import realm from '../Models/RealmModel';
import dispatcher from '../Dispatcher/dispatcher';

class GroupStore extends EventEmitter{
  constructor(){
    super();
    this.groups=realm.objects('Group');
  }
  handelActions(action){
    switch (action.type) {
      case 'CREATE':{
        break;
      }
      default:{}
    }
  }
}
