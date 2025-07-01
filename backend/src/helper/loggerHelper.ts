import winston from "winston";
import { getConfigValue } from "./configHelper";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { 'service': 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'system.log' }),
    ]
});

if (getConfigValue('NODE_ENV') !== 'production') {
    logger.add(new winston.transports.Console({ format: winston.format.simple() }));
}
