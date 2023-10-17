> **WARNING:** not yet done, WIP

# Domain Specific Language

Being able to write Kubewarden policies using regular programming languages provides
many advantages, however in certain cases this could be a bit of an overkill.
Simple policies could be written in an easier way using a domain-specific
language.

This is an extract from the [Wikipedia page](https://en.wikipedia.org/wiki/Domain-specific_language)
about domain-specific languages:

> A domain-specific language (DSL) is a computer language specialized to a
> particular application domain.

We plan to provide a simple DSL that can be built as a Wasm module.
This would allow the Kubewarden admission controller to use policies written
using regular programming languages **and** policies written a simpler DSL
language.
