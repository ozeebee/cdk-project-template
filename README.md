cdk-project-template
====================

An [`ozeebee/caz`](https://github.com/ozeebee/caz) (based on the original [`caz`](https://github.com/zce/caz)) template to scaffold / generate an [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) application.

Tired of copy/pasting/modifying existing CDK projects (with all the inherent risks) ?

Frustated of not being able to create a custom CDK project init template ?

Then this is for you !

This will generate a CDK **TypeScript** project with an opinionated project structure and configuration:
- separate `src/` and `dist/` directories
- pre-configured lambda/layer integration (optional)
- generate CDK outputs in `cdk-outputs.json` file

Why not use the orininal [`caz`](https://github.com/zce/caz) tool ?  
It cannnot install template dependencies; that's why we use the [`ozeebee/caz`](https://github.com/ozeebee/caz) fork.

## Requirements

- Node.js (and npm)

## Usage

```
npx ozeebee/caz ozeebee/cdk-project-template [project-name] --tpldeps
```

Then follow the instructions ;)

## Building & Publishing

1. Build the project (transpile TypeScript to JavaScript): `npm run build`
2. Commit & Push to the **master** branch (required by caz)

## Built With

[`ozeebee/caz`](https://github.com/ozeebee/caz) (a fork of [zce/caz](https://github.com/zce/caz)) - A simple yet powerful template-based Scaffolding tools
