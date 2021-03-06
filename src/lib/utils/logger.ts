const TypeColors = {
  info: "color: #2B95D6;font-weight:bold;",
  debug: "color: #5C7080;font-weight:bold;",
  error: "color: #F55656;font-weight:bold;",
  warning: "color: #F29D49;font-weight:bold;"
};

const TagColors = {
  info: "color: #106BA3;",
  debug: "color: #394B59;",
  error: "color: #C23030;",
  warning: "color: #BF7326;"
};

export const Logger = {
  debug(msg: string, ...rest: any) {
    console.debug(`%cDEBUG::%c${msg}\n`, TypeColors.debug, TagColors.debug, ...rest);
  },

  info(msg: string, ...rest: any) {
    console.info(`%cINFO::%c${msg}\n`, TypeColors.info, TagColors.info, ...rest);
  },

  error(msg: string, ...rest: any) {
    console.error(`%cERROR::%c${msg}\n`, TypeColors.error, TagColors.error, ...rest);
  },

  warning(msg: string, ...rest: any) {
    console.warn(`%cWARNING::%c${msg}\n`, TypeColors.warning, TagColors.warning, ...rest);
  }
};
