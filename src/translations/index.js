const i18next = require("i18next");
const Backend = require("i18next-node-fs-backend");
const i18nextMiddleware = require("i18next-http-middleware");
const path = require("path");

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      backend: {
        loadPath: path.resolve(__dirname + "/{{lng}}/{{ns}}.json"),
      },
      debug: false,

      detection: {
        order: ["header"],
        caches: ["header"],
      },
      saveMissing: true,
      fallbackLng: "ar",
      lng: "ar",
      preload: ["en", "ar"],

    },
    (err, t) => {
      if (err) return console.error(err);
      console.log("i18next is ready...");
    }
  );


module.exports = i18nextMiddleware.handle(i18next);
