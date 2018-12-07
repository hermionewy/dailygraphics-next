var path = require("path");

module.exports = async function(request, response) {
  var { app, user } = request;
  var config = app.get("config");
  var { readJSON } = app.get("fs");
  var { getSheet } = app.get("google").sheets;

  var { slug } = request.params;
  var manifestPath = path.join(config.root, slug, "manifest.json");
  var manifest;
  manifest = await readJSON(manifestPath) || {};
  var { sheet } = manifest;

  var data = { slug, sheet, config, deployed: false };

  if (sheet) {
    data.COPY = await getSheet(sheet, { force: !config.forceSheetCache });
  };

  response.render("parentPage.html", data);

}