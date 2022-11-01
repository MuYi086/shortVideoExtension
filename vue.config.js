const path = require('path')
const fs = require('fs')
const pages = {}

function resolve (dir) {
  return path.join(__dirname, dir)
}
function getEntryFile (entryPath) {
  let files = fs.readdirSync(entryPath)
  return files
}

const chromeName = getEntryFile(path.resolve(`src/entry`))

function getFileExtension (filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`
  }
})

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  pages,
  filenameHashing: false,
  pluginOptions: {
    windicss: {
      preflight: false,
    }
  },
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`src/manifest.json`),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve(`src/assets/css`),
            to: `${path.resolve('dist')}/css/`
          },
          {
            from: path.resolve(`src/assets/img`),
            to: `${path.resolve('dist')}/img/`
          },
          {
            from: path.resolve(`src/assets/js`),
            to: `${path.resolve('dist')}/util/`
          }
        ]
      }
    ])
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      filename: `js/[name].js`,
      chunkFilename: `js/[name].js`
    },
    devtool: isDevMode ? 'inline-source-map' : false
  },
  css: {
    extract: false
  }
}
