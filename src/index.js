const m = require('mithril');
const Layout = require('./views/layout');
const Converter = require('./views/converter/converter');
const Static = require('./views/static');

m.route(document.body, "/", {
  "/": Layout,
  "/convert": {
    view: () => m(Layout, m(Converter))
  },
  "/docs/:slug": {
    view: (vnode) => m(Layout, m(Static, vnode.attrs))
  }
});
