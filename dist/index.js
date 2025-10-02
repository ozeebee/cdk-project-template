"use strict";
// Sharing the dependencies of caz
// Make sure the following statement is executed before all code
// module.paths = require.main!.paths // NOT COMPATIBLE WITH LOAD TEMPLATE DEPENDENCIES (@see https://github.com/ozeebee/caz/blob/main/README.md)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// import * as pkgjson from './package.json' // don't use this import with a `src/` folder (@see https://stackoverflow.com/questions/50822310/how-to-import-package-json-in-typescript)
const pkgjson = require('../package.json');
const chalk_1 = __importDefault(require("chalk"));
const change_case_1 = require("change-case");
const templateDef = {
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
            initial: '2.1029.4'
        },
        {
            name: 'cdkLibVersion',
            type: 'text',
            message: 'CDK Library version',
            initial: '2.219.0'
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
        '**/lambdas': (answers) => answers.features.includes('lambda') || answers.features.includes('lambdaLayer'),
        // 'lambdas/layer': answers => answers.features.includes('lambdaLayer'), !!! DOES NOT WORK (@see https://github.com/mrmlnc/fast-glob#how-to-exclude-directory-from-reading) !!!
        '**/layer': (answers) => answers.features.includes('lambdaLayer'),
    },
    setup: async (ctx) => {
        const answers = ctx.answers;
        // console.log('** answers', answers)
        ctx.answers.pname = (0, change_case_1.paramCase)(answers.name);
        ctx.answers.gitignore = '.gitignore';
        const features = answers.features;
        if (features.includes('lambdaLayer') && !features.includes('lambda'))
            features.push('lambda');
        ctx.config.install = answers.install ? 'npm' : false;
        ctx.config.init = answers.git;
    },
    complete: async (ctx) => {
        // console.clear()
        console.log('');
        console.log((0, chalk_1.default) `Created a new project in {cyan ${ctx.project}} by the {blue ${ctx.template}} template.\n`);
        console.log('\nHappy coding :)\n');
    }
};
module.exports = templateDef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxnRUFBZ0U7QUFDaEUsaUpBQWlKOzs7O0FBR2pKLHVMQUF1TDtBQUN2TCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMxQyxrREFBeUI7QUFDekIsNkNBQXVDO0FBRXZDLE1BQU0sV0FBVyxHQUFhO0lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtJQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87SUFDeEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDO1NBQ2pDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsYUFBYTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxlQUFlLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDckQ7UUFDRDtZQUNFLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLFVBQVU7U0FDcEI7UUFDRDtZQUNFLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLHFCQUFxQjtZQUM5QixPQUFPLEVBQUUsU0FBUztTQUNuQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsSUFBSSxFQUFFLGFBQWE7WUFDbkIsT0FBTyxFQUFFLDhCQUE4QjtZQUN2QyxZQUFZLEVBQUUsS0FBSztZQUNuQixPQUFPLEVBQUU7Z0JBQ1AsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7Z0JBQ3JDLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUU7YUFDdEQ7U0FDRjtRQUNEO1lBQ0UsSUFBSSxFQUFFLEtBQUs7WUFDWCxJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxxQkFBcUI7WUFDOUIsT0FBTyxFQUFFLEtBQUs7U0FDZjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztZQUNmLE9BQU8sRUFBRSxzQkFBc0I7WUFDL0IsT0FBTyxFQUFFLEtBQUs7U0FDZjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsWUFBWSxFQUFFLENBQUMsT0FBWSxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7UUFDL0csK0tBQStLO1FBQy9LLFVBQVUsRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0tBQ3ZFO0lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUNqQixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBOEIsQ0FBQTtRQUV0RCxxQ0FBcUM7UUFFakMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBQSx1QkFBUyxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7UUFDcEMsTUFBTSxRQUFRLEdBQWEsT0FBTyxDQUFDLFFBQVEsQ0FBQTtRQUMzQyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztZQUNsRSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7SUFDL0IsQ0FBQztJQUNELFFBQVEsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDcEIsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsZUFBSyxFQUFBLGtDQUFrQyxHQUFHLENBQUMsT0FBTyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsZUFBZSxDQUFDLENBQUE7UUFDNUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7Q0FDRixDQUFBO0FBRUQsaUJBQVMsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2hhcmluZyB0aGUgZGVwZW5kZW5jaWVzIG9mIGNhelxuLy8gTWFrZSBzdXJlIHRoZSBmb2xsb3dpbmcgc3RhdGVtZW50IGlzIGV4ZWN1dGVkIGJlZm9yZSBhbGwgY29kZVxuLy8gbW9kdWxlLnBhdGhzID0gcmVxdWlyZS5tYWluIS5wYXRocyAvLyBOT1QgQ09NUEFUSUJMRSBXSVRIIExPQUQgVEVNUExBVEUgREVQRU5ERU5DSUVTIChAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vemVlYmVlL2Nhei9ibG9iL21haW4vUkVBRE1FLm1kKVxuXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ2Nheidcbi8vIGltcG9ydCAqIGFzIHBrZ2pzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nIC8vIGRvbid0IHVzZSB0aGlzIGltcG9ydCB3aXRoIGEgYHNyYy9gIGZvbGRlciAoQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MDgyMjMxMC9ob3ctdG8taW1wb3J0LXBhY2thZ2UtanNvbi1pbi10eXBlc2NyaXB0KVxuY29uc3QgcGtnanNvbiA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBwYXJhbUNhc2UgfSBmcm9tICdjaGFuZ2UtY2FzZSdcblxuY29uc3QgdGVtcGxhdGVEZWY6IFRlbXBsYXRlID0ge1xuICBuYW1lOiBwa2dqc29uLm5hbWUsXG4gIHZlcnNpb246IHBrZ2pzb24udmVyc2lvbixcbiAgc291cmNlOiAndGVtcGxhdGUnLFxuICBwcm9tcHRzOiBbXG4gICAge1xuICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ1Byb2plY3QgbmFtZScsXG4gICAgICAvLyBmb3JtYXQ6IHZhbCA9PiBwYXJhbUNhc2UodmFsKVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ZlcnNpb24nLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ1Byb2plY3QgdmVyc2lvbicsXG4gICAgICBpbml0aWFsOiAnMC4xLjAnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ0Rlc2NyaXB0aW9uJyxcbiAgICAgIGluaXRpYWw6IChfLCB2YWx1ZXMpID0+IGBDREsgcHJvamVjdCAke3ZhbHVlcy5uYW1lfWBcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdjZGtWZXJzaW9uJyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIG1lc3NhZ2U6ICdDREsgdmVyc2lvbicsXG4gICAgICBpbml0aWFsOiAnMi4xMDI5LjQnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY2RrTGliVmVyc2lvbicsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBtZXNzYWdlOiAnQ0RLIExpYnJhcnkgdmVyc2lvbicsXG4gICAgICBpbml0aWFsOiAnMi4yMTkuMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdmZWF0dXJlcycsXG4gICAgICB0eXBlOiAnbXVsdGlzZWxlY3QnLFxuICAgICAgbWVzc2FnZTogJ0Nob29zZSB0aGUgZmVhdHVyZXMgeW91IG5lZWQnLFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBmYWxzZSxcbiAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyB0aXRsZTogJ0xhbWJkYXMnLCB2YWx1ZTogJ2xhbWJkYScgfSxcbiAgICAgICAgeyB0aXRsZTogJ0xhbWJkYXMgd2l0aCBsYXllcicsIHZhbHVlOiAnbGFtYmRhTGF5ZXInIH0sXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZ2l0JyxcbiAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgIG1lc3NhZ2U6ICdJbml0aWFsaXplIEdpdCBSZXBvJyxcbiAgICAgIGluaXRpYWw6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnaW5zdGFsbCcsXG4gICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICBtZXNzYWdlOiAnSW5zdGFsbCBkZXBlbmRlbmNpZXMnLFxuICAgICAgaW5pdGlhbDogZmFsc2VcbiAgICB9LFxuICBdLFxuICBmaWx0ZXJzOiB7XG4gICAgJyoqL2xhbWJkYXMnOiAoYW5zd2VyczogYW55KSA9PiBhbnN3ZXJzLmZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGEnKSB8fCBhbnN3ZXJzLmZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGFMYXllcicpLFxuICAgIC8vICdsYW1iZGFzL2xheWVyJzogYW5zd2VycyA9PiBhbnN3ZXJzLmZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGFMYXllcicpLCAhISEgRE9FUyBOT1QgV09SSyAoQHNlZSBodHRwczovL2dpdGh1Yi5jb20vbXJtbG5jL2Zhc3QtZ2xvYiNob3ctdG8tZXhjbHVkZS1kaXJlY3RvcnktZnJvbS1yZWFkaW5nKSAhISFcbiAgICAnKiovbGF5ZXInOiAoYW5zd2VyczogYW55KSA9PiBhbnN3ZXJzLmZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGFMYXllcicpLFxuICB9LFxuICBzZXR1cDogYXN5bmMgY3R4ID0+IHtcbiAgICBjb25zdCBhbnN3ZXJzID0gY3R4LmFuc3dlcnMgYXMgUmVjb3JkPHN0cmluZywgYW55PlxuXG4vLyBjb25zb2xlLmxvZygnKiogYW5zd2VycycsIGFuc3dlcnMpXG5cbiAgICBjdHguYW5zd2Vycy5wbmFtZSA9IHBhcmFtQ2FzZShhbnN3ZXJzLm5hbWUpXG4gICAgY3R4LmFuc3dlcnMuZ2l0aWdub3JlID0gJy5naXRpZ25vcmUnXG4gICAgY29uc3QgZmVhdHVyZXM6IHN0cmluZ1tdID0gYW5zd2Vycy5mZWF0dXJlc1xuICAgIGlmIChmZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSAmJiAhZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYScpKVxuICAgICAgZmVhdHVyZXMucHVzaCgnbGFtYmRhJylcbiAgICBjdHguY29uZmlnLmluc3RhbGwgPSBhbnN3ZXJzLmluc3RhbGwgPyAnbnBtJyA6IGZhbHNlXG4gICAgY3R4LmNvbmZpZy5pbml0ID0gYW5zd2Vycy5naXRcbiAgfSxcbiAgY29tcGxldGU6IGFzeW5jIGN0eCA9PiB7XG4gICAgLy8gY29uc29sZS5jbGVhcigpXG4gICAgY29uc29sZS5sb2coJycpXG4gICAgY29uc29sZS5sb2coY2hhbGtgQ3JlYXRlZCBhIG5ldyBwcm9qZWN0IGluIHtjeWFuICR7Y3R4LnByb2plY3R9fSBieSB0aGUge2JsdWUgJHtjdHgudGVtcGxhdGV9fSB0ZW1wbGF0ZS5cXG5gKVxuICAgIGNvbnNvbGUubG9nKCdcXG5IYXBweSBjb2RpbmcgOilcXG4nKVxuICB9XG59XG5cbmV4cG9ydCA9IHRlbXBsYXRlRGVmXG5cbiJdfQ==