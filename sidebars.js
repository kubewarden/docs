module.exports = {
  docs: [
    "introduction",
    {
      type: "category",
      label: "Tutorials",
      items: [
        "quick-start",
        "tasks",
        {
          type: "category",
          label: "Writing Policies",
          items: [
            "writing-policies/index",
            {
              type: "category",
              label: "Rust",
              link: { type: "doc", id: "writing-policies/rust/intro-rust" },
              items: [
                "writing-policies/rust/create-policy",
                "writing-policies/rust/define-policy-settings",
                "writing-policies/rust/write-validation-logic",
                "writing-policies/rust/mutation-policy",
                "writing-policies/rust/logging",
                "writing-policies/rust/build-and-distribute",
                "writing-policies/rust/raw-policies",
              ],
            },
            {
              type: "category",
              label: "Go",
              link: { type: "doc", id: "writing-policies/go/intro-go" },
              items: [
                "writing-policies/go/scaffold",
                "writing-policies/go/policy-settings",
                "writing-policies/go/validation",
                "writing-policies/go/e2e-tests",
                "writing-policies/go/logging",
                "writing-policies/go/automate",
                "writing-policies/go/distribute",
                "writing-policies/go/validation-with-queries",
                "writing-policies/go/raw-policies",
              ],
            },
            {
              type: "category",
              label: "Rego",
              link: { type: "doc", id: "writing-policies/rego/intro-rego" },
              items: [
                { type: "doc", id: "writing-policies/rego/builtin-support" },
                {
                  type: "category",
                  label: "Open Policy Agent",
                  link: {
                    type: "doc",
                    id: "writing-policies/rego/open-policy-agent/intro",
                  },
                  items: [
                    "writing-policies/rego/open-policy-agent/create-policy",
                    "writing-policies/rego/open-policy-agent/build-and-run",
                    "writing-policies/rego/open-policy-agent/distribute",
                    "writing-policies/rego/open-policy-agent/raw-policies",
                  ],
                },
                {
                  type: "category",
                  label: "Gatekeeper",
                  link: {
                    type: "doc",
                    id: "writing-policies/rego/gatekeeper/intro",
                  },
                  items: [
                    "writing-policies/rego/gatekeeper/create-policy",
                    "writing-policies/rego/gatekeeper/build-and-run",
                    "writing-policies/rego/gatekeeper/distribute",
                  ],
                },
              ],
            },
            "writing-policies/dotnet",
            "writing-policies/swift",
            "writing-policies/typescript",
            "writing-policies/other-languages",
            {
              type: "category",
              label: "WASI",
              link: { type: "doc", id: "writing-policies/wasi/intro-wasi" },
              items: ["writing-policies/wasi/raw-policies"],
            },
            "writing-policies/metadata",
          ],
        },
        {
          type: "category",
          label: "Testing policies",
          link: { type: "doc", id: "testing-policies/intro" },
          items: [
            "testing-policies/policy-authors",
            "testing-policies/cluster-operators",
          ],
        },
        "distributing-policies/publish-policy-to-artifact-hub",
        "security/verifying-kubewarden",
      ],
      collapsed: false,
    },
    {
      type: "category",
      label: "Explanations",
      items: [
        "tasksDir/mutating-policies",
        "distributing-policies",
        "explanations/context-aware-policies",
        {
          Comparisons: ["explanations/opa-comparison"],
        },
        {
          type: "category",
          label: "Audit Scanner",
          link: { type: "doc", id: "explanations/audit-scanner/audit-scanner" },
          items: [
            "explanations/audit-scanner/limitations",
            "explanations/audit-scanner/policy-reports",
          ],
        },
      ],
      collapsed: true,
    },
    {
      type: "category",
      label: "How-tos",
      items: [
        "tasksDir/psp-migration",
        "tasksDir/pod-security-admission-with-kubewarden",
        "distributing-policies/secure-supply-chain",
        "distributing-policies/custom-certificate-authorities",
        {
          type: "category",
          label: "Operator Manual",
          link: { type: "doc", id: "operator-manual/intro" },
          items: [
            {
              "Configuring Policy Servers": [
                "operator-manual/policy-servers/custom-cas",
                "operator-manual/policy-servers/private-registry",
              ],
            },
            "operator-manual/policies",
            {
              "Quickstart Guides": [
                "operator-manual/telemetry/opentelemetry/quickstart",
                "operator-manual/telemetry/metrics/quickstart",
                "operator-manual/telemetry/tracing/quickstart",
              ],
              "Air gap": [
                "operator-manual/airgap/requirements",
                "operator-manual/airgap/install",
              ],
            },
          ],
        },
        "howtos/raw-policies",
        "howtos/audit-scanner",
      ],
      collapsed: true,
    },
    {
      type: "category",
      label: "Reference documentation",
      items: [
        "architecture",
        {
          type: "category",
          label: "Policy Specification",
          items: [
            "writing-policies/spec/intro-spec",
            "writing-policies/spec/settings",
            "writing-policies/spec/validating-policies",
            "writing-policies/spec/mutating-policies",
            "writing-policies/spec/context-aware-policies",
            {
              type: "category",
              label: "Host Capabilities",
              link: {
                type: "doc",
                id: "writing-policies/spec/host-capabilities/intro-host-capabilities",
              },
              items: [
                "writing-policies/spec/host-capabilities/signature-verifier-policies",
                "writing-policies/spec/host-capabilities/container-registry",
                "writing-policies/spec/host-capabilities/net",
                "writing-policies/spec/host-capabilities/crypto",
                "writing-policies/spec/host-capabilities/kubernetes",
              ],
            },
          ],
        },
        "distributing-policies/oci-registries-support",
        "security/threat-model",
        "operator-manual/upgrade-path",
        "operator-manual/dependency-matrix",
        {
          type: "category",
          label: "Operator Manual",
          items: [
            "operator-manual/telemetry/metrics/reference",
            "operator-manual/CRDs",
            "operator-manual/verification-config",
          ],
        },
        {
          type: "category",
          label: "Rancher UI Extension",
          items: [
            "operator-manual/ui-extension/install",
            "operator-manual/ui-extension/metrics",
            "operator-manual/ui-extension/tracing",
          ],
        },
        {
          type: "category",
          label: "Air gap",
          items: [
            "operator-manual/airgap/requirements",
            "operator-manual/airgap/install",
          ],
        },
        { type: "doc", id: "operator-manual/monitor-mode" },
        { type: "doc", id: "operator-manual/Rancher-Fleet" },
        { type: "doc", id: "operator-manual/policy-evaluation-timeout" },
      ],
      collapsed: true,
    },
    `security/disclosure`,
    `info-arch/ia`,
  ],
};
