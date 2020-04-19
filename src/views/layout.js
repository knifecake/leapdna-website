const m = require('mithril');

class Layout {
  view(vnode) {
    return m('.all',
      m("header", 
        m("div", {"class":"container","id":"topbar"}, [
          m("h1", 
            m("a", {"href":"/"}, 
              m.trust(" &#x1F469&#x200D&#x1F52C leapdna")
            )
          ),
          m("nav", {"id":"main-nav"}, 
            m("ul", [
              m("li", m(m.route.Link, { href: '/explore' }, 'Explore')),
              m("li", m(m.route.Link, { href: '/converter' }, 'Converter')),
              m("li", m(m.route.Link, { href: '/docs/about' }, 'About'))
            ])
          )]
        )
      ), 
      m("main", {"id":"main"}, vnode.children), 
      m("footer", m('.container', [
        m("p", "Created by Elias Hernandis")
      ]))
    );   
  }
}

module.exports = Layout;
