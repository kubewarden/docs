module.exports = {
  docs: [
    'introduction',
    'quick-start',
    {
      type: 'category',
      label: 'Common Tasks',
      items: [
        'tasksDir/mutating-policies',
        'tasksDir/psp-migration',
        'tasksDir/pod-security-admission-with-kubewarden'],
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
                'writing-policies/spec/host-capabilities/net',
                'writing-policies/spec/host-capabilities/crypto'
              ]
            }
          ],
        },
        {
          type: 'category',
          label: 'Supported Languages',
          items:[
            {
              type: 'category',
              label: 'Rust',
              link: {type: 'doc', id: 'writing-policies/rust/intro-rust'},
              items:
              [
                'writing-policies/rust/create-policy',
                'writing-policies/rust/define-policy-settings',
                'writing-policies/rust/write-validation-logic',
                'writing-policies/rust/mutation-policy',
                'writing-policies/rust/logging',
                'writing-policies/rust/build-and-distribute',
              ]
            },
            {
              type: 'category',
              label: 'Go',
              link: {type: 'doc', id: 'writing-policies/go/intro-go'},
              items:
              [
                'writing-policies/go/scaffold',
                'writing-policies/go/policy-settings',
                'writing-policies/go/validation',
                'writing-policies/go/e2e-tests',
                'writing-policies/go/logging',
                'writing-policies/go/automate',
                'writing-policies/go/distribute',
                'writing-policies/go/validation-with-queries'
              ],
            },
            {
              type: 'category',
              label: 'Rego',
              link: {type: 'doc', id: 'writing-policies/rego/intro-rego'},
              items:
              [
                { type: 'doc', id: 'writing-policies/rego/builtin-support'},
                {
                  type: 'category',
                  label: 'Open Policy Agent',
                  link: {type: 'doc', id: 'writing-policies/rego/open-policy-agent/intro'},
                  items:
                  [
                    'writing-policies/rego/open-policy-agent/create-policy',
                    'writing-policies/rego/open-policy-agent/build-and-run',
                    'writing-policies/rego/open-policy-agent/distribute',
                  ]
                },
                {
                  type: 'category',
                  label: 'Gatekeeper',
                  link: {type: 'doc', id: 'writing-policies/rego/gatekeeper/intro'},
                  items:
                  [
                    'writing-policies/rego/gatekeeper/create-policy',
                    'writing-policies/rego/gatekeeper/build-and-run',
                    'writing-policies/rego/gatekeeper/distribute',
                  ]
                }
              ]
            },
            {
              type: 'category',
              label: 'Swift',
              link: {type: 'doc', id: 'writing-policies/swift'},
              items: []
            },
            {
              type: 'category',
              label: 'TypeScript',
              link: {type: 'doc', id: 'writing-policies/typescript'},
              items: []
            }
          ]
        }
      ],
    },
    {
      type: 'category',
      label: 'Distributing Policies',
      link: {type: 'doc', id: 'distributing-policies',},
      items:[
        'distributing-policies/oci-registries-support',
        'distributing-policies/publish-policy-to-artifact-hub',
        'distributing-policies/custom-certificate-authorities',
        'distributing-policies/secure-supply-chain',
      ],
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
          type: 'category',
          label: 'Quickstart Guides',
          items: [
            'operator-manual/telemetry/opentelemetry/quickstart',
            'operator-manual/telemetry/metrics/quickstart',
            'operator-manual/telemetry/tracing/quickstart',
          ],
        },
        {
          type: 'category',
          label: 'Configuring Policy Servers',
          items: [
            'operator-manual/policy-servers/custom-cas',
            'operator-manual/policy-servers/private-registry',
          ],
        },
        {
          type: 'category',
          label: 'Reference Documentation',
          items: [
            'operator-manual/CRDs',
            'operator-manual/telemetry/metrics/reference',
            'operator-manual/verification-config',
          ],
        },
        {
          type: 'category',
          label: 'Air gap',
          items: [
            'operator-manual/airgap/requirements',
            'operator-manual/airgap/install',
          ],
        },
        { type: 'doc', id: 'operator-manual/monitor-mode'},
        { type: 'doc', id: 'operator-manual/Rancher-Fleet'},
      ],
    },
    {
      type: 'category',
      label: 'Security',
      link: {type: 'doc', id: 'security/intro'},
      items:[
        'security/threat-model',
        'security/verifying-kubewarden',
        `security/disclosure`
      ],
    },
  ],
};
