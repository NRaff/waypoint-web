import { FirebaseObject } from "./FirebaseObject";
import { ActivityType, Waypoint as WaypointType } from "utility/types";


export class Waypoint extends FirebaseObject {
  private waypoint: WaypointType;

  constructor(currentUserId: string, waypoint: WaypointType, parentPath: Array<string>) {
    super(ActivityType.Waypoint, currentUserId, parentPath)
    this.waypoint = waypoint
  }
  override addToList(): Promise<void> {
    return super.addToList(this.waypoint)
  }
}