import { Dispatch } from "redux";
import { ActivityType, CoursePermission, Waypoint } from "utility/types";
import { FirebaseObject } from "./FirebaseObject";
import { Course as CourseType } from "utility/types";


export class Course extends FirebaseObject {
  private course: CourseType;

  constructor(currentUserId: string, course: CourseType) {
    super(ActivityType.Courses, currentUserId)
    this.course = course
    this.path = `${ActivityType.Courses}/${course.id}`
  }

  static listCourses(dispatch: Dispatch){
    return FirebaseObject.getObjectsInList(ActivityType.Courses, dispatch)
  }

  override addToList(): Promise<void> {
    return super.addToList(this.course)
  }

  addWaypoint(waypoint: Waypoint) {
    this.course.waypoints[waypoint.id] = waypoint
  }

  get id(): string {
    return this.course.id
  }

  get waypoints(): { [key: string]: Waypoint } {
    return this.course.waypoints
  }

  set name(name: string) {
    this.course.name = name
  }

  set length(length: number) {
    this.course.length = length
  }

  set duration(duration: number) {
    this.course.duration = duration
  }

  set visibility(type: CoursePermission) {
    this.course.type = type
  }

  set createdBy(uid: string) {
    this.course.created_by = uid
  }


}