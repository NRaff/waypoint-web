import { ActivityType } from "utility/types";
import { FirebaseObject } from "./FirebaseObject";


export class Course extends FirebaseObject {
  constructor(currentUserId: string) {
    super(ActivityType.Courses, currentUserId)
  }

  static listCourses(){
    FirebaseObject.getObjectsInList(ActivityType.Courses)
  }

}