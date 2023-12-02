//import os from 'os';
import 'dotenv/config';
import chalk from 'chalk';
import inquirer from 'inquirer';


export function checkpath(filteredpath) {
    console.log(filteredpath);
    let substrings = ["Windows", "Program Files", "appdata", "pictures"];
    checkwhitelist(filteredpath)
    const characterCheck = /^[a-zA-Z0-9_\/.\-\s:\\]+$/;


    if (!characterCheck.test(filteredpath)) {
        console.log(`Unsafe String Detected!`);
        process.exit(2);
    }
    substrings.forEach(substring => {
        if (filteredpath.includes(substring)) {
            console.log(`Unsafe String Detected`);
            process.exit(3);
        }

    });
    console.log("path checked");


}

function checkwhitelist(filteredPath) {
    if (filteredPath.startsWith(process.env.vaultDomain)) {
        console.log("Path Checked");
    }
    else{
        console.log(chalk.red("Incorrect location to obsidian folder"))
        console.log(chalk.green("to set your Obsidian folder domain, run obsmoc vault"))
        process.exit(7)
    }
}