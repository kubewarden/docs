/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  docs:[
    'introduction',
    'quick-start',
    'tasks',
    'architecture',
    {
      type:'category',
      label: 'Writing Policies',
      items: ['quick-start'],
    },
    {
      type:'category',
      label: 'Distributing Policies',
      items: [
          'distributing-policies',
          'distributing-policies/custom-certificate-authorities',
          'distributing-policies/oci-registries-support'
      ]
    },
    {
      type:'category',
      label: 'Testing Policies',
      items: [
          'testing-policies/intro',
          'testing-policies/policy-authors',
          'testing-policies/cluster-operators'
      ]
    },
    {
      type:'category',
      label: 'Operator Manual',
      items: [
          'operator-manual/intro',
          'operator-manual/policy-servers/custom-cas',
          'operator-manual/telemetry/quickstart',
          'operator-manual/telemetry/metrics/quickstart',
          'operator-manual/telemetry/metrics/reference',
          'operator-manual/telemetry/opentelemetry/quickstart',
          'operator-manual/telemetry/tracing/quickstart'          
      ]
    },
]
};
