const {createLogger, transports, format} = require('winston');

// Logger setup 
const logger = createLogger ( {
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf( ({timestamp, level, message}) => {
            return `${timestamp}, [${level}]: ${message}`;
        })
    ),
    transports: [
        new transports.File({filename: "error.log", level: "error"}),
        new transports.Console(),
        new transports.File({filename: 'app.log'})
    ]

});

module.exports = {logger};