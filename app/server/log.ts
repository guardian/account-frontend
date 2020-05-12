import winston from "winston";
import { putMetricDataPromise } from "./awsIntegration";
import { conf, Environments } from "./config";

const location =
  conf.ENVIRONMENT === Environments.PRODUCTION ? "/var/log/" : "./";

export const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `${location}/manage-frontend.log`
    }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

export interface MetricLoggingFields {
  loggingCode: string;
  isOK: boolean;
  isInAccountOverviewTest: boolean;
}

export const putMetric = (fields: MetricLoggingFields) => {
  const dimensions = {
    Stage: conf.STAGE,
    outcome: fields.isOK ? "SUCCESS" : "ERROR",
    variant: fields.isInAccountOverviewTest ? "ACCOUNT OVERVIEW" : "LEGACY"
  };

  if (fields.loggingCode) {
    putMetricDataPromise(fields.loggingCode, dimensions).catch(error =>
      log.error("Failed to putMetricData", {
        metricName: fields.loggingCode,
        dimensions,
        error
      })
    );
  }
};
