"use strict";(self.webpackChunkkubewarden_docusaurus=self.webpackChunkkubewarden_docusaurus||[]).push([[82933],{28957:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>h,frontMatter:()=>r,metadata:()=>s,toc:()=>l});const s=JSON.parse('{"id":"howtos/secure-supply-chain","title":"Secure supply chain","description":"A secure supply chain infrastructure using Kubewarden.","source":"@site/versioned_docs/version-1.17/howtos/secure-supply-chain.md","sourceDirName":"howtos","slug":"/howtos/secure-supply-chain","permalink":"/1.17/howtos/secure-supply-chain","draft":false,"unlisted":false,"editUrl":"https://github.com/kubewarden/docs/edit/main/versioned_docs/version-1.17/howtos/secure-supply-chain.md","tags":[],"version":"1.17","lastUpdatedAt":1743001556000,"sidebarPosition":40,"frontMatter":{"sidebar_label":"Secure supply chain","sidebar_position":40,"title":"Secure supply chain","description":"A secure supply chain infrastructure using Kubewarden.","keywords":["kubewarden","kubernetes","secure supply chain","infrastructure"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-distributor","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["distributing-policies","secure-supply-chain"]},"sidebar":"docs","previous":{"title":"Policy Groups","permalink":"/1.17/howtos/policy-groups"},"next":{"title":"Custom Certificate Authorities","permalink":"/1.17/howtos/custom-certificate-authorities"}}');var t=i(74848),o=i(28453);const r={sidebar_label:"Secure supply chain",sidebar_position:40,title:"Secure supply chain",description:"A secure supply chain infrastructure using Kubewarden.",keywords:["kubewarden","kubernetes","secure supply chain","infrastructure"],"doc-persona":["kubewarden-user","kubewarden-operator","kubewarden-distributor","kubewarden-integrator"],"doc-type":["howto"],"doc-topic":["distributing-policies","secure-supply-chain"]},a=void 0,c={},l=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Signing policies",id:"signing-policies",level:2},{value:"Keyless signing",id:"keyless-signing",level:3},{value:"How to sign artifacts in GitHub workflows",id:"how-to-sign-artifacts-in-github-workflows",level:3},{value:"Listing policy signatures",id:"listing-policy-signatures",level:2},{value:"Verifying policies",id:"verifying-policies",level:2},{value:"Configuring the policy server to check policy signatures",id:"configuring-the-policy-server-to-check-policy-signatures",level:2},{value:"Signature configuration reference",id:"signature-configuration-reference",level:2},{value:"Signature validation",id:"signature-validation",level:3},{value:"Public key validation",id:"public-key-validation",level:3},{value:"Keyless signature validation",id:"keyless-signature-validation",level:3},{value:"GitHub actions signature verification",id:"github-actions-signature-verification",level:3},{value:"Signature annotations validation",id:"signature-annotations-validation",level:3},{value:"Using a signature verification configuration file to check a policy OCI artifact",id:"using-a-signature-verification-configuration-file-to-check-a-policy-oci-artifact",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components},{Details:i,Head:s}=n;return i||u("Details",!0),s||u("Head",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s,{children:(0,t.jsx)("link",{rel:"canonical",href:"https://docs.kubewarden.io/howtos/secure-supply-chain"})}),"\n",(0,t.jsx)(n.p,{children:"A secure supply chain infrastructure can verify the validity of its parts, or links.\nIt lets users and developers show the chain of custody of its software components, or artifacts.\nIt's an active approach to mitigate security issues."}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://sigstore.dev/",children:"Sigstore"})," project provides tools and infrastructure for this.\nIt's for validating the integrity of the artifact supply chain."]}),"\n",(0,t.jsxs)(n.p,{children:["Kubewarden uses ",(0,t.jsx)(n.a,{href:"https://github.com/sigstore/cosign",children:(0,t.jsx)(n.code,{children:"cosign"})})," together with the ",(0,t.jsx)(n.a,{href:"https://github.com/SigStore/fulcio",children:"fulcio"})," and ",(0,t.jsx)(n.a,{href:"https://github.com/sigstore/rekor",children:"rekor"})," infrastructure offered by the Sigstore project."]}),"\n",(0,t.jsx)(n.p,{children:"Cluster operators can configure Kubewarden to only run policies signed by trusted entities.\nPolicy developers can sign their policies and publish them in a registry."}),"\n",(0,t.jsx)(n.h2,{id:"prerequisites",children:"Prerequisites"}),"\n",(0,t.jsxs)(n.p,{children:["In the following sections, you need a few tools to be installed.\nThese are so users can sign and verify OCI artifacts signatures.\nThe examples show the use of ",(0,t.jsx)(n.a,{href:"https://docs.sigstore.dev/cosign/installation/",children:(0,t.jsx)(n.code,{children:"cosign"})})," and ",(0,t.jsx)(n.a,{href:"https://github.com/kubewarden/kwctl",children:(0,t.jsx)(n.code,{children:"kwctl"})})," utilities for signing and inspecting policies."]}),"\n",(0,t.jsxs)(n.p,{children:["Users may also want to use GitHub to sign their policies. In which case, they need to install ",(0,t.jsx)(n.a,{href:"https://docs.sigstore.dev/cosign/installation/#github-action",children:"Github actions"})]}),"\n",(0,t.jsxs)(n.p,{children:["Keyless signing uses the default ",(0,t.jsx)(n.a,{href:"https://github.com/SigStore/fulcio",children:"fulcio"}),"\nand ",(0,t.jsx)(n.a,{href:"https://github.com/sigstore/rekor",children:"rekor"})," instances provided by the\nSigstore project.\nCheck the Sigstore documentation for details on how to use your own infrastructure for this, if needed."]}),"\n",(0,t.jsx)(n.h2,{id:"signing-policies",children:"Signing policies"}),"\n",(0,t.jsxs)(n.p,{children:["Kubewarden recommends using Sigstore's ",(0,t.jsx)(n.a,{href:"https://github.com/sigstore/cosign",children:"cosign"})," utility to signing policies.\nThis section shows a key-based method of signing policies.\nUsers need to generate a private-public key-pair for this.\nThe generated keys help to verify if the signed artifacts came from the expected user.\nTo generate this key-pair use this ",(0,t.jsx)(n.code,{children:"cosign generate-key-pair"})," command:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cosign generate-key-pair\n"})}),"\n",(0,t.jsx)(n.p,{children:"Resulting in a prompt to type and verify a password:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"Enter password for private key: \u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\nEnter password for private key again: \u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\nPrivate key written to cosign.key\nPublic key written to cosign.pub\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now you can use this key to sign policies."}),"\n",(0,t.jsxs)(n.p,{children:["The private key file, ",(0,t.jsx)(n.code,{children:"cosign.key"}),", shouldn't be shared.\nThis is a secret file only for use by the key owner for signing policies."]}),"\n",(0,t.jsxs)(n.p,{children:["To sign a policy you can use ",(0,t.jsx)(n.code,{children:"cosign sign"})," passing the ",(0,t.jsx)(n.code,{children:"--key"})," command line argument with your private key file:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cosign sign --key cosign.key ghcr.io/kubewarden/policies/user-group-psp:latest\n"})}),"\n",(0,t.jsx)(n.p,{children:"Resulting in a prompt for the password, for the specified private key:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"an error occurred: no provider found for that key reference, will try to load key from disk...\nEnter password for private key: \u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\u25cf\nPushing signature to: ghcr.io/kubewarden/policies/user-group-psp\n"})}),"\n",(0,t.jsx)(n.p,{children:"This command signs the policy by creating a new signature object.\nThe signature object is then uploaded into the registry, with the policy.\nNow the policy is ready to use in a Kubewarden installation using signature verification."}),"\n",(0,t.jsx)(n.p,{children:"The same policy can be signed multiple times, by the same user or different ones.\nThese signatures are added to the signature object along with the original signature."}),"\n",(0,t.jsxs)(n.p,{children:["For more information about how the signing process works, check out the ",(0,t.jsx)(n.a,{href:"https://docs.sigstore.dev/",children:"Sigstore project documentation"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"keyless-signing",children:"Keyless signing"}),"\n",(0,t.jsx)(n.p,{children:"Often policies are automatically built in CI/CD pipelines.\nThis complicates the key generation process.\nThis Sigstore keyless workflow is for these situations.\nInstead of using long-lived singing keys, the keyless workflow uses certificate authorities (CAs) and certificate chains."}),"\n",(0,t.jsx)(n.p,{children:"A short-lived certificate key is generated, and linked into a chain of trust.\nIt's done by an identity challenge to confirm the signer's identity.\nThe life of the certificate key is long enough for the signing to occur.\nThe identity challenge is done by authenticating against an OpenID Connect (OIDC) provider.\nSigstore's Fulcio public infrastructure is used for the chain of trust."}),"\n",(0,t.jsx)(n.p,{children:"Signing uses Sigstore's cosign utility."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ cosign sign ghcr.io/kubewarden/policies/user-group-psp:latest\n"})}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsxs)("summary",{children:[(0,t.jsx)("code",{children:"cosign"})," output"]}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"Generating ephemeral keys...\nRetrieving signed certificate...\nYour browser will now be opened to:\nhttps://oauth2.sigstore.dev/auth/auth?access_type=online&client_id=sigstore&code_challenge=<REDACTED>&code_challenge_method=S256&nonce=<REDACTED>&redirect_uri=http%3A%2F%2Flocalhost%3A34021%2Fauth%2Fcallback&response_type=code&scope=openid+email&state=<REDACTED>\nclient.go:196: root pinning is not supported in Spec 1.0.19\nSuccessfully verified SCT...\ntlog entry created with index: 1819248\nPushing signature to: ghcr.io/kubewarden/policies/user-group-psp\n"})})]}),"\n",(0,t.jsx)(n.p,{children:"This signs the policy and pushes it to the repository.\nThere are no keys generated as a byproduct."}),"\n",(0,t.jsx)(n.h3,{id:"how-to-sign-artifacts-in-github-workflows",children:"How to sign artifacts in GitHub workflows"}),"\n",(0,t.jsxs)(n.p,{children:["When using keyless signing, in a GitHub action,\n",(0,t.jsx)(n.code,{children:"cosign"})," doesn't need the user to log in to an OIDC provider.\nA GitHub token is available during the execution of the GitHub workflow.\nIt's used to authenticate the user and generate the ephemeral keys.\nThe signing process is the same used in the keyless mode.\nThis is an example of how the Kubewarden project signs its policies:"]}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:"YAML describing Kubewarden policy signing"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"# ... beginning of the workflow file ...\njobs:\n  build:\n    name: Build container image\n    runs-on: ubuntu-latest\n    steps:\n      # ... other steps building the container image ...\n      -\n      name: Login to GitHub Container Registry\n      uses: docker/login-action@v1\n      with:\n        registry: ghcr.io\n        username: ${{ github.repository_owner }}\n        password: ${{ inputs.GITHUB_TOKEN }}\n      -\n      name: Publish Wasm policy artifact to OCI registry with the 'latest' tag\n      shell: bash\n      if: ${{ startsWith(github.ref, 'refs/heads/') }}\n      env:\n        COSIGN_EXPERIMENTAL: 1\n      run: |\n        set -ex\n        echo Pushing policy to OCI container registry\n        IMMUTABLE_REF=$(kwctl push -o json ${{ PATH_TO_BUILT_WASM_FILE }} ghcr.io/myorg/policies/my-great-policy:latest | jq -r .immutable_ref)\n        echo Keyless signing of policy using cosign\n        cosign sign ${IMMUTABLE_REF}\n      # ... other build steps ...\n\n# ... remainder of the workflow file ...\n"})})]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"Policy developers can use the Kubewarden policy templates. They have GitHub actions to build, test, sign and publish policies."})}),"\n",(0,t.jsx)(n.h2,{id:"listing-policy-signatures",children:"Listing policy signatures"}),"\n",(0,t.jsxs)(n.p,{children:["You can check signature in a published policy with ",(0,t.jsx)(n.code,{children:"kwctl inspect"}),".\nThis shows the information about the policy and its signatures as shown below:"]}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)("code",{children:"kwctl inspect registry://ghcr.io/kubewarden/policies/us...."})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ kwctl inspect registry://ghcr.io/kubewarden/policies/user-group-psp:v0.2.0\nDetails\ntitle:              psp-user-group\ndescription:        Short description\nauthor:             Jos\xe9 Guilherme Vanz <jguilhermevanz@suse.com>\nurl:                https://github.com/kubewarden/user-group-psp-policy\nsource:             https://github.com/kubewarden/user-group-psp-policy\nlicense:            Apache-2.0\nmutating:           true\ncontext aware:      false\nexecution mode:     kubewarden-wapc\nprotocol version:   1\n\nAnnotations\nio.kubewarden.kwctl 0.2.5-rc2\n\nRules\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n---\n- apiGroups:\n    - ""\n  apiVersions:\n    - v1\n  resources:\n    - pods\n  operations:\n    - CREATE\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n\nUsage\nThis policy enforce the user and group used in the container.\n\nSigstore signatures\n\nDigest:                            sha256:026af67682a85d424e7d95db460171635f5c3957d67b53499bece912cc0413cc\nMedia type:                        application/vnd.dev.cosign.simplesigning.v1+json\nSize:                              258\nAnnotations\ndev.sigstore.cosign/certificate    -----BEGIN CERTIFICATE-----\n                                   MIIDRzCCAsygAwIBAgITbPUZlUFkkAHtbzc3rzC/3zXj1DAKBggqhkjOPQQDAzAq\n                                   MRUwEwYDVQQKEwxzaWdzdG9yZS5kZXYxETAPBgNVBAMTCHNpZ3N0b3JlMB4XDTIy\n                                   MDIyNTE2MzAwMloXDTIyMDIyNTE2NDAwMVowEzERMA8GA1UEChMIc2lnc3RvcmUw\n                                   WTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAR/O5c6ZI5BzBweoEIam4uWu5fqzHx0\n                                   3PTCgfXyyvIjorz9wX08bsndkHdWfFObU+PztbxX78An43Yw9/fHtO93o4IB5jCC\n                                   AeIwDgYDVR0PAQH/BAQDAgeAMBMGA1UdJQQMMAoGCCsGAQUFBwMDMAwGA1UdEwEB\n                                   /wQCMAAwHQYDVR0OBBYEFCP/v7NEJQglbDmyC5VMgnvhiuBUMB8GA1UdIwQYMBaA\n                                   FFjAHl+RRaVmqXrMkKGTItAqxcX6MHgGA1UdEQRxMG+GbWh0dHBzOi8vZ2l0aHVi\n                                   LmNvbS9rdWJld2FyZGVuL2dpdGh1Yi1hY3Rpb25zLy5naXRodWIvd29ya2Zsb3dz\n                                   L3JldXNhYmxlLXJlbGVhc2UtcG9saWN5LXJ1c3QueW1sQHJlZnMvaGVhZHMvdjEw\n                                   NgYKKwYBBAGDvzABAwQoMmJiMGQ4NjZjMzFmOGMyZTQ3NDMxMDI4M2ExNmFkMWFi\n                                   NjBlZjA1YjAuBgorBgEEAYO/MAEFBCBrdWJld2FyZGVuL3VzZXItZ3JvdXAtcHNw\n                                   LXBvbGljeTAcBgorBgEEAYO/MAEEBA5SZWxlYXNlIHBvbGljeTASBgorBgEEAYO/\n                                   MAECBARwdXNoMDkGCisGAQQBg78wAQEEK2h0dHBzOi8vdG9rZW4uYWN0aW9ucy5n\n                                   aXRodWJ1c2VyY29udGVudC5jb20wHgYKKwYBBAGDvzABBgQQcmVmcy90YWdzL3Yw\n                                   LjIuMDAKBggqhkjOPQQDAwNpADBmAjEAyGQbNCkOifStO7yCCfF8yXyc144ANn2x\n                                   Ty92WYC0pTaVhviOED47fgD6TncKf+92AjEAjBfjLmCG/Mwrh8t+gfHJEAWWEc9Q\n                                   +j9NR4wF66uABS/TTh5CYlrnIuqSD+GBHGwV\n                                   -----END CERTIFICATE-----\ndev.sigstore.cosign/timestamp      {"signatures":[{"keyid":"b6710623a30c010738e64c5209d367df1c0a18cf90e6ab5292fb01680f83453d","sig":"3046022100f666a7f4b3d85d8003f2c166e27827dfa0c4ab9282e9dab19485f4e702c61700022100dfe826e0edab5f80a40f08cc87b87777a4db30775d85684fe4950e797f2f565c"}],"signed":{"_type":"timestamp","spec_version":"1.0","version":15,"expires":"2022-03-08T19:14:05Z","meta":{"snapshot.json":{"length":1655,"hashes":{"sha256":"36cf063d0717f6dc03e23027721adcd69b684d293956d3a1a7db7b0848f711d7","sha512":"f90946d0a2dc58dae4505cfb91517a40299adf9e8719f52af187e2025aad69fcdeaeded271ec25db24869841c16fbe24f3fc56f56af8fdbb8808dccec4636b64"},"version":15}}}}\ndev.sigstore.cosign/bundle         {"SignedEntryTimestamp":"MEUCIEfu4qR+HsexSDk5h2QXMduvoRCX10J+4CLQWtYw5VD6AiEAyYCEjvJdv2Sr5tZ4LApnddH/4v+CoV1QkuvbCQ3iIUM=","Payload":{"body":"eyJhcGlWZXJzaW9uIjoiMC4wLjEiLCJraW5kIjoiaGFzaGVkcmVrb3JkIiwic3BlYyI6eyJkYXRhIjp7Imhhc2giOnsiYWxnb3JpdGhtIjoic2hhMjU2IiwidmFsdWUiOiIwMjZhZjY3NjgyYTg1ZDQyNGU3ZDk1ZGI0NjAxNzE2MzVmNWMzOTU3ZDY3YjUzNDk5YmVjZTkxMmNjMDQxM2NjIn19LCJzaWduYXR1cmUiOnsiY29udGVudCI6Ik1FWUNJUUNXNWZRZ1BUUTdaTlNuRkhzbHJOTlFrS2dTSVFpOGNSMTU5UEExc0s4VGlRSWhBSndMOWJPcUJKbVduN1lLZG9Tem80c2xPZ2s4SkJCanFYZHNydDNyeVF0QiIsInB1YmxpY0tleSI6eyJjb250ZW50IjoiTFMwdExTMUNSVWRKVGlCRFJWSlVTVVpKUTBGVVJTMHRMUzB0Q2sxSlNVUlNla05EUVhONVowRjNTVUpCWjBsVVlsQlZXbXhWUm10clFVaDBZbnBqTTNKNlF5OHplbGhxTVVSQlMwSm5aM0ZvYTJwUFVGRlJSRUY2UVhFS1RWSlZkMFYzV1VSV1VWRkxSWGQ0ZW1GWFpIcGtSemw1V2xNMWExcFlXWGhGVkVGUVFtZE9Wa0pCVFZSRFNFNXdXak5PTUdJelNteE5RalJZUkZSSmVRcE5SRWw1VGxSRk1rMTZRWGROYkc5WVJGUkplVTFFU1hsT1ZFVXlUa1JCZDAxV2IzZEZla1ZTVFVFNFIwRXhWVVZEYUUxSll6SnNibU16VW5aamJWVjNDbGRVUVZSQ1oyTnhhR3RxVDFCUlNVSkNaMmR4YUd0cVQxQlJUVUpDZDA1RFFVRlNMMDgxWXpaYVNUVkNla0ozWlc5RlNXRnROSFZYZFRWbWNYcEllREFLTTFCVVEyZG1XSGw1ZGtscWIzSjZPWGRZTURoaWMyNWthMGhrVjJaR1QySlZLMUI2ZEdKNFdEYzRRVzQwTTFsM09TOW1TSFJQT1ROdk5FbENOV3BEUXdwQlpVbDNSR2RaUkZaU01GQkJVVWd2UWtGUlJFRm5aVUZOUWsxSFFURlZaRXBSVVUxTlFXOUhRME56UjBGUlZVWkNkMDFFVFVGM1IwRXhWV1JGZDBWQ0NpOTNVVU5OUVVGM1NGRlpSRlpTTUU5Q1FsbEZSa05RTDNZM1RrVktVV2RzWWtSdGVVTTFWazFuYm5ab2FYVkNWVTFDT0VkQk1WVmtTWGRSV1UxQ1lVRUtSa1pxUVVoc0sxSlNZVlp0Y1ZoeVRXdExSMVJKZEVGeGVHTllOazFJWjBkQk1WVmtSVkZTZUUxSEswZGlWMmd3WkVoQ2VrOXBPSFphTW13d1lVaFdhUXBNYlU1MllsTTVjbVJYU214a01rWjVXa2RXZFV3eVpIQmtSMmd4V1dreGFGa3pVbkJpTWpWNlRIazFibUZZVW05a1YwbDJaREk1ZVdFeVduTmlNMlI2Q2t3elNteGtXRTVvV1cxNGJFeFlTbXhpUjFab1l6SlZkR05IT1hOaFYwNDFURmhLTVdNelVYVmxWekZ6VVVoS2JGcHVUWFpoUjFab1draE5kbVJxUlhjS1RtZFpTMHQzV1VKQ1FVZEVkbnBCUWtGM1VXOU5iVXBwVFVkUk5FNXFXbXBOZWtadFQwZE5lVnBVVVROT1JFMTRUVVJKTkUweVJYaE9iVVpyVFZkR2FRcE9ha0pzV21wQk1WbHFRWFZDWjI5eVFtZEZSVUZaVHk5TlFVVkdRa05DY21SWFNteGtNa1o1V2tkV2RVd3pWbnBhV0VsMFdqTktkbVJZUVhSalNFNTNDa3hZUW5aaVIyeHFaVlJCWTBKbmIzSkNaMFZGUVZsUEwwMUJSVVZDUVRWVFdsZDRiRmxZVG14SlNFSjJZa2RzYW1WVVFWTkNaMjl5UW1kRlJVRlpUeThLVFVGRlEwSkJVbmRrV0U1dlRVUnJSME5wYzBkQlVWRkNaemM0ZDBGUlJVVkxNbWd3WkVoQ2VrOXBPSFprUnpseVdsYzBkVmxYVGpCaFZ6bDFZM2sxYmdwaFdGSnZaRmRLTVdNeVZubFpNamwxWkVkV2RXUkROV3BpTWpCM1NHZFpTMHQzV1VKQ1FVZEVkbnBCUWtKblVWRmpiVlp0WTNrNU1GbFhaSHBNTTFsM0NreHFTWFZOUkVGTFFtZG5jV2hyYWs5UVVWRkVRWGRPY0VGRVFtMUJha1ZCZVVkUllrNURhMDlwWmxOMFR6ZDVRME5tUmpoNVdIbGpNVFEwUVU1dU1uZ0tWSGs1TWxkWlF6QndWR0ZXYUhacFQwVkVORGRtWjBRMlZHNWpTMllyT1RKQmFrVkJha0ptYWt4dFEwY3ZUWGR5YURoMEsyZG1TRXBGUVZkWFJXTTVVUW9yYWpsT1VqUjNSalkyZFVGQ1V5OVVWR2cxUTFsc2NtNUpkWEZUUkN0SFFraEhkMVlLTFMwdExTMUZUa1FnUTBWU1ZFbEdTVU5CVkVVdExTMHRMUW89In19fX0=","integratedTime":1645806604,"logIndex":1506651,"logID":"c0d23d6ad406973f9559f3ba2d1ca01f84147d8ffc5b8445c224f98b9591801d"}}\ndev.sigstore.cosign/chain          -----BEGIN CERTIFICATE-----\n                                   MIIB9zCCAXygAwIBAgIUALZNAPFdxHPwjeDloDwyYChAO/4wCgYIKoZIzj0EAwMw\n                                   KjEVMBMGA1UEChMMc2lnc3RvcmUuZGV2MREwDwYDVQQDEwhzaWdzdG9yZTAeFw0y\n                                   MTEwMDcxMzU2NTlaFw0zMTEwMDUxMzU2NThaMCoxFTATBgNVBAoTDHNpZ3N0b3Jl\n                                   LmRldjERMA8GA1UEAxMIc2lnc3RvcmUwdjAQBgcqhkjOPQIBBgUrgQQAIgNiAAT7\n                                   XeFT4rb3PQGwS4IajtLk3/OlnpgangaBclYpsYBr5i+4ynB07ceb3LP0OIOZdxex\n                                   X69c5iVuyJRQ+Hz05yi+UF3uBWAlHpiS5sh0+H2GHE7SXrk1EC5m1Tr19L9gg92j\n                                   YzBhMA4GA1UdDwEB/wQEAwIBBjAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBRY\n                                   wB5fkUWlZql6zJChkyLQKsXF+jAfBgNVHSMEGDAWgBRYwB5fkUWlZql6zJChkyLQ\n                                   KsXF+jAKBggqhkjOPQQDAwNpADBmAjEAj1nHeXZp+13NWBNa+EDsDP8G1WWg1tCM\n                                   WP/WHPqpaVo0jhsweNFZgSs0eE7wYI4qAjEA2WB9ot98sIkoF3vZYdd3/VtWB5b9\n                                   TNMea7Ix/stJ5TfcLLeABLE4BNJOsQ4vnBHJ\n                                   -----END CERTIFICATE-----\ndev.cosignproject.cosign/signature MEYCIQCW5fQgPTQ7ZNSnFHslrNNQkKgSIQi8cR159PA1sK8TiQIhAJwL9bOqBJmWn7YKdoSzo4slOgk8JBBjqXdsrt3ryQtB\n'})})]}),"\n",(0,t.jsx)(n.h2,{id:"verifying-policies",children:"Verifying policies"}),"\n",(0,t.jsxs)(n.p,{children:["You can check if a policy is correctly signed with  ",(0,t.jsx)(n.code,{children:"cosign"})," or ",(0,t.jsx)(n.code,{children:"kwctl"}),".\nThey have similar command line options for checking policy signatures.\nTo check if the binary is signed with a key, use ",(0,t.jsx)(n.code,{children:"kwctl"})," like this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kwctl verify -k cosign.pub ghcr.io/kubewarden/policies/user-group-psp:latest\n2022-03-29T14:49:31.878180Z  INFO kwctl::verify: Policy successfully verified\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Or ",(0,t.jsx)(n.code,{children:"cosign"})," :"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ cosign verify --key cosign.pub ghcr.io/kubewarden/policies/user-group-psp:latest\n\nVerification for ghcr.io/kubewarden/policies/user-group-psp:latest --\nThe following checks were performed on each of these signatures:\n  - The cosign claims were validated\n  - The signatures were verified against the specified public key\n  - Any certificates were verified against the Fulcio roots.\n\n[{"critical":{"identity":{"docker-reference":"ghcr.io/kubewarden/policies/user-group-psp"},"image":{"docker-manifest-digest":"sha256:af520a8ccee03811d426c48634b7007f1220c121cc23e14962bb64510585ce97"},"type":"cosign container image signature"},"optional":null}]\n'})}),"\n",(0,t.jsx)(n.h2,{id:"configuring-the-policy-server-to-check-policy-signatures",children:"Configuring the policy server to check policy signatures"}),"\n",(0,t.jsxs)(n.p,{children:["You can configure Kubewarden with a ",(0,t.jsx)(n.code,{children:"ConfigMap"})," to only run trusted policies.\nThe ",(0,t.jsx)(n.code,{children:"ConfigMap"})," structure described in ",(0,t.jsx)(n.a,{href:"/1.17/reference/verification-config#signature-configuration-reference",children:"Signature Config Reference"}),".\nIt's used to verify a policy using ",(0,t.jsx)(n.code,{children:"kwctl"}),".\nThe ",(0,t.jsx)(n.code,{children:"ConfigMap"})," should define allowable configurations under the ",(0,t.jsx)(n.code,{children:"verification-config"})," field."]}),"\n",(0,t.jsxs)(n.p,{children:["For example, you want to run policies signed by the Kubewarden GitHub organization. Then a sample ",(0,t.jsx)(n.code,{children:"ConfigMap"})," for this scenario would be:"]}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)("code",{children:"$ cat kubewarden_signatures.yaml"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ cat kubewarden_signatures.yaml\napiVersion: v1\nallOf:\n  - kind: githubAction\n    owner: kubewarden\n\n# note that the data is stored under verification-config field\n$ kubectl  create configmap my-signatures-configuration --from-file=verification-config=kubewarden_signatures.yaml\n\n$ kubectl get configmap -o yaml my-signatures-configuration\napiVersion: v1\ndata:\n  verification-config: |\n    apiVersion: v1\n    allOf:\n      - kind: githubAction\n        owner: kubewarden\nkind: ConfigMap\nmetadata:\n  creationTimestamp: "2022-03-29T18:27:20Z"\n  name: my-signatures-configuration\n  namespace: default\n  resourceVersion: "10279"\n  uid: d53e1c56-1fee-45de-92f5-9bd73b8cead4\n'})})]}),"\n",(0,t.jsxs)(n.p,{children:["You can use ",(0,t.jsx)(n.code,{children:"kwctl scaffold verification-config"})," to generate a default verification configuration file for the ",(0,t.jsx)(n.code,{children:"ConfigMap"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kwctl scaffold verification-config > verification_config.yaml\n"})}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)("code",{children:"$ cat verification_config.yaml"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kwctl scaffold verification-config > verification_config.yaml\n$ cat verification_config.yaml\n# Default Kubewarden verification config\n#\n# With this config, the only valid policies are those signed by Kubewarden\n# infrastructure.\n#\n# This config can be saved to its default location (for this OS) with:\n#   kwctl scaffold verification-config > /home/kubewarden/.config/kubewarden/verification-config.yml\n#\n# Providing a config in the default location enables Sigstore verification.\n# See https://docs.kubewarden.io for more Sigstore verification options.\n---\napiVersion: v1\nallOf:\n  - kind: githubAction\n    owner: kubewarden\n    repo: ~\n    annotations: ~\nanyOf: ~\n"})})]}),"\n",(0,t.jsxs)(n.p,{children:["You can use this ",(0,t.jsx)(n.code,{children:"verification_config.yml"})," to create the ",(0,t.jsx)(n.code,{children:"ConfigMap"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ kubectl create configmap my-signatures-configuration --from-file==verification_config.yaml\nconfigmap/my-signatures-configuration created\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Then we can inspect with ",(0,t.jsx)(n.code,{children:"get configmap"}),"."]}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)("code",{children:"kubectl get configmap"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:'$ kubectl get configmap -o yaml my-signatures-configuration\napiVersion: v1\ndata:\n  verification-config: |+\n    # Default Kubewarden verification config\n    #\n    # With this config, the only valid policies are those signed by Kubewarden\n    # infrastructure.\n    #\n    # This config can be saved to its default location (for this OS) with:\n    #   kwctl scaffold verification-config > /home/kubewarden/.config/kubewarden/verification-config.yml\n    #\n    # Providing a config in the default location enables Sigstore verification.\n    # See https://docs.kubewarden.io for more Sigstore verification options.\n    ---\n    apiVersion: v1\n    allOf:\n      - kind: githubAction\n        owner: kubewarden\n        repo: ~\n        annotations: ~\n    anyOf: ~\n\nkind: ConfigMap\nmetadata:\n  creationTimestamp: "2022-04-07T11:54:27Z"\n  name: my-signatures-configuration\n  namespace: default\n  resourceVersion: "1317"\n  uid: 74dec846-7fcd-4b4b-8184-700c816f685a\n'})})]}),"\n",(0,t.jsxs)(n.p,{children:["After creating the ",(0,t.jsx)(n.code,{children:"ConfigMap"})," to store the signature requirements, you can configure a Policy Server.\nTo start validating policy signatures by setting the ",(0,t.jsx)(n.code,{children:"ConfigMap"})," name in the highlighted field ",(0,t.jsx)(n.code,{children:"verificationConfig"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:'apiVersion: policies.kubewarden.io/v1alpha2\nkind: PolicyServer\nmetadata:\n  name: default\n  finalizers:\n    - kubewarden\nspec:\n  image: ghcr.io/kubewarden/policy-server:v0.2.7\n  serviceAccountName: policy-server\n  replicas: 1\n//highlight-next-line\n  verificationConfig: your_configmap   #name of the confimap with the signatures requirements\n  env:\n    - name: KUBEWARDEN_ENABLE_METRICS\n      value: "1"\n    - name: KUBEWARDEN_LOG_FMT\n      value: otlp\n    - name: "KUBEWARDEN_LOG_LEVEL"\n      value: "info"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["If you deploy the default Policy Server using the ",(0,t.jsx)(n.code,{children:"kubewarden-defaults"}),"\nHelm chart then you configure this field by setting the ",(0,t.jsx)(n.code,{children:"ConfigMap"})," name in the\n",(0,t.jsx)(n.code,{children:"policyServer.verificationConfig"})," value."]}),"\n",(0,t.jsx)(n.p,{children:"Now, the PolicyServer rejects untrusted AdmissionPolicies and ClusterAdmissionPolicies by refusing to start.\nYou need to remove the untrusted policy, or change the signatures requirement, for a running PolicyServer."}),"\n",(0,t.jsx)(n.h2,{id:"signature-configuration-reference",children:"Signature configuration reference"}),"\n",(0,t.jsx)(n.p,{children:"You can validate signature requirements contained in a file. Here is an example:"}),"\n",(0,t.jsxs)(i,{children:[(0,t.jsx)("summary",{children:(0,t.jsx)(n.p,{children:"A file of signature requirements"})}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"apiVersion: v1\n\n//highlight-next-line\nallOf:\n  - kind: githubAction\n    owner: kubewarden   # mandatory\n    annotations:\n      env: prod\n\n//highlight-next-line\nanyOf: # at least `anyOf.minimumMatches` are required to match\n  minimumMatches: 2 # default is 1\n  signatures:\n  - kind: pubKey\n    owner: flavio # optional\n    key: .... # mandatory\n    annotations:  # optional\n      env: prod\n      foo: bar\n  - kind: pubKey\n    owner: victor # optional\n    key: .... # mandatory\n  - kind: genericIssuer\n    issuer: https://github.com/login/oauth\n    subject:\n      equal: alice@example.com\n  - kind: genericIssuer\n    issuer: https://token.actions.githubusercontent.com\n    subject:\n      equal: https://github.com/flavio/policy-secure-pod-images/.github/workflows/release.yml@refs/heads/main\n  - kind: genericIssuer\n    issuer: https://token.actions.githubusercontent.com\n    subject:\n      urlPrefix: https://github.com/flavio/\n  - kind: genericIssuer\n    issuer: https://token.actions.githubusercontent.com\n    subject:\n      urlPrefix: https://github.com/kubewarden # <- it will be post-fixed with `/` for security reasons\n  - kind: githubAction\n    owner: flavio   # mandatory\n    repo: policy1 # optional\n  - kind: pubKey\n    owner: alice # optional\n    key: .... # mandatory\n"})})]}),"\n",(0,t.jsx)(n.h3,{id:"signature-validation",children:"Signature validation"}),"\n",(0,t.jsxs)(n.p,{children:["The configuration above contains the two highlighted sections, ",(0,t.jsx)(n.code,{children:"allOf"})," and ",(0,t.jsx)(n.code,{children:"anyOf"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"allOf"}),": The policy is trusted only if all signature requirements here are valid."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"anyOf"}),":  The policy is trusted if the ",(0,t.jsx)(n.code,{children:"minimumMatches"})," criterion is met.\nAbove, the ",(0,t.jsx)(n.code,{children:"minimumMatches"})," field is 2.\nSo, at least two of the signature requirements must be met.\nThe default value for ",(0,t.jsx)(n.code,{children:"minimumMatches"})," field is ",(0,t.jsx)(n.code,{children:"1"}),"."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["All the signatures requirements from ",(0,t.jsx)(n.code,{children:"allOf"})," ",(0,t.jsx)(n.strong,{children:"and"})," the minimum number from ",(0,t.jsx)(n.code,{children:"anyOf"})," must be met."]}),"\n",(0,t.jsx)(n.h3,{id:"public-key-validation",children:"Public key validation"}),"\n",(0,t.jsxs)(n.p,{children:["To check a policy is signed with the correct public key, you specify the key data and the owner of the key.\nIn this example, ",(0,t.jsx)(n.code,{children:"kind"})," is set to ",(0,t.jsx)(n.code,{children:"pubKey"})," and the ",(0,t.jsx)(n.code,{children:"key"})," has the public key.\nThe owner field is optional, but can be useful to clarify who owns the key."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"  - kind: pubKey\n    owner: bob # optional\n    key: |\n      -----BEGIN PUBLIC KEY-----\n      MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD\n      BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==\n      -----END PUBLIC KEY-----\n"})}),"\n",(0,t.jsx)(n.h3,{id:"keyless-signature-validation",children:"Keyless signature validation"}),"\n",(0,t.jsxs)(n.p,{children:["A policy signed in keyless mode doesn't have a public key we can verify.\nYou can still verify the policy with the OIDC data used during the signing process.\nFor that, it's necessary to define the signature validation as ",(0,t.jsx)(n.code,{children:"genericIssuer"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"It's possible to verify information from the signature:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"issuer"}),"(mandatory): this matches the ",(0,t.jsx)(n.code,{children:"Issuer"})," attribute in the certificate generated by Fulcio.\nThis shows the OIDC used to sign the policy."]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"subject"}),": field used to match the ",(0,t.jsx)(n.code,{children:"Subject"})," attribute in Fulcio's certificate.\nThe ",(0,t.jsx)(n.code,{children:"Subject"})," (Fulcio) field contains the user used to authenticate against the OIDC provider.\nThe verification field, ",(0,t.jsx)(n.code,{children:"subject"}),", can have one of two sub fields:","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"equal"}),": the ",(0,t.jsx)(n.code,{children:"Subject"})," (Fulcio) from the certificate must be equal to the value in the signature validation;"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"urlPrefix"}),": the certificate's ",(0,t.jsx)(n.code,{children:"Subject"})," (Fulcio) field value must be prefixed by the value defined in the signature validation."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.p,{children:["Both the ",(0,t.jsx)(n.code,{children:"cosign verify"})," and the ",(0,t.jsx)(n.code,{children:"kwctl inspect"})," can show information about keyless signatures."]})}),"\n",(0,t.jsx)(n.p,{children:"For example, this configuration means the policy must have a keyless signature from Alice using the GitHub OIDC:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- kind: genericIssuer\n  issuer: https://github.com/login/oauth\n  subject:\n    equal: alice@example.com\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This configuration needs the policy to be signed in GitHub actions,\nfrom a repository owned by the GitHub user ",(0,t.jsx)(n.code,{children:"flavio"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- kind: genericIssuer\n  issuer: https://token.actions.githubusercontent.com\n  subject:\n    urlPrefix: https://github.com/flavio\n"})}),"\n",(0,t.jsx)(n.h3,{id:"github-actions-signature-verification",children:"GitHub actions signature verification"}),"\n",(0,t.jsxs)(n.p,{children:['The "kind", ',(0,t.jsx)(n.code,{children:"githubAction"})," is to validate policies signed in GitHub Actions.\nYou can do this with the ",(0,t.jsx)(n.code,{children:"genericIssuer"})," kind as well.\nTo simplify the signature requirement process, use two extra fields for ",(0,t.jsx)(n.code,{children:"githubAction"}),":"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"owner"})," (mandatory): GitHub ID of the user or organization to trust"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"repo"}),": the name of the repository to trust"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["For example, the last snippet, using ",(0,t.jsx)(n.code,{children:"genericIssuer"}),", could be rewritten as:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- kind: githubAction\n  owner: flavio\n"})}),"\n",(0,t.jsx)(n.h3,{id:"signature-annotations-validation",children:"Signature annotations validation"}),"\n",(0,t.jsxs)(n.p,{children:["All signature types can have other optional validation fields, ",(0,t.jsx)(n.code,{children:"annotations"}),".\nThese fields are key/value data added by during the signing process."]}),"\n",(0,t.jsxs)(n.p,{children:["With Kubewarden, you can ensure policies are signed by trusted users\n",(0,t.jsx)(n.strong,{children:"and"})," have specific annotations."]}),"\n",(0,t.jsx)(n.p,{children:"The next validation checks 2 conditions for the policy:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"that it's signed with a specific key"}),"\n",(0,t.jsx)(n.li,{children:"it has a production environment annotation."}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-yaml",children:"- kind: pubKey\n  key: |\n    -----BEGIN PUBLIC KEY-----\n    MBFKHFDGHKIJH0CAQYIKoZIzj0DAQcDQgAEX0HFTtCfTtPmkx5p1RbDE6HJSGAVD\n    BVDF6SKFSF87AASUspkQsN3FO4iyWodCy5j3o0CdIJD/KJHDJFHDFIu6sA==\n    -----END PUBLIC KEY-----\n  annotations:\n    environment: production\n"})}),"\n",(0,t.jsx)(n.h3,{id:"using-a-signature-verification-configuration-file-to-check-a-policy-oci-artifact",children:"Using a signature verification configuration file to check a policy OCI artifact"}),"\n",(0,t.jsxs)(n.p,{children:["You can test if a policy passes verification using the verification config file.\nUse the ",(0,t.jsx)(n.code,{children:"--verification-config-path"}),"  flag of the ",(0,t.jsx)(n.code,{children:"kwctl verify"})," command"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ cat signatures_requirements.yaml\napiVersion: v1\nallOf:\n  - kind: pubKey\n    key: |\n      -----BEGIN PUBLIC KEY-----\n      MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE5Q+cN1Jj2S7N05J4AXnqwP2DyzSg\n      Mc+raYce2Wthrd30MSgFtoh5ADAkCd/nML2Nx8UD9KBuASRb0gG5jXqgMQ==\n      -----END PUBLIC KEY-----\n\n$ kwctl verify --verification-config-path signatures_requirements.yaml ghcr.io/kubewarden/policies/user-group-psp:latest\n2022-03-29T17:34:37.847169Z  INFO kwctl::verify: Policy successfully verified\n"})}),"\n",(0,t.jsx)(n.p,{children:"This last example tests if a given policy came from the Kubewarden organization:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-console",children:"$ cat kubewarden_signatures.yaml\napiVersion: v1\nallOf:\n  - kind: githubAction\n    owner: kubewarden\n\n$ kwctl verify --verification-config-path kubewarden_signatures.yaml ghcr.io/kubewarden/policies/user-group-psp:latest\n2022-03-29T18:07:39.062292Z  INFO kwctl::verify: Policy successfully verified\n"})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}function u(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}},28453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var s=i(96540);const t={},o=s.createContext(t);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);