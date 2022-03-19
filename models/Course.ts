import { Dispatch } from "redux";
import { ActivityType } from "utility/types";
import { FirebaseObject } from "./FirebaseObject";
import { Course as CourseType } from "utility/types";


export class Course extends FirebaseObject {
  private course: CourseType;

  constructor(currentUserId: string, course: CourseType) {
    super(ActivityType.Courses, currentUserId)
    this.course = course
  }

  static listCourses(dispatch: Dispatch){
    return FirebaseObject.getObjectsInList(ActivityType.Courses, dispatch)
  }

  override addToList(): string | null {
    return super.addToList(this.course)
  }

}