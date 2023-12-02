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



    /*
    const windowsBasePath = "\\Users\\";
    const macBasePaths = "/Users/";

    const platform = os.platform();
    let prefix;
    let subtract;
    switch (platform) {
        case 'win32':
            prefix = windowsBasePath;
            subtract = 9;
            break;
        case 'darwin':
            prefix = macBasePaths;
            subtract = 8;
            break;
        case 'linux':
            console.log("Linux is currently Unsupported")
            process.exit(4);
        default:
            console.log('Unknown OS');
            process.exit(5);
    }


    let base = 0;
    for (let char = 'a'; char <= 'z'; char = String.fromCharCode(char.charCodeAt(0) + 1)) {
        console.log(char);
        let starting = char + ":" + prefix;
        const startsWithAny = filteredPath.toLowerCase().startsWith(starting.toLowerCase());
        if (startsWithAny) {
            base = 1;
            break;
        }
    }

    if (base = 0) {
        console.log('Invalid URL Base');
        process.exit(6);
    }
    
    let locations = ["Desktop", "Documents", "Downloads", "Music", "Pictures", "Videos", "Onedrive"]
    let s = filteredPath.substring(subtract);
    let split = s.split('\\')[1];
    if (locations.test(split)) {
        console.log("Valid Folder");
    } else {
        console.log(`The substring '${split}' failed the test.`);
        process.exit(6);
    }
    This code was going to be a fancy domain whitelist program. I have decided to be lazy.


*/

}