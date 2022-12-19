# serverless-policy-reducer-for-aws-roles

> Fixes "EnterpriseLogAccessIamRole - Maximum policy size of 10240 bytes exceeded" error

This plugin works by modifying the Cloudformation stack before packinging.

It searches for the `EnterpriseLogAccessIamRole` resource and modifies the only policy attached to this role.

## Install

```
$ npm i policy-reducer-for-aws-enterprise-logaccess-role
```

## Usage

In your `serverless.yml` file:

```yaml
plugins:
  - policy-reducer-for-aws-enterprise-logaccess-role
```

## Explanation

By default, Serverless framework creates role like:

```json5
{
  Effect: "Allow",
  Action: ["logs:FilterLogEvents"],
  Resource: [
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-1:*",
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-2:*",
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-3:*",
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-4:*",
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-5:*",
    "arn:aws:logs:us-east-1:854451547444:log-group:/aws/lambda/your-lambda-function-6:*",
    // multiple lambda
  ],
}
```

When you reach a olicy size of 10240 bytes , deployment will fail as limit got exceeded.

This plugin will replace all lambda arn with \*:

```json5
{
  Effect: "Allow",
  Action: ["logs:FilterLogEvents"],
  Resource: ["*"],
}
```
