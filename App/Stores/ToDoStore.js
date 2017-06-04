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
      case 'CREATE_TODO':
        this.addToDo(action.item);
        break;
      case 'DELETE_TODO':
        this.deleteToDo(action.item);
        break;
      case 'UPDATE_TODO':
      this.updateToDo(action.item);
      break;
    }
  }
  getAll(){
    return this.todos.sorted('id');
  }
  getFromId(id){
    this.todos.filtered('id='+id).map((todo,index)=>{
      return todo;
    })
  }
  nextToDoId(){
    let todos = this.todos.sorted('id',true);
    if(todos.length == 0){
      return 1;
    }
    let maxval = todos[0];
    return maxval.id + 1;
  }
  addToDo(item){
    realm.write(()=>{
      realm.create('ToDo',{
        id:this.nextToDoId(),
        name:item.name
      });
    });
    this.emit('ToDoStore.change');
  }
  updateToDo(item){
    let tarToDo = this.todos.filtered('id='+item.id);
    realm.write(()=>{
      tarToDo.map((todo,index)=>{
        todo.name=item.name;
        todo.images=item.images;
      })
    });
    this.emit('ToDoStore.change');
  }
  deleteToDo(item){
    let tarTodo = this.todos.filtered('id = '+item.id);
    realm.write(() => {
      realm.delete(tarTodo)
    });
    this.emit('ToDoStore.change');
  }
}

const toDoStore = new ToDoStore;
dispatcher.register(toDoStore.handelActions.bind(toDoStore));
export default toDoStore;
