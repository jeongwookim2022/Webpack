
// export
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    ['@babel/plugin-transform-runtime'] // async 비동기 처리를 위함.
  ]
}