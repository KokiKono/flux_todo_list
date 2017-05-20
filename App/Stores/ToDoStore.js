import {EventEmitter} from 'events';
import realm from '../Models/RealmModel';
import dispatcher from '../Dispatcher/dispatcher';

class ToDoStore extends EventEmitter{
  constructor(){
    super();
    this.todos=realm.objects('ToDo');
  }
  handelActions(action){
    console.log('TodoStore received an action', action);
    switch(action.type){
      case 'CREATE_TODO':{
        this.addToDo(action.item);
      }
    }
  }
  getAll(){
    return this.todos;
  }
  addToDo(item){
    realm.write(()=>{
      realm.create('ToDo',{name:item.name});
    });
    this.emit('change');
  }
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handelActions.bind(toDoStore));
export default toDoStore;
