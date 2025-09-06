---
sidebar_label: Validation logic
sidebar_position: 040
title: Writing the validation logic
description: A tutorial on writing validation logic for a Kubewarden policy using TypeScript.
keywords: [kubewarden, kubernetes, writing policies, typescript]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, typescript, validation-logic]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/typescript/validation"/>
</head>

> [!IMPORTANT]  
> **Critical: Do not write logging information to STDOUT**
> 
> Writing to STDOUT will break your policy. Instead, use STDERR for logging or the logging facility provided by the Kubewarden SDK. The policy's output to STDOUT must only contain the validation response.

The validation logic goes in the `src/index.ts` file.

Your validation logic needs to:

- Extract the relevant information from the incoming validation request.
- Return a response based on the input and the policy settings.

The incoming request contains a JSON object with the Kubernetes resource to validate, and you can access this data through the Kubewarden SDK's helper functions.

## The `validate` function

The policy provided by the template already has a `validate` function in `src/index.ts`. You will make use of it here, adding your logic to reject Pods with denied hostnames.

This is how the function should look once complete:

```typescript
/**
 * Validates the incoming request against policy settings.
 * Accepts or rejects the request based on denied hostnames.
 */
function validate(): void {
  try {
    // NOTE 1
    // Read the validation request payload
    const validationRequest = Validation.Validation.readValidationRequest();

    // NOTE 2
    // Extract policy settings from the validation request
    const settings: PolicySettings = validationRequest.settings || {};
    
    // NOTE 3
    // Extract the Kubernetes object (Pod) from the validation request
    const resource = getKubernetesResource(validationRequest);
    if (!resource) {
      writeOutput(Validation.Validation.rejectRequest('Failed to parse Kubernetes resource.'));
      return;
    }

    // Only process Pod resources
    if (resource.kind !== 'Pod') {
      writeOutput(Validation.Validation.acceptRequest());
      return;
    }

    // NOTE 4
    // Extract hostname from the Pod spec
    const hostname = getPodHostname(resource as Pod);
    const deniedHostnames = settings.denied_hostnames || [];

    // NOTE 5
    // Validate the hostname against the deny list
    if (!hostname) {
      writeOutput(Validation.Validation.acceptRequest());
      return;
    }

    if (deniedHostnames.includes(hostname)) {
      writeOutput(
        Validation.Validation.rejectRequest(
          `Pod hostname '${hostname}' is not allowed. Denied hostnames: [${deniedHostnames.join(', ')}]`
        ),
      );
    } else {
      writeOutput(Validation.Validation.acceptRequest());
    }
  } catch (err) {
    console.error('Validation error:', err);
    writeOutput(Validation.Validation.rejectRequest(`Validation failed: ${err}`));
  }
}
```

### What each NOTE does:

- **NOTE 1**: Read the incoming validation request using `readValidationRequest()`.
- **NOTE 2**: Extract user-defined settings from the validation request (e.g., denied hostnames).
- **NOTE 3**: Parse the Kubernetes object (expected to be a Pod) from the request payload.
- **NOTE 4**: Extract the hostname field from the Pod's spec section.
- **NOTE 5**: Compare the hostname against the denied list and return an appropriate response.

## Helper functions

The policy uses several helper functions to process the validation request:

### getKubernetesResource

This function safely extracts the Kubernetes resource from the validation request:

```typescript
/**
 * Safely parses and extracts the Kubernetes resource from the validation request.
 *
 * @param {ValidationRequest} validationRequest - The validation request object.
 * @returns {KubernetesResource | undefined} The parsed Kubernetes resource if available.
 */
function getKubernetesResource(validationRequest: ValidationRequest): KubernetesResource | undefined {
  try {
    let requestObject: string | KubernetesResource | undefined = validationRequest.request?.object;
    if (typeof requestObject === 'string') {
      requestObject = JSON.parse(requestObject) as unknown as KubernetesResource;
    } else if (requestObject === undefined) {
      return undefined;
    }
    return requestObject as KubernetesResource;
  } catch (error) {
    console.error('Error parsing Kubernetes resource:', error);
    return undefined;
  }
}
```

This function handles the case where the Kubernetes object might be provided as a JSON string or as an already parsed object.

### getPodHostname

This function extracts the hostname from a Pod resource:

```typescript
/**
 * Extracts the hostname from a Pod resource.
 *
 * @param {Pod} pod - The Pod resource.
 * @returns {string | undefined} The hostname if set, otherwise undefined.
 */
function getPodHostname(pod: Pod): string | undefined {
  return pod.spec?.hostname;
}
```

This function safely extracts the hostname from the Pod's specification.

## Policy entry point

The policy uses a switch statement to handle different actions:

```typescript
const action = policyAction();
switch (action) {
  case 'validate':
    validate();
    break;
  case 'validate-settings':
    validateSettings();
    break;
  default:
    console.error('Unknown action:', action);
    writeOutput(new Validation.Validation.ValidationResponse(false, 'Unknown policy action'));
}
```

The `policyAction()` function is provided by the Javy plugin and indicates whether the policy should validate a resource or validate its settings.
