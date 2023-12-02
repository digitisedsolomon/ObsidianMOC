#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import clipboardy from 'clipboardy'
import { checkpath } from './checks.js'
import chalk from 'chalk';
import domainprocess from './domain.js'
import inquirer from 'inquirer';


await initialsetup().then(mainprocess)

async function initialsetup() {

    if (process.argv[2] == null || process.argv[2] == "") {
        console.log(chalk.green('welcome to the Obsidian MOC maker!\n'));
        console.log(chalk.yellow('First: Provide the location where your obsidian folders and files are stored,'));
        console.log(chalk.yellow('Run \'obsmoc vault (vault location) or just \'obsmoc vault\' or even \'obsmoc set\' \n'));
        console.log(chalk.cyan('Then: Run \'obsmoc (your domain with files)\'\n'));
        console.log(chalk.magenta('The result will be copied to your clipboard!'));
        try {
            const answers = await inquirer.prompt([{
                name: 'toset',
                type: 'confirm',
                message: chalk.green("Would you like to set the location now?")
            }]);
            if (answers.toset == true) {
                await domainprocess(process.argv[3]);
            }
        } catch (error) {
            if (error.isTtyError) {
                console.log("error with question");
            } else {
                console.log("something errored. IDK");
            }
        }
        process.exit(1);
    }

    if (process.argv[2].toLowerCase() == "set" || process.argv[2].toLowerCase() == "vault") {

        await domainprocess(process.argv[3]);

    }
}

function mainprocess() {
    function getMarkdownFiles(folderPath) {
        return new Promise((resolve, reject) => {
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    let mdFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');
                    resolve(mdFiles);
                }
            });
        });
    }
    getMarkdownFiles(getpath())
        .then(Format)
        .catch(err => console.error("An error occurred:", err));

    function Format(List) {
        const string = List
            .filter(item => !item.includes('MOC') && item.endsWith('.md'))
            .map(item => `[[${item.replace('.md', '')}]]`)
            .join(' \n ');
        copy(string)
    }
    async function copy(contents) {
        try {
            await clipboardy.write(contents);
            console.log('File content copied to clipboard.');
        } catch (error) {
            console.error('Failed to copy file content to clipboard:', error);
        }
    }
    function escapeBackslashes(path) {
        path = path.replace(/\\/g, '\\\\');
        return path
    }



    function getpath() {
        let startIndex = 2;
        let pathComponents = [];

        for (let i = startIndex; i < process.argv.length; i++) {
            pathComponents.push(process.argv[i]);
        }

        let fullPath = pathComponents.join(" ");

        console.log("The path is:", fullPath);
        let filteredpath = escapeBackslashes(fullPath);
        filteredpath = path.resolve(filteredpath); // add an if statement
        checkpath(filteredpath)
        return filteredpath;
    }
}