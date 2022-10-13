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
            initial: '2.45.0'
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
    setup: async (ctx) => {
        ctx.answers.pname = (0, change_case_1.paramCase)(ctx.answers.name);
        ctx.answers.gitignore = '.gitignore';
        const features = ctx.answers.features;
        if (features.includes('lambdaLayer') && !features.includes('lambda'))
            features.push('lambda');
        ctx.config.install = ctx.answers.install ? 'npm' : false;
        ctx.config.init = ctx.answers.git;
    },
    complete: async (ctx) => {
        // console.clear()
        console.log('');
        console.log((0, chalk_1.default) `Created a new project in {cyan ${ctx.project}} by the {blue ${ctx.template}} template.\n`);
        console.log('\nHappy coding :)\n');
    }
};
module.exports = templateDef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxnRUFBZ0U7QUFDaEUsaUpBQWlKOzs7O0FBR2pKLHVMQUF1TDtBQUN2TCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMxQyxrREFBeUI7QUFDekIsNkNBQXVDO0FBRXZDLE1BQU0sV0FBVyxHQUFhO0lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtJQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87SUFDeEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDO1NBQ2pDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsYUFBYTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxlQUFlLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDckQ7UUFDRDtZQUNFLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLFFBQVE7U0FDbEI7UUFDRDtZQUNFLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO2dCQUNyQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2FBQ3REO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN4RywrS0FBK0s7UUFDL0ssVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFBLHVCQUFTLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7UUFDcEMsTUFBTSxRQUFRLEdBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDL0MsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUE7SUFDbkMsQ0FBQztJQUNELFFBQVEsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDcEIsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsZUFBSyxFQUFBLGtDQUFrQyxHQUFHLENBQUMsT0FBTyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsZUFBZSxDQUFDLENBQUE7UUFDNUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7Q0FDRixDQUFBO0FBRUQsaUJBQVMsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2hhcmluZyB0aGUgZGVwZW5kZW5jaWVzIG9mIGNhelxuLy8gTWFrZSBzdXJlIHRoZSBmb2xsb3dpbmcgc3RhdGVtZW50IGlzIGV4ZWN1dGVkIGJlZm9yZSBhbGwgY29kZVxuLy8gbW9kdWxlLnBhdGhzID0gcmVxdWlyZS5tYWluIS5wYXRocyAvLyBOT1QgQ09NUEFUSUJMRSBXSVRIIExPQUQgVEVNUExBVEUgREVQRU5ERU5DSUVTIChAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vemVlYmVlL2Nhei9ibG9iL21haW4vUkVBRE1FLm1kKVxuXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJ2Nheidcbi8vIGltcG9ydCAqIGFzIHBrZ2pzb24gZnJvbSAnLi9wYWNrYWdlLmpzb24nIC8vIGRvbid0IHVzZSB0aGlzIGltcG9ydCB3aXRoIGEgYHNyYy9gIGZvbGRlciAoQHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81MDgyMjMxMC9ob3ctdG8taW1wb3J0LXBhY2thZ2UtanNvbi1pbi10eXBlc2NyaXB0KVxuY29uc3QgcGtnanNvbiA9IHJlcXVpcmUoJy4uL3BhY2thZ2UuanNvbicpXG5pbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5pbXBvcnQgeyBwYXJhbUNhc2UgfSBmcm9tICdjaGFuZ2UtY2FzZSdcblxuY29uc3QgdGVtcGxhdGVEZWY6IFRlbXBsYXRlID0ge1xuICBuYW1lOiBwa2dqc29uLm5hbWUsXG4gIHZlcnNpb246IHBrZ2pzb24udmVyc2lvbixcbiAgc291cmNlOiAndGVtcGxhdGUnLFxuICBwcm9tcHRzOiBbXG4gICAge1xuICAgICAgbmFtZTogJ25hbWUnLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ1Byb2plY3QgbmFtZScsXG4gICAgICAvLyBmb3JtYXQ6IHZhbCA9PiBwYXJhbUNhc2UodmFsKVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3ZlcnNpb24nLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ1Byb2plY3QgdmVyc2lvbicsXG4gICAgICBpbml0aWFsOiAnMC4xLjAnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZGVzY3JpcHRpb24nLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ0Rlc2NyaXB0aW9uJyxcbiAgICAgIGluaXRpYWw6IChfLCB2YWx1ZXMpID0+IGBDREsgcHJvamVjdCAke3ZhbHVlcy5uYW1lfWBcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdjZGtWZXJzaW9uJyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIG1lc3NhZ2U6ICdDREsgdmVyc2lvbicsXG4gICAgICBpbml0aWFsOiAnMi40NS4wJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2ZlYXR1cmVzJyxcbiAgICAgIHR5cGU6ICdtdWx0aXNlbGVjdCcsXG4gICAgICBtZXNzYWdlOiAnQ2hvb3NlIHRoZSBmZWF0dXJlcyB5b3UgbmVlZCcsXG4gICAgICBpbnN0cnVjdGlvbnM6IGZhbHNlLFxuICAgICAgY2hvaWNlczogW1xuICAgICAgICB7IHRpdGxlOiAnTGFtYmRhcycsIHZhbHVlOiAnbGFtYmRhJyB9LFxuICAgICAgICB7IHRpdGxlOiAnTGFtYmRhcyB3aXRoIGxheWVyJywgdmFsdWU6ICdsYW1iZGFMYXllcicgfSxcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdnaXQnLFxuICAgICAgdHlwZTogJ2NvbmZpcm0nLFxuICAgICAgbWVzc2FnZTogJ0luaXRpYWxpemUgR2l0IFJlcG8nLFxuICAgICAgaW5pdGlhbDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdpbnN0YWxsJyxcbiAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgIG1lc3NhZ2U6ICdJbnN0YWxsIGRlcGVuZGVuY2llcycsXG4gICAgICBpbml0aWFsOiBmYWxzZVxuICAgIH0sXG4gIF0sXG4gIGZpbHRlcnM6IHtcbiAgICAnKiovbGFtYmRhcyc6IGFuc3dlcnMgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhJykgfHwgYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSxcbiAgICAvLyAnbGFtYmRhcy9sYXllcic6IGFuc3dlcnMgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSwgISEhIERPRVMgTk9UIFdPUksgKEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21ybWxuYy9mYXN0LWdsb2IjaG93LXRvLWV4Y2x1ZGUtZGlyZWN0b3J5LWZyb20tcmVhZGluZykgISEhXG4gICAgJyoqL2xheWVyJzogYW5zd2VycyA9PiBhbnN3ZXJzLmZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGFMYXllcicpLFxuICB9LFxuICBzZXR1cDogYXN5bmMgY3R4ID0+IHtcbiAgICBjdHguYW5zd2Vycy5wbmFtZSA9IHBhcmFtQ2FzZShjdHguYW5zd2Vycy5uYW1lKVxuICAgIGN0eC5hbnN3ZXJzLmdpdGlnbm9yZSA9ICcuZ2l0aWdub3JlJ1xuICAgIGNvbnN0IGZlYXR1cmVzOiBzdHJpbmdbXSA9IGN0eC5hbnN3ZXJzLmZlYXR1cmVzXG4gICAgaWYgKGZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGFMYXllcicpICYmICFmZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhJykpXG4gICAgICBmZWF0dXJlcy5wdXNoKCdsYW1iZGEnKVxuICAgIGN0eC5jb25maWcuaW5zdGFsbCA9IGN0eC5hbnN3ZXJzLmluc3RhbGwgPyAnbnBtJyA6IGZhbHNlXG4gICAgY3R4LmNvbmZpZy5pbml0ID0gY3R4LmFuc3dlcnMuZ2l0XG4gIH0sXG4gIGNvbXBsZXRlOiBhc3luYyBjdHggPT4ge1xuICAgIC8vIGNvbnNvbGUuY2xlYXIoKVxuICAgIGNvbnNvbGUubG9nKCcnKVxuICAgIGNvbnNvbGUubG9nKGNoYWxrYENyZWF0ZWQgYSBuZXcgcHJvamVjdCBpbiB7Y3lhbiAke2N0eC5wcm9qZWN0fX0gYnkgdGhlIHtibHVlICR7Y3R4LnRlbXBsYXRlfX0gdGVtcGxhdGUuXFxuYClcbiAgICBjb25zb2xlLmxvZygnXFxuSGFwcHkgY29kaW5nIDopXFxuJylcbiAgfVxufVxuXG5leHBvcnQgPSB0ZW1wbGF0ZURlZlxuXG4iXX0=