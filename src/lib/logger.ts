import pino from "pino";

const mixin = {
  appName: "MixyBoos",
  target: 'pino-pretty'
};
// create pino logger
const logger = pino({
  mixin() {
    return mixin;
  },
});

export default logger;
