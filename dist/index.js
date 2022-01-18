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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxnRUFBZ0U7QUFDaEUsaUpBQWlKOzs7O0FBR2pKLHVMQUF1TDtBQUN2TCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMxQyxrREFBeUI7QUFDekIsNkNBQXVDO0FBRXZDLE1BQU0sV0FBVyxHQUFhO0lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtJQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87SUFDeEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDO1NBQ2pDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsYUFBYTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxlQUFlLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDckQ7UUFDRDtZQUNFLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRDtZQUNFLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO2dCQUNyQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2FBQ3REO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztRQUN4RywrS0FBK0s7UUFDL0ssVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO0tBQ2hFO0lBQ0QsS0FBSyxFQUFFLEtBQUssRUFBQyxHQUFHLEVBQUMsRUFBRTtRQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxJQUFBLHVCQUFTLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMvQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxZQUFZLENBQUE7UUFDcEMsTUFBTSxRQUFRLEdBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDL0MsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUE7SUFDbkMsQ0FBQztJQUNELFFBQVEsRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDcEIsa0JBQWtCO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUEsZUFBSyxFQUFBLGtDQUFrQyxHQUFHLENBQUMsT0FBTyxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsZUFBZSxDQUFDLENBQUE7UUFDNUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0lBQ3BDLENBQUM7Q0FDRixDQUFBO0FBRUQsaUJBQVMsV0FBVyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2hhcmluZyB0aGUgZGVwZW5kZW5jaWVzIG9mIGNhelxuLy8gTWFrZSBzdXJlIHRoZSBmb2xsb3dpbmcgc3RhdGVtZW50IGlzIGV4ZWN1dGVkIGJlZm9yZSBhbGwgY29kZVxuLy8gbW9kdWxlLnBhdGhzID0gcmVxdWlyZS5tYWluIS5wYXRocyAvLyBOT1QgQ09NUEFUSUJMRSBXSVRIIExPQUQgVEVNUExBVEUgREVQRU5ERU5DSUVTIChAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9vemVlYmVlL2Nhei9ibG9iL21haW4vUkVBRE1FLm1kKVxuXG5pbXBvcnQgeyBUZW1wbGF0ZSB9IGZyb20gJy4vY2F6J1xuLy8gaW1wb3J0ICogYXMgcGtnanNvbiBmcm9tICcuL3BhY2thZ2UuanNvbicgLy8gZG9uJ3QgdXNlIHRoaXMgaW1wb3J0IHdpdGggYSBgc3JjL2AgZm9sZGVyIChAc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzUwODIyMzEwL2hvdy10by1pbXBvcnQtcGFja2FnZS1qc29uLWluLXR5cGVzY3JpcHQpXG5jb25zdCBwa2dqc29uID0gcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJylcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcbmltcG9ydCB7IHBhcmFtQ2FzZSB9IGZyb20gJ2NoYW5nZS1jYXNlJ1xuXG5jb25zdCB0ZW1wbGF0ZURlZjogVGVtcGxhdGUgPSB7XG4gIG5hbWU6IHBrZ2pzb24ubmFtZSxcbiAgdmVyc2lvbjogcGtnanNvbi52ZXJzaW9uLFxuICBzb3VyY2U6ICd0ZW1wbGF0ZScsXG4gIHByb21wdHM6IFtcbiAgICB7XG4gICAgICBuYW1lOiAnbmFtZScsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBtZXNzYWdlOiAnUHJvamVjdCBuYW1lJyxcbiAgICAgIC8vIGZvcm1hdDogdmFsID0+IHBhcmFtQ2FzZSh2YWwpXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAndmVyc2lvbicsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBtZXNzYWdlOiAnUHJvamVjdCB2ZXJzaW9uJyxcbiAgICAgIGluaXRpYWw6ICcwLjEuMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBtZXNzYWdlOiAnRGVzY3JpcHRpb24nLFxuICAgICAgaW5pdGlhbDogKF8sIHZhbHVlcykgPT4gYENESyBwcm9qZWN0ICR7dmFsdWVzLm5hbWV9YFxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2Nka1ZlcnNpb24nLFxuICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgbWVzc2FnZTogJ0NESyB2ZXJzaW9uJyxcbiAgICAgIGluaXRpYWw6ICcyLjcuMCdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdmZWF0dXJlcycsXG4gICAgICB0eXBlOiAnbXVsdGlzZWxlY3QnLFxuICAgICAgbWVzc2FnZTogJ0Nob29zZSB0aGUgZmVhdHVyZXMgeW91IG5lZWQnLFxuICAgICAgaW5zdHJ1Y3Rpb25zOiBmYWxzZSxcbiAgICAgIGNob2ljZXM6IFtcbiAgICAgICAgeyB0aXRsZTogJ0xhbWJkYXMnLCB2YWx1ZTogJ2xhbWJkYScgfSxcbiAgICAgICAgeyB0aXRsZTogJ0xhbWJkYXMgd2l0aCBsYXllcicsIHZhbHVlOiAnbGFtYmRhTGF5ZXInIH0sXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZ2l0JyxcbiAgICAgIHR5cGU6ICdjb25maXJtJyxcbiAgICAgIG1lc3NhZ2U6ICdJbml0aWFsaXplIEdpdCBSZXBvJyxcbiAgICAgIGluaXRpYWw6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnaW5zdGFsbCcsXG4gICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICBtZXNzYWdlOiAnSW5zdGFsbCBkZXBlbmRlbmNpZXMnLFxuICAgICAgaW5pdGlhbDogZmFsc2VcbiAgICB9LFxuICBdLFxuICBmaWx0ZXJzOiB7XG4gICAgJyoqL2xhbWJkYXMnOiBhbnN3ZXJzID0+IGFuc3dlcnMuZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYScpIHx8IGFuc3dlcnMuZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYUxheWVyJyksXG4gICAgLy8gJ2xhbWJkYXMvbGF5ZXInOiBhbnN3ZXJzID0+IGFuc3dlcnMuZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYUxheWVyJyksICEhISBET0VTIE5PVCBXT1JLIChAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tcm1sbmMvZmFzdC1nbG9iI2hvdy10by1leGNsdWRlLWRpcmVjdG9yeS1mcm9tLXJlYWRpbmcpICEhIVxuICAgICcqKi9sYXllcic6IGFuc3dlcnMgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSxcbiAgfSxcbiAgc2V0dXA6IGFzeW5jIGN0eCA9PiB7XG4gICAgY3R4LmFuc3dlcnMucG5hbWUgPSBwYXJhbUNhc2UoY3R4LmFuc3dlcnMubmFtZSlcbiAgICBjdHguYW5zd2Vycy5naXRpZ25vcmUgPSAnLmdpdGlnbm9yZSdcbiAgICBjb25zdCBmZWF0dXJlczogc3RyaW5nW10gPSBjdHguYW5zd2Vycy5mZWF0dXJlc1xuICAgIGlmIChmZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSAmJiAhZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYScpKVxuICAgICAgZmVhdHVyZXMucHVzaCgnbGFtYmRhJylcbiAgICBjdHguY29uZmlnLmluc3RhbGwgPSBjdHguYW5zd2Vycy5pbnN0YWxsID8gJ25wbScgOiBmYWxzZVxuICAgIGN0eC5jb25maWcuaW5pdCA9IGN0eC5hbnN3ZXJzLmdpdFxuICB9LFxuICBjb21wbGV0ZTogYXN5bmMgY3R4ID0+IHtcbiAgICAvLyBjb25zb2xlLmNsZWFyKClcbiAgICBjb25zb2xlLmxvZygnJylcbiAgICBjb25zb2xlLmxvZyhjaGFsa2BDcmVhdGVkIGEgbmV3IHByb2plY3QgaW4ge2N5YW4gJHtjdHgucHJvamVjdH19IGJ5IHRoZSB7Ymx1ZSAke2N0eC50ZW1wbGF0ZX19IHRlbXBsYXRlLlxcbmApXG4gICAgY29uc29sZS5sb2coJ1xcbkhhcHB5IGNvZGluZyA6KVxcbicpXG4gIH1cbn1cblxuZXhwb3J0ID0gdGVtcGxhdGVEZWZcblxuIl19