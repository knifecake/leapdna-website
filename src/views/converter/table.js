const m = require('mithril');

class Table {
  view(vnode) {
    if (vnode.attrs.error) {
      return m('p.text-error.text-center', vnode.attrs.error);
    }

    if (!vnode.attrs.table) {
      return m('p.text-muted.text-center', vnode.attrs.placeholder);
    }

    let align_classes = vnode.attrs.attrs
      .map(col => col.align ? `text-${col.align}` : '');

    const body_start = vnode.attrs.header ? 1 : 0;
    return m('div',
      m('table',
        m('thead',
          m('tr', vnode.attrs.table.slice(0, body_start)[0]
            .map((h, i) => m(`th.${align_classes[i]}`, h))
          )
        ),

        m('tbody',
          vnode.attrs.table.slice(body_start).map(tr => 
            m('tr', tr.map((td, i) =>
              m(`td.${align_classes[i]}`, td))
            )
          )
        )
      )
    );
  }
}

module.exports = Table;
