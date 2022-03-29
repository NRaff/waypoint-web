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
  update,
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
  private objectsPath: string;
  private parentPaths?: Array<string>

  constructor(type: ActivityType, currentUserId: string, parentPaths?: Array<string>) {
    this.type = type
    this.objectRef = ref(db, type)
    this.listeners = []
    this.currentUserId = currentUserId
    this.usersObjectsPath = `users/${currentUserId}/${type}`
    this.objectsPath = ''
    this.parentPaths = parentPaths

    // TODO: add parent object path, not just usersObjectPath
  }

  get path() {
    return this.objectsPath
  }

  get parents() {
    return this.parentPaths
  }

  set path(path: string) {
    this.objectsPath = path
  }

  // should only be used on objects with predefined ids
  setObject(){

  }

  addToList(object: any) {
    const newObjectKey = push(this.objectRef).key
    object.id = newObjectKey
    const updates: any = {}
    updates[`${this.type}/${newObjectKey}`] = object
    this.objectsPath = `${this.type}/${newObjectKey}`
    updates[`${this.usersObjectsPath}/${newObjectKey}`] = true
    // check for other parents and add updates for those if applicable
    if (this.parentPaths) {
      this.parentPaths.forEach((path: string) => {
        updates[`${path}/${newObjectKey}`] = true
      })
    }
    debugger
    return update(ref(db), updates)
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