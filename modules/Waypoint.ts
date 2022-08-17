import { FirebaseObject } from "./FirebaseObject";
import { ActivityType, Waypoint as WaypointType } from "utility/types";
import { Course } from "./Course";


export class Waypoint extends FirebaseObject<Course> {
  private waypoint: WaypointType;

  constructor(currentUserId: string, waypoint: WaypointType, parentItem: Array<Course>) {
    super(ActivityType.Waypoint, currentUserId, parentItem)
    this.waypoint = waypoint
  }

  get id() {
    return this.waypoint.id
  }

  get getWaypoint() {
    return this.waypoint
  }

  get name() {
    return this.waypoint.name
  }

  override addToList(): Promise<void> {
    return super.addToList(this.waypoint)
  }
}