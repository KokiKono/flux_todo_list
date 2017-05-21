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
      case 'CREATE_GROUP':
        this.createGroup(action.item);
        break;
      case 'ADD_TODO':
        this.addToDo(action.group,action.todo);
        break;
    }
  }
  getAll(){
    return this.groups.sorted('id');
  }
  nextGroupId(){
    let groups = this.groups.sorted('id',true);
    if(groups.length==0){
      return 1;
    }
    let maxval = groups[0];
    return maxval.id + 1;
  }
  createGroup(item){
    realm.write(()=>{
      realm.create('Group',{
        id:this.nextGroupId(),
        name:item.name,
        todos:null
      })
    });
    this.emit('change');
  }
  findGroup(group){
    return realm.objects('Group').filtered('id = '+group.id);
  }
  addToDo(group,todo){
    let tarGroup=findGroup(group);
    realm.write(()=>{
      tarTodo.todos.append(todo);
    });
    this.emit('change');
  }
}

const groupStore = new GroupStore;
dispatcher.register(groupStore.handelActions.bind(groupStore));
export default groupStore;
