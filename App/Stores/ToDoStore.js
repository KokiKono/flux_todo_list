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
        break;
      }
      case 'DELETE_TODO':{
        this.deleteToDo(action.item);
        break;
      }
    }
  }
  getAll(){
    return this.todos.sorted('id');
  }
  nextToDoId(){
    let todos = this.getAll();
    return todos.length+1;
  }
  addToDo(item){
    realm.write(()=>{
      realm.create('ToDo',{
        id:this.nextToDoId(),
        name:item.name
      });
    });
    this.emit('change');
  }
  deleteToDo(item){
    let todos = realm.objects('ToDo');
    let tarTodo = todos.filtered('id = '+item.id);
    realm.write(() => {
      realm.delete(tarTodo)
    })
    this.emit('change');
  }
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handelActions.bind(toDoStore));
export default toDoStore;
