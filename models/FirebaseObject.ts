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
import { CoursePermission } from "utility/types";

const db = getDatabase()

export class FirebaseObject {
  private type: string;
  private objectRef: any;
  private listeners: Array<any>

  constructor(type: string) {
    this.type = type
    this.objectRef = ref(db, type)
    this.listeners = []
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
      type: CoursePermission.Private
    })
    .then(() => {
      const userRef = ref(db,`users/${this.type}/${newObjectRef.key}`)
      set(userRef, true)
    })
  }

  updateObject(){

  }

  getObjectsInList(){

  }


}