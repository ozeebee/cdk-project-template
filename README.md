cdk-project-template
====================

A [`caz`](https://github.com/zce/caz) template to scaffold / generate an [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/home.html) application.

Tired of copy/pasting/modifying existing CDK projects (with all the inherent risks) ?

Frustated of not being able to create a custom CDK project init template ?

Then this is for you !

This will generate a CDK **TypeScript** project with an opinionated project structure and configuration:
- separate `src/` and `dist/` directories
- pre-configured lambda/layer integration (optional)
- generate CDK outputs in `cdk-outputs.json` file

## Requirements

- Node.js (and npm)

## Usage

```
npx caz ozeebee/cdk-project-template [project-name]
```

Then follow the instructions ;)

## Built With

[zce/caz](https://github.com/zce/caz) - A simple yet powerful template-based Scaffolding tools
