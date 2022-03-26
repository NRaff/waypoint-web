import { 
  getDatabase, 
  ref, 
  push,
  set,
  onValue,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
  off,
} from "firebase/database";
import { setupFirebase } from "config/setup_firebase";
import { Dispatch } from "redux";
import { noCoursesFound, receiveAllCourses } from "redux/actions/actions";
import { ActivityType, CoursePermission } from "utility/types";

setupFirebase()
const db = getDatabase()

export class FirebaseObject {
  private type: string;
  private objectRef: any;
  private usersObjectsPath: any;
  private currentUserId: string;
  private listeners: Array<any>;

  constructor(type: ActivityType, currentUserId: string) {
    this.type = type
    this.objectRef = ref(db, type)
    this.listeners = []
    this.currentUserId = currentUserId
    this.usersObjectsPath = `users/${currentUserId}/${type}`
    // TODO: add parent object path, not just usersObjectPath
  }

  // should only be used on objects with predefined ids
  setObject(){

  }

  // to be used on objects with ids that should be auto generated
  addToList(object: any) {
    const newObjectRef = push(this.objectRef)
    set(newObjectRef, object)
    .then(() => {
      const newUserObjectRef = ref(db, `${this.usersObjectsPath}/${newObjectRef.key}`)
      set(newUserObjectRef, true)
      // if parent object exists, add that here as well
    })
    return newObjectRef.key
  }

  static updateObject(key: string){

  }

  static getObjectsInList(type: ActivityType, dispatch: Dispatch){
    const objectsRef = ref(db, type)
    const objectListener = onValue(objectsRef, (snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        dispatch(receiveAllCourses(snapshot.val()))
      } else {
        dispatch(noCoursesFound())
      }
    })
    return objectListener
  }

  private static getAction(type: ActivityType, genericAction: string) {
    // should return the correct action to use based on the type of entity
  }


}