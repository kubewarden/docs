'use strict'

// Asciidoctor block processor for [mermaid] blocks.
//
// It wraps the diagram source in <div class="mermaid content">. The browser
// renders the diagram, see kw-community-docs-supp-files/js/mermaid-init.js.
//
// It replaces @sntke/antora-mermaid-extension, which applies the subs
// attribute to the wrong value. To resolve attributes such as
// {sboms-short-name} in a diagram, use:
//
//   [mermaid,subs="attributes"]
//
// Do not use subs="+attributes". The normal substitutions escape > and can
// break mermaid arrows.

const escapeHtml = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;')

function mermaidBlock () {
  this.onContext(['listing', 'literal'])
  this.positionalAttributes(['target', 'format'])
  this.process((parent, reader, attrs) => {
    let source = reader.getLines().join('\n')
    if (attrs.subs) {
      // Asciidoctor.js has no JavaScript name for these two methods, so call
      // the Opal (Ruby) methods directly.
      source = parent.$apply_subs(source, parent.$resolve_subs(attrs.subs))
    }

    const block = this.createPassBlock(parent, '', attrs)

    let titleHtml = ''
    if (attrs.title) {
      block.setTitle(attrs.title)
      block.assignCaption(attrs.caption, 'figure')
      titleHtml = `<div class="title">${block.getCaption()}${attrs.title}</div>`
    }

    const id = attrs.id ? ` id="${attrs.id}"` : ''
    const role = attrs.role ? `${attrs.role} imageblock` : 'imageblock'
    const width = attrs.width ? `width: ${attrs.width};` : ''
    const height = attrs.height ? `height: ${attrs.height};` : ''

    block.lines = [
      `<div${id} class="${role}"><div class="mermaid content" style="${width} ${height}">` +
      `${escapeHtml(source)}</div>${titleHtml}</div>`,
    ]
    return block
  })
}

module.exports.register = function register (registry) {
  registry.block('mermaid', mermaidBlock)
  return registry
}
