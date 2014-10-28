var Walker = require('node-source-walk');

/**
 * Extracts the dependencies of the supplied es6 module
 *
 * @param  {Srting} src
 * @return {String[]}
 */
module.exports = function(src) {
  var walker = new Walker({
    esprimaHarmony: true
  });

  var dependencies = [];

  if (! src) throw new Error('src not given');

  walker.walk(src, function(node) {
    // If it's not an import, skip it
    if (node.type !== 'ImportDeclaration' || !node.source || !node.source.value) {
      return;
    }

    dependencies.push(node.source.value);
  });

  return dependencies;
};
