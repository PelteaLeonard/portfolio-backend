import path from "path";
import { format, transports, createLogger } from "winston";

export const getLogger = (callingModule: NodeModule) => {
  return createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
      }),
      format.printf((info) => {
        const fileName = path.basename(callingModule.filename);
        return `${info.timestamp} ${info.level.toUpperCase()} ${fileName}: ${
          info.message
        }`;
      })
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: "combined.log" }),
      new transports.File({ filename: "error.log", level: "error" }),
    ],
  });
};
