define(function (require, exports, module) {
  "use strict";

  exports.snippetText = require("../requirejs/text!./vue.snippets");
  exports.scope = "vue";
  exports.includeScopes = ["html", "javascript", "css"];
});
