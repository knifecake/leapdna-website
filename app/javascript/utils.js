const m = require('mithril');

class Collapsible {
    constructor(vnode) {
        this.open = vnode.attrs.open || false;
    }

    view(vnode) {
        const open = this.open ? '.open' : '';
        return m(`.collapsible${open}`, [
            m('p.collapsible-title', {
                onclick: _ => this.open = !this.open
            }, ' ' + vnode.attrs.title),
            this.open ? vnode.children : []
        ]);
    }
}

class Table {
    view(vnode) {
        if (!vnode.attrs.table) {
            return m('p.text-muted.text-center', vnode.attrs.placeholder);
        }

        let align_classes = [];
        if (vnode.attrs.attrs !== undefined) {
            align_classes = vnode.attrs.attrs
                .map(col => col.align ? `text-${col.align}` : '');
        }

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

class FormSection {
    constructor(vnode) {
        this.collapsible = vnode.attrs.collapsible || false;
        this.open = vnode.attrs.open || !this.collapsible;
    }

    viewCollapsible(vnode) {
        const open = this.open ? '.open' : '';
        return m(`.form-section.collapsible${open}`, [
            m('p.collapsible-title', {
                onclick: _ => this.open = !this.open
            }, ' ' + vnode.attrs.title),
            this.open ? vnode.children : []
        ]);
    }

    viewStatic(vnode) {
        return m('.form-section', [
            m('p.collapsible-title', vnode.attrs.title),
            vnode.children
        ]);
    }

    view(vnode) {
        return this.collapsible ? this.viewCollapsible(vnode) : this.viewStatic(vnode);
    }
}

class DropdownGroup {
    view(vnode) {
        const id = `dropdown-${vnode.attrs.name}`;
        let iattrs = `[name=${vnode.attrs.name}]`;
        if (vnode.attrs.required) iattrs += '[required]';
        if (vnode.attrs.disabled) iattrs += '[disabled]';
        const options = Object.keys(vnode.attrs.options).map(key => {
            const selected = vnode.attrs.selected == vnode.attrs.options[key]
                ? '[selected]' : '';
            return m(`option[value="${vnode.attrs.options[key]}"]${selected}`, key)
        });

        return m('.form-group.dropdown-group', [
            m(`label[for=${id}]`, vnode.attrs.label),
            m(`select#${id}${iattrs}`, {
                oninput: e => vnode.attrs.callback(e.target.value)
            }, options)
        ]);
    }
}

class TextGroup {
    view(vnode) {
        const id = `checkbox-${vnode.attrs.name}`;
        let iattrs = `[type=text][name=${vnode.attrs.name}]`;
        if (vnode.attrs.placeholder) iattrs += `[placeholder="${vnode.attrs.placeholder}"]`;
        if (vnode.attrs.disabled) iattrs += '[disabled]';
        return m('.form-group.dropdown-group', [
            m(`label[for=${id}]`, vnode.attrs.label),
            m(`input#${id}${iattrs}`, {
                oninput: e => vnode.attrs.callback(e.target.value)
            })
        ]);
    }
}

class CheckboxLine {
    view(vnode) {
        const id = `checkbox-${vnode.attrs.name}`;
        const checked = vnode.attrs.checked ? '[checked]' : '';
        return m('.form-group.checkbox-line', [
            m(`input#${id}[type=checkbox]${checked}`, {
                oninput: e => vnode.attrs.callback(e.target.checked)
            }),
            m(`label[for=${id}]`, vnode.attrs.label)
        ]);
    }
}

function round(x, ndigits = 4) {
    const exp = Math.pow(10, ndigits - 1);
    return Math.round(x * exp) / exp;
}


module.exports = {
    Collapsible,
    Table,
    CheckboxLine,
    DropdownGroup,
    TextGroup,
    FormSection,
    round
};
