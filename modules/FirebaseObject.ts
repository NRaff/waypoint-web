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
import { Dispatch } from "models/store";
import {
  noCoursesFound,
  receiveAllCourses,
} from "redux/actions/actions";
import { ActivityType, CoursePermission } from "utility/types";
import { ExpectType } from "../utility/types";

setupFirebase();
const db = getDatabase();

export class FirebaseObject<ParentType extends ExpectType> {
  private type: string;
  private objectRef: any;
  private usersObjectsPath: any;
  private currentUserId: string;
  private listeners: Array<any>;
  private objectsPath: string;
  private parentItems?: Array<ParentType>;

  constructor(
    type: ActivityType,
    currentUserId: string,
    parentItems?: Array<ParentType>
  ) {
    this.type = type;
    this.objectRef = ref(db, type);
    this.listeners = [];
    this.currentUserId = currentUserId;
    this.usersObjectsPath = `users/${currentUserId}/${type}`;
    this.objectsPath = "";
    this.parentItems = parentItems;
  }

  get path() {
    return this.objectsPath;
  }

  get parents() {
    return this.parentItems;
  }

  get itemType() {
    return this.type;
  }

  set path(path: string) {
    this.objectsPath = path;
  }

  // should only be used on objects with predefined ids
  setObject() {}
  /**
   * Takes in an object (e.g. course/waypoint) and parses it into the
   * applicable NoSQL collection in the Realtime Database in firebase.
   * @param object course/waypoint/other js object
   * @returns Empty promise
   */
  async addToList(object: any): Promise<void> {
    const newObjectKey = push(this.objectRef).key;
    object.id = newObjectKey;
    const updates: any = {};
    updates[`${this.type}/${newObjectKey}`] = object;
    this.objectsPath = `${this.type}/${newObjectKey}`;
    updates[`${this.usersObjectsPath}/${newObjectKey}`] = true;
    // check for other parents and add updates for those if applicable
    if (this.parentItems) {
      this.parentItems.forEach((item: ParentType) => {
        updates[
          this.constructParentReference(item, newObjectKey!)
        ] = true;
      });
    }
    return update(ref(db), updates);
  }

  static updateObject(key: string) {}

  static getObjectsInList(
    type: ActivityType,
    dispatch: Dispatch
  ) {
    const objectsRef = ref(db, type);
    const objectListener = onValue(objectsRef, (snapshot) => {
      if (snapshot.exists()) {
        dispatch.courses.receiveAllCourses(snapshot.val());
        // dispatch(receiveAllCourses(snapshot.val()));
      } else {
        dispatch(noCoursesFound());
      }
    });
    return objectListener;
  }
  private constructParentReference(
    item: ParentType,
    newRef: string
  ): string {
    const itemToChildKey = `${item.path}/${this.type}/${newRef}`;
    return itemToChildKey;
  }

  private static getAction(
    type: ActivityType,
    genericAction: string
  ) {
    // should return the correct action to use based on the type of entity
  }
}
