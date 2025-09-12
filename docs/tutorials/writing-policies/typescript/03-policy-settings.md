---
sidebar_label: Defining policy settings
sidebar_position: 030
title: Defining policy settings
description: Defining policy settings for a Kubewarden policy written in TypeScript.
keywords: [kubewarden, kubernetes, defining policy settings, TypeScript]
doc-type: [tutorial]
doc-topic: [kubewarden, writing-policies, typescript, defining-policy-settings]
doc-persona: [kubewarden-policy-developer]
---

<head>
  <link rel="canonical" href="https://docs.kubewarden.io/tutorials/writing-policies/typescript/policy-settings"/>
</head>

> [!IMPORTANT]  
> **Critical: Do not write logging information to STDOUT**
> 
> Writing to STDOUT will break your policy. Instead, use STDERR for logging or the logging facility provided by the Kubewarden SDK. The policy's output to STDOUT must only contain the validation response.

First, define the structure that holds the policy settings in `src/types.ts`.

```ts
import type { PodSpec } from 'kubernetes-types/core/v1';
import type { ObjectMeta } from 'kubernetes-types/meta/v1';

/**
 * Interface representing policy settings structure.
 */
export interface PolicySettings {
  // List of hostnames that are denied by the policy.
  denied_hostnames?: string[];
}

/**
 * Generic Kubernetes resource interface
 */
export interface KubernetesResource {
  apiVersion: string;
  kind: string;
  metadata: ObjectMeta;
  spec?: PodSpec | any;
}
```

## Building Settings instances

Kubewarden policies use two functions that handle settings:

- `validate`: Called during object validation.
- `validateSettings`: Called at policy load time.

In `src/index.ts`, the `validate` function looks like:

```ts
function validate(): void {
  try {
    const validationRequest = Validation.Validation.readValidationRequest();
    const settings: PolicySettings = validationRequest.settings || {};
    
    // Policy logic...
  } catch (err) {
    console.error('Validation error:', err);
    writeOutput(Validation.Validation.rejectRequest(`Validation failed: ${err}`));
  }
}
```

## Implementing Settings validation

```ts
function validateSettings(): void {
  try {
    const settingsJson = readInput();
    const settings: PolicySettings = JSON.parse(settingsJson);
    
    if (settings.denied_hostnames && !Array.isArray(settings.denied_hostnames)) {
      const errorResponse = new Validation.Validation.SettingsValidationResponse(
        false,
        'denied_hostnames must be an array of strings',
      );
      writeOutput(errorResponse);
      return;
    }
    
    for (const hostname of settings.denied_hostnames || []) {
      if (typeof hostname !== 'string') {
        const errorResponse = new Validation.Validation.SettingsValidationResponse(
          false,
          'All hostnames in denied_hostnames must be strings',
        );
        writeOutput(errorResponse);
        return;
      }
    }

    const response = new Validation.Validation.SettingsValidationResponse(true);
    writeOutput(response);
  } catch (err) {
    console.error('Settings validation error:', err);
    const errorResponse = new Validation.Validation.SettingsValidationResponse(
      false,
      `Settings validation failed: ${err}`,
    );
    writeOutput(errorResponse);
  }
}
```