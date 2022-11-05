import { User } from "@prisma/client";
import { JSONSchemaType } from "ajv";
import { NextApiHandler, NextApiRequest } from "next";
import RouteHandler, {
  RouteRequirement,
} from "../requests/RouteHandler";

export type ControllerHandler<TRes = any> = (
  req: NextApiRequest,
  user?: User
) => TRes;

export type Control = {
  handler: ControllerHandler;
  route: string;
  routeRequirement: RouteRequirement;
  getSchema?: <T>() => any;
};
export type Controls<TControls extends string> = {
  name: string;
  handlers: {
    [key in TControls]: Control;
  };
};

export class Controller {
  /**
   * All routes relative to the controller name
   */
  static register = <TControls extends string>({
    name,
    handlers,
  }: Controls<TControls>) => {
    const createControls = (handlers: {
      [key: string]: Control;
    }) => {
      const allHandlers = Object.entries(handlers);
      return allHandlers.reduce(
        (
          handlerMap,
          [handlerName, options]
        ): {
          [key in TControls]: NextApiHandler<
            ReturnType<typeof options.handler>
          >;
        } => {
          const routeHandler = new RouteHandler<
            Parameters<typeof options.handler>,
            ReturnType<typeof options.handler>
          >(
            handlerName,
            `/${name}${options.route}`,
            options.handler,
            options.getSchema ? options.getSchema() : undefined
          );
          handlerMap[handlerName as TControls] =
            routeHandler.createHandler(options.routeRequirement);

          return handlerMap;
        },
        {} as {
          [key in TControls]: NextApiHandler<
            ReturnType<typeof handlers[key]["handler"]>
          >;
        }
      );
    };
    return createControls(handlers);
  };
}
