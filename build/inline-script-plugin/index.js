const sourceMappingURL = require('source-map-url')

class InlineScriptPlugin {
  constructor(name) {
    this.name = name
  }

  apply(compiler) {
    const id = 'InlineScriptPlugin'
    const name = this.name

    compiler.hooks.emit.tap(id, compilation => {
      delete compilation.assets[this.getAssetName(compilation.chunks, name)]
    })

    compiler.hooks.compilation.tap(id, compilation => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        id,
        (data, cb) => {
          const manifestAssetName = this.getAssetName(compilation.chunks, name)

          if (manifestAssetName) {
            ['head', 'body'].forEach(section => {
              data['head'] = this.inlineWhenMatched(
                compilation,
                data[section],
                manifestAssetName
              )
            })
          }
          cb(null, data)
        }
      )
    })
  }

  getAssetName(chunks, chunkName) {
    return (
      chunks.filter(function(chunk) {
        return chunk.name === chunkName
      })[0] || { files: [] }
    ).files[0]
  }

  inlineWhenMatched(compilation, scripts, manifestAssetName) {
    return scripts.map(function(script) {
      const isManifestScript =
        script.tagName === 'script' &&
        script.attributes.src.indexOf(manifestAssetName) >= 0

      if (isManifestScript) {
        return {
          tagName: 'script',
          closeTag: true,
          attributes: {
            type: 'text/javascript'
          },
          innerHTML: sourceMappingURL.removeFrom(
            compilation.assets[manifestAssetName].source()
          )
        }
      }

      return script
    })
  }
}

module.exports = InlineScriptPlugin
