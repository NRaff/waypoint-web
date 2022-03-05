import { 
  getDatabase, 
  ref, 
  push,
  set,
  onValue,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";
import { ActivityType, CoursePermission } from "utility/types";

const db = getDatabase()

export class FirebaseObject {
  private type: string;
  private objectRef: any;
  private usersObjectsPath: any;
  private currentUserId: string;
  private listeners: Array<any>

  constructor(type: ActivityType, currentUserId: string) {
    this.type = type
    this.objectRef = ref(db, type)
    this.listeners = []
    this.currentUserId = currentUserId
    this.usersObjectsPath = `users/${currentUserId}/${type}`
  }

  // should only be used on objects with predefined ids
  setObject(){

  }

  // to be used on objects with ids that should be auto generated
  addToList() {
    const newObjectRef = push(this.objectRef)
    set(newObjectRef, {
      name: 'Test',
      length: 12,
      duration: 2.5,
      type: CoursePermission.Public,
      created_by: this.currentUserId
    })
    .then(() => {
      const newUserObjectRef = ref(db, `${this.usersObjectsPath}/${newObjectRef.key}`)
      set(newUserObjectRef, true)
    })
  }

  static updateObject(key: string){

  }

  static getObjectsInList(type: ActivityType){
    const objectsRef = ref(db, type)
    onValue(objectsRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
      } else {
        console.log('no data found')
      }
    })
  }


}