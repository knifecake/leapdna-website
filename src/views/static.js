const m = require('mithril');
const marked = require('marked');

class Static {
  constructor () {
    this.html = '<p class="loading">Loading...</p>';
  }

  oninit(vnode) {
    m.request({
      url: '/docs/' + vnode.attrs.slug + '.md',
      responseType: "text"
    }).then(res => {
      this.html = marked(res);
    }).catch(err => {
      console.error(err);
      this.html = '<p class="text-error">An error occured while loading this page</p>';
    })
  }

  view() {
    return m('.container', m.trust(this.html));
  }
}

module.exports = Static;
