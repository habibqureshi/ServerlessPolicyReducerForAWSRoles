"use strict";
const util = require("util");
class PolicyReducerForEnterpriseLogAccessIamRole {
  constructor(serverless) {
    this.serverless = serverless;
    this.hooks = {
      "before:package:finalize": () => this.beforePackageFinalize(),
    };
  }
  beforePackageFinalize() {
    /**
     * by default serverless add all function arn one by one which causes
     * maximum policy size of 10240 bytes exceeded error below line will convert all lambda function arn
     * to '*' which will cover all lambda and you will not get bytes exceeded error
     * */
    this.serverless.service.provider.compiledCloudFormationTemplate.Resources.EnterpriseLogAccessIamRole.Properties.Policies[0].PolicyDocument.Statement[0].Resource =
      ["*"];
  }
}

module.exports = PolicyReducerForEnterpriseLogAccessIamRole;
