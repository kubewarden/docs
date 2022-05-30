module.exports = {
  docs: [
    'introduction',
    'quick-start',
    {
      type: 'category',
      label: 'Common Tasks',
      items: ['tasksDir/mutating-policies', 'tasksDir/psp-migration'],
      collapsed: 'true',
      link: 
          {
            type: 'doc', 
            id: 'tasks',
          },
    },
    'architecture',
    {
      type: 'category',
      label: 'Writing Policies',
      link: {type: 'doc', id: 'writing-policies/index'},
      items:[
       {
        'Policy Specification':
              [
                { type: 'doc', id: 'writing-policies/spec/intro-spec'},
                { type: 'doc', id: 'writing-policies/spec/settings'},
                { type: 'doc', id: 'writing-policies/spec/validating-policies'},
                { type: 'doc', id: 'writing-policies/spec/mutating-policies'},
                { type: 'doc', id: 'writing-policies/spec/context-aware-policies'},
                {
                  type: 'category',
                  label: 'Host Capabilities',
                  link: {type: 'doc', id: 'writing-policies/spec/host-capabilities/intro-host-capabilities'},
                  items: [
                    'writing-policies/spec/host-capabilities/signature-verifier-policies',
                    'writing-policies/spec/host-capabilities/container-registry',
                    'writing-policies/spec/host-capabilities/net'
                  ]
                }
              ],
      },
    ],
  },
  {  
      type: 'category',
      label: 'Supported Languages',
      items:[
        {
          'Rust':
          [
            'writing-policies/rust/intro-rust',
            'writing-policies/rust/create-policy',
            'writing-policies/rust/define-policy-settings',
            'writing-policies/rust/write-validation-logic',
            'writing-policies/rust/mutation-policy',
            'writing-policies/rust/logging',
            'writing-policies/rust/build-and-distribute',
          ],
        'Go':
          [
            'writing-policies/go/intro-go',
            'writing-policies/go/scaffold',
            'writing-policies/go/policy-settings',
            'writing-policies/go/validation',
            'writing-policies/go/e2e-tests',
            'writing-policies/go/logging',
            'writing-policies/go/automate',
            'writing-policies/go/distribute'
          ],
        'Rego':
        [
          'writing-policies/rego/intro-rego',
          'writing-policies/rego/builtin-support',
        ],
        
        'Swift':['writing-policies/swift',],
        'TypeScript':['writing-policies/typescript',],
        },
     ],
    },
    {  
      type: 'category',
      label: 'Supported Frameworks',
      items:[
        {
          'Open Policy Agent':
          [
            'writing-policies/rego/open-policy-agent/intro',
            'writing-policies/rego/open-policy-agent/create-policy',
            'writing-policies/rego/open-policy-agent/build-and-run',
            'writing-policies/rego/open-policy-agent/distribute',
          ],
        'Gatekeeper':
          [
            'writing-policies/rego/gatekeeper/intro',
            'writing-policies/rego/gatekeeper/create-policy',
            'writing-policies/rego/gatekeeper/build-and-run',
            'writing-policies/rego/gatekeeper/distribute',
          ],
        },
     ],
    },
    {
      type: 'category',
      label: 'Distributing Policies',
      link: {type: 'doc', id: 'distributing-policies',},
      items:['distributing-policies/custom-certificate-authorities', 'distributing-policies/oci-registries-support', 'distributing-policies/secure-supply-chain',],
    },
    {
      type: 'category',
      label: 'Testing Policies',
      link: {type: 'doc', id: 'testing-policies/intro'},
      items:[
       {
        'User Personas':
              [
                'testing-policies/policy-authors',
                'testing-policies/cluster-operators',
              ],
      },
     ],
    },
    {
        type: 'category',
        label: 'Operator Manual',
        link: {type: 'doc', id: 'operator-manual/intro'},
        items:[
         {
          'Configuring Policy Servers': ['operator-manual/policy-servers/custom-cas',],
          'Quickstart Guides':
          [
            'operator-manual/telemetry/quickstart',
            'operator-manual/telemetry/opentelemetry/quickstart',
            'operator-manual/telemetry/metrics/quickstart',
            'operator-manual/telemetry/tracing/quickstart',
          ],
          'Reference Documentation':
          [
            'operator-manual/telemetry/metrics/reference',
          ],
          'Monitor Mode': ['operator-manual/monitor-mode/intro',],
        },
      ],
     },
  ],
};
