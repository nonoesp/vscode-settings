import * as fs from 'fs';

const argv = require('yargs')
            .option('fontSize', {
                alias: 'f',
                type: 'number',
                description: 'Font size to set for the Editor, Debug Console, and Terminal.',
                default: 14
            })
            .option('settings', {
                alias: 's',
                type: 'string',
                description: 'Location of Visual Studio Code\'s settings.json.',
                default: '/Users/nono/Dropbox/0_Inbox/settings/vscode/settings.json'
            })
            .argv;

const settingsPath = argv.settings;
const fontSize = argv.fontSize;

const settingsContents = fs.readFileSync(settingsPath, `utf-8`);
const settings = JSON.parse(fs.readFileSync(settingsPath, `utf-8`));

// Backup settings.json
const yymmdd = (new Date()).toISOString().split('-').join('').split(':').join('').split('T').join('_').substring(2,15);
fs.writeFileSync(`${settingsPath.replace('settings.json', `${yymmdd}_settings.json`)}`, settingsContents);

settings['terminal.integrated.fontSize'] = fontSize;
settings['editor.fontSize'] = fontSize;
settings['debug.console.fontSize'] = fontSize;

// Update settings.json file
fs.writeFileSync(settingsPath, JSON.stringify(settings));