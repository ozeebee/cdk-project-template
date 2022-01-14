#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { <%= _.capitalize(_.camelCase(name)) %>Stack } from '../lib/<%= pname %>-stack'

const env = {
  account: process.env.CDK_DEPLOY_ACCOUNT || process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEPLOY_REGION || process.env.CDK_DEFAULT_REGION
}

const prefix = '<%= pname %>'

const app = new cdk.App()
new <%= _.capitalize(_.camelCase(name)) %>Stack(app, `<%='$'%>{prefix}-cf`, { 
  env, prefix,
  vpcName: 'SOME-VPC'
})