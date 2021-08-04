define(function (require, exports, module) {
  "use strict";

  exports.snippetText = require("../requirejs/text!./vue.snippets");

  // dirty hack as html is not addable via includeScopes
  exports.snippetText += require("../requirejs/text!./html.snippets");
  exports.scope = "vue";
  exports.includeScopes = ["javascript", "css"];
});
