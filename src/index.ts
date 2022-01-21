// Sharing the dependencies of caz
// Make sure the following statement is executed before all code
// module.paths = require.main!.paths // NOT COMPATIBLE WITH LOAD TEMPLATE DEPENDENCIES (@see https://github.com/ozeebee/caz/blob/main/README.md)

import { Template } from 'caz'
// import * as pkgjson from './package.json' // don't use this import with a `src/` folder (@see https://stackoverflow.com/questions/50822310/how-to-import-package-json-in-typescript)
const pkgjson = require('../package.json')
import chalk from 'chalk'
import { paramCase } from 'change-case'

const templateDef: Template = {
  name: pkgjson.name,
  version: pkgjson.version,
  source: 'template',
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: 'Project name',
      // format: val => paramCase(val)
    },
    {
      name: 'version',
      type: 'text',
      message: 'Project version',
      initial: '0.1.0'
    },
    {
      name: 'description',
      type: 'text',
      message: 'Description',
      initial: (_, values) => `CDK project ${values.name}`
    },
    {
      name: 'cdkVersion',
      type: 'text',
      message: 'CDK version',
      initial: '2.7.0'
    },
    {
      name: 'features',
      type: 'multiselect',
      message: 'Choose the features you need',
      instructions: false,
      choices: [
        { title: 'Lambdas', value: 'lambda' },
        { title: 'Lambdas with layer', value: 'lambdaLayer' },
      ]
    },
    {
      name: 'git',
      type: 'confirm',
      message: 'Initialize Git Repo',
      initial: false
    },
    {
      name: 'install',
      type: 'confirm',
      message: 'Install dependencies',
      initial: false
    },
  ],
  filters: {
    '**/lambdas': answers => answers.features.includes('lambda') || answers.features.includes('lambdaLayer'),
    // 'lambdas/layer': answers => answers.features.includes('lambdaLayer'), !!! DOES NOT WORK (@see https://github.com/mrmlnc/fast-glob#how-to-exclude-directory-from-reading) !!!
    '**/layer': answers => answers.features.includes('lambdaLayer'),
  },
  setup: async ctx => {
    ctx.answers.pname = paramCase(ctx.answers.name)
    ctx.answers.gitignore = '.gitignore'
    const features: string[] = ctx.answers.features
    if (features.includes('lambdaLayer') && !features.includes('lambda'))
      features.push('lambda')
    ctx.config.install = ctx.answers.install ? 'npm' : false
    ctx.config.init = ctx.answers.git
  },
  complete: async ctx => {
    // console.clear()
    console.log('')
    console.log(chalk`Created a new project in {cyan ${ctx.project}} by the {blue ${ctx.template}} template.\n`)
    console.log('\nHappy coding :)\n')
  }
}

export = templateDef

