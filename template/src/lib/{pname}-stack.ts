import { Stack, StackProps, CfnOutput, Duration } from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { PrefixableStack, PrefixableStackProps } from './prefixable-stack'
import { Vpc } from 'aws-cdk-lib/aws-ec2'
import * as iam from 'aws-cdk-lib/aws-iam'<% if (features.includes('lambda')) { %>
import { LayerVersion, Runtime, Code } from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'<% } %>

export interface <%= _.capitalize(_.camelCase(name)) %>StackProps extends PrefixableStackProps {
  // define your stack props here
  vpcName: string
}

export class <%= _.capitalize(_.camelCase(name)) %>Stack extends PrefixableStack {
  constructor(scope: Construct, id: string, props: <%= _.capitalize(_.camelCase(name)) %>StackProps) {
    super(scope, id, props)

    // Sample Vpc lookup
    const vpc = Vpc.fromLookup(this, this.resId('Vpc'), { vpcName: props.vpcName })

    // Sample IAM role
    const sampleRole = new iam.Role(this, this.resId('SampleRole'), {
      roleName: this.resName('sample-role'),
      description: `Sample role for the <%='$'%>{this.prefix} project`,
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    })
    // Allow role to read SSM parameters
    sampleRole.addToPolicy(new iam.PolicyStatement({
      actions: ['ssm:GetParameter*'],
      resources: ['*']
    }))

    new CfnOutput(this, this.resId('sample-role-arn'), { value: sampleRole.roleArn, exportName: this.resName('sample-role-arn') })
    <% if (features.includes('lambdaLayer')) { %>
    // Layer for lambdas
    const lambdaLayer = new LayerVersion(this, this.resId('SampleLambdaLayer'), {
      description: 'shared code for lambdas',
      code: Code.fromAsset('src/lambdas/layer'),
      compatibleRuntimes: [ Runtime.NODEJS_14_X ]
    })
    <% } %><% if (features.includes('lambda')) { %>
    const lambda = new NodejsFunction(this, this.resId('SampleLambda'), {
      functionName: this.resName('sample-lambda'),
      entry: 'src/lambdas/sample-lambda.ts',
      handler: 'handler',
      runtime: Runtime.NODEJS_14_X,<% if (features.includes('lambdaLayer')) { %>
      layers: [lambdaLayer],<% } %>
      role: sampleRole, 
      timeout: Duration.seconds(45),
      environment: {
        'MYENV_VAR': 'HelloLambda!'
      },<% if (features.includes('lambdaLayer')) { %>
      bundling: {
        // exclude modules from the bundle
        externalModules: [ 'aws-sdk', '@aws-sdk/*' ]
      }<% } %> 
    })
    <% } %>
  }
}
