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
            initial: '2.157.0'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQztBQUNsQyxnRUFBZ0U7QUFDaEUsaUpBQWlKOzs7O0FBR2pKLHVMQUF1TDtBQUN2TCxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMxQyxrREFBeUI7QUFDekIsNkNBQXVDO0FBRXZDLE1BQU0sV0FBVyxHQUFhO0lBQzVCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtJQUNsQixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87SUFDeEIsTUFBTSxFQUFFLFVBQVU7SUFDbEIsT0FBTyxFQUFFO1FBQ1A7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGNBQWM7WUFDdkIsZ0NBQWdDO1NBQ2pDO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixPQUFPLEVBQUUsT0FBTztTQUNqQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsYUFBYTtZQUN0QixPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxlQUFlLE1BQU0sQ0FBQyxJQUFJLEVBQUU7U0FDckQ7UUFDRDtZQUNFLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxNQUFNO1lBQ1osT0FBTyxFQUFFLGFBQWE7WUFDdEIsT0FBTyxFQUFFLFNBQVM7U0FDbkI7UUFDRDtZQUNFLElBQUksRUFBRSxVQUFVO1lBQ2hCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSw4QkFBOEI7WUFDdkMsWUFBWSxFQUFFLEtBQUs7WUFDbkIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO2dCQUNyQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFO2FBQ3REO1NBQ0Y7UUFDRDtZQUNFLElBQUksRUFBRSxLQUFLO1lBQ1gsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUscUJBQXFCO1lBQzlCLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7UUFDRDtZQUNFLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLFNBQVM7WUFDZixPQUFPLEVBQUUsc0JBQXNCO1lBQy9CLE9BQU8sRUFBRSxLQUFLO1NBQ2Y7S0FDRjtJQUNELE9BQU8sRUFBRTtRQUNQLFlBQVksRUFBRSxDQUFDLE9BQVksRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQy9HLCtLQUErSztRQUMvSyxVQUFVLEVBQUUsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztLQUN2RTtJQUNELEtBQUssRUFBRSxLQUFLLEVBQUMsR0FBRyxFQUFDLEVBQUU7UUFDakIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQThCLENBQUE7UUFFdEQscUNBQXFDO1FBRWpDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLElBQUEsdUJBQVMsRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDM0MsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsWUFBWSxDQUFBO1FBQ3BDLE1BQU0sUUFBUSxHQUFhLE9BQU8sQ0FBQyxRQUFRLENBQUE7UUFDM0MsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbEUsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6QixHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUNwRCxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0lBQy9CLENBQUM7SUFDRCxRQUFRLEVBQUUsS0FBSyxFQUFDLEdBQUcsRUFBQyxFQUFFO1FBQ3BCLGtCQUFrQjtRQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGVBQUssRUFBQSxrQ0FBa0MsR0FBRyxDQUFDLE9BQU8sa0JBQWtCLEdBQUcsQ0FBQyxRQUFRLGVBQWUsQ0FBQyxDQUFBO1FBQzVHLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0NBQ0YsQ0FBQTtBQUVELGlCQUFTLFdBQVcsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNoYXJpbmcgdGhlIGRlcGVuZGVuY2llcyBvZiBjYXpcbi8vIE1ha2Ugc3VyZSB0aGUgZm9sbG93aW5nIHN0YXRlbWVudCBpcyBleGVjdXRlZCBiZWZvcmUgYWxsIGNvZGVcbi8vIG1vZHVsZS5wYXRocyA9IHJlcXVpcmUubWFpbiEucGF0aHMgLy8gTk9UIENPTVBBVElCTEUgV0lUSCBMT0FEIFRFTVBMQVRFIERFUEVOREVOQ0lFUyAoQHNlZSBodHRwczovL2dpdGh1Yi5jb20vb3plZWJlZS9jYXovYmxvYi9tYWluL1JFQURNRS5tZClcblxuaW1wb3J0IHsgVGVtcGxhdGUgfSBmcm9tICdjYXonXG4vLyBpbXBvcnQgKiBhcyBwa2dqc29uIGZyb20gJy4vcGFja2FnZS5qc29uJyAvLyBkb24ndCB1c2UgdGhpcyBpbXBvcnQgd2l0aCBhIGBzcmMvYCBmb2xkZXIgKEBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTA4MjIzMTAvaG93LXRvLWltcG9ydC1wYWNrYWdlLWpzb24taW4tdHlwZXNjcmlwdClcbmNvbnN0IHBrZ2pzb24gPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKVxuaW1wb3J0IGNoYWxrIGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgcGFyYW1DYXNlIH0gZnJvbSAnY2hhbmdlLWNhc2UnXG5cbmNvbnN0IHRlbXBsYXRlRGVmOiBUZW1wbGF0ZSA9IHtcbiAgbmFtZTogcGtnanNvbi5uYW1lLFxuICB2ZXJzaW9uOiBwa2dqc29uLnZlcnNpb24sXG4gIHNvdXJjZTogJ3RlbXBsYXRlJyxcbiAgcHJvbXB0czogW1xuICAgIHtcbiAgICAgIG5hbWU6ICduYW1lJyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIG1lc3NhZ2U6ICdQcm9qZWN0IG5hbWUnLFxuICAgICAgLy8gZm9ybWF0OiB2YWwgPT4gcGFyYW1DYXNlKHZhbClcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICd2ZXJzaW9uJyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIG1lc3NhZ2U6ICdQcm9qZWN0IHZlcnNpb24nLFxuICAgICAgaW5pdGlhbDogJzAuMS4wJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgIG1lc3NhZ2U6ICdEZXNjcmlwdGlvbicsXG4gICAgICBpbml0aWFsOiAoXywgdmFsdWVzKSA9PiBgQ0RLIHByb2plY3QgJHt2YWx1ZXMubmFtZX1gXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnY2RrVmVyc2lvbicsXG4gICAgICB0eXBlOiAndGV4dCcsXG4gICAgICBtZXNzYWdlOiAnQ0RLIHZlcnNpb24nLFxuICAgICAgaW5pdGlhbDogJzIuMTU3LjAnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnZmVhdHVyZXMnLFxuICAgICAgdHlwZTogJ211bHRpc2VsZWN0JyxcbiAgICAgIG1lc3NhZ2U6ICdDaG9vc2UgdGhlIGZlYXR1cmVzIHlvdSBuZWVkJyxcbiAgICAgIGluc3RydWN0aW9uczogZmFsc2UsXG4gICAgICBjaG9pY2VzOiBbXG4gICAgICAgIHsgdGl0bGU6ICdMYW1iZGFzJywgdmFsdWU6ICdsYW1iZGEnIH0sXG4gICAgICAgIHsgdGl0bGU6ICdMYW1iZGFzIHdpdGggbGF5ZXInLCB2YWx1ZTogJ2xhbWJkYUxheWVyJyB9LFxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2dpdCcsXG4gICAgICB0eXBlOiAnY29uZmlybScsXG4gICAgICBtZXNzYWdlOiAnSW5pdGlhbGl6ZSBHaXQgUmVwbycsXG4gICAgICBpbml0aWFsOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ2luc3RhbGwnLFxuICAgICAgdHlwZTogJ2NvbmZpcm0nLFxuICAgICAgbWVzc2FnZTogJ0luc3RhbGwgZGVwZW5kZW5jaWVzJyxcbiAgICAgIGluaXRpYWw6IGZhbHNlXG4gICAgfSxcbiAgXSxcbiAgZmlsdGVyczoge1xuICAgICcqKi9sYW1iZGFzJzogKGFuc3dlcnM6IGFueSkgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhJykgfHwgYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSxcbiAgICAvLyAnbGFtYmRhcy9sYXllcic6IGFuc3dlcnMgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSwgISEhIERPRVMgTk9UIFdPUksgKEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21ybWxuYy9mYXN0LWdsb2IjaG93LXRvLWV4Y2x1ZGUtZGlyZWN0b3J5LWZyb20tcmVhZGluZykgISEhXG4gICAgJyoqL2xheWVyJzogKGFuc3dlcnM6IGFueSkgPT4gYW5zd2Vycy5mZWF0dXJlcy5pbmNsdWRlcygnbGFtYmRhTGF5ZXInKSxcbiAgfSxcbiAgc2V0dXA6IGFzeW5jIGN0eCA9PiB7XG4gICAgY29uc3QgYW5zd2VycyA9IGN0eC5hbnN3ZXJzIGFzIFJlY29yZDxzdHJpbmcsIGFueT5cblxuLy8gY29uc29sZS5sb2coJyoqIGFuc3dlcnMnLCBhbnN3ZXJzKVxuXG4gICAgY3R4LmFuc3dlcnMucG5hbWUgPSBwYXJhbUNhc2UoYW5zd2Vycy5uYW1lKVxuICAgIGN0eC5hbnN3ZXJzLmdpdGlnbm9yZSA9ICcuZ2l0aWdub3JlJ1xuICAgIGNvbnN0IGZlYXR1cmVzOiBzdHJpbmdbXSA9IGFuc3dlcnMuZmVhdHVyZXNcbiAgICBpZiAoZmVhdHVyZXMuaW5jbHVkZXMoJ2xhbWJkYUxheWVyJykgJiYgIWZlYXR1cmVzLmluY2x1ZGVzKCdsYW1iZGEnKSlcbiAgICAgIGZlYXR1cmVzLnB1c2goJ2xhbWJkYScpXG4gICAgY3R4LmNvbmZpZy5pbnN0YWxsID0gYW5zd2Vycy5pbnN0YWxsID8gJ25wbScgOiBmYWxzZVxuICAgIGN0eC5jb25maWcuaW5pdCA9IGFuc3dlcnMuZ2l0XG4gIH0sXG4gIGNvbXBsZXRlOiBhc3luYyBjdHggPT4ge1xuICAgIC8vIGNvbnNvbGUuY2xlYXIoKVxuICAgIGNvbnNvbGUubG9nKCcnKVxuICAgIGNvbnNvbGUubG9nKGNoYWxrYENyZWF0ZWQgYSBuZXcgcHJvamVjdCBpbiB7Y3lhbiAke2N0eC5wcm9qZWN0fX0gYnkgdGhlIHtibHVlICR7Y3R4LnRlbXBsYXRlfX0gdGVtcGxhdGUuXFxuYClcbiAgICBjb25zb2xlLmxvZygnXFxuSGFwcHkgY29kaW5nIDopXFxuJylcbiAgfVxufVxuXG5leHBvcnQgPSB0ZW1wbGF0ZURlZlxuXG4iXX0=