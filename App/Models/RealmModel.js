import Realm from 'realm';

class ToDo extends Realm.Object{}
ToDo.schema={
  name:'ToDo',
  properties:{
    name:'string'
  }
};

export default new Realm({schema:[ToDo]});
