# Policy settings

Policy behaviour is not set in stone, it can be configured by providing configuration
details to the policy at runtime. The policy author has full freedom to define
the structure of the policy settings.

Kubewarden takes care of serializing the policy settings into JSON and provide
them to the policy every time it is invoked.

## Settings validation

Some policies might want to validate the settings a user provides to ensure
they are correct.

Each policy must register a waPC function called `validate_settings` that
takes care of validating the policy settings.

The `validate_settings` function receives as input a JSON representation of
the settings provided by the user. The function validates them and returns
as a response a `SettingsValidationResponse` object.

The structure of the object is the following one:

```json
{
  "valid": <boolean>,  // mandatory
  "message": <string>, // optional, ignored if accepted - recommended for rejections
}
```

If the user provided settings are `valid`, the contents of `message` are ignored.
Otherwise the contents of `message` are shown to the user.

Kubewarden's [policy-server](https://github.com/chimera-kube/policy-server)
validates all the policy settings provided by users at start time.
The policy-server exits immediately with an error if at least one of its
policies received wrong configuration parameters.
