import { FirebaseObject } from "./FirebaseObject";
import { ActivityType, Waypoint as WaypointType } from "utility/types";


export class Waypoint extends FirebaseObject {
  private waypoint: WaypointType;

  constructor(currentUserId: string, waypoint: WaypointType) {
    super(ActivityType.Waypoint, currentUserId)
    this.waypoint = waypoint
  }

  override addToList(): string | null {
    return super.addToList(this.waypoint)
  }
}