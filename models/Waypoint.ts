import { FirebaseObject } from "./FirebaseObject";
import { ActivityType, Waypoint as WaypointType } from "utility/types";
import { Course } from "./Course";


export class Waypoint extends FirebaseObject<Course> {
  private waypoint: WaypointType;

  constructor(currentUserId: string, waypoint: WaypointType, parentItem: Array<Course>) {
    super(ActivityType.Waypoint, currentUserId, parentItem)
    this.waypoint = waypoint
  }
  override addToList(): Promise<void> {
    return super.addToList(this.waypoint)
  }
}