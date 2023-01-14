import { createLogger, format, transports } from 'winston';
import {env} from "./env";

export const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    transports: [new transports.Console({ level: env.MAE_LOG_LEVEL })]
});