// window.getPublicPath = function (name) {
//   const url = moduleMap[name]
//   if (url) {
//     let index = url.lastIndexOf('/js')
//     if (index < 0) {
//       index = url.lastIndexOf('/')
//     }
//     index++
//     return url.slice(0, index);
//   } else {
//     throw Error(`Could not find url for module '${name}'`)
//   }
// }
// __webpack_public_path__ = window.getPublicPath('navbar')
console.log(window.__POWERED_BY_QIANKUN__)
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
