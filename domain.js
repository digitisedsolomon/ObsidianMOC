
import chalk from 'chalk';
import inquirer from 'inquirer';
import fs from 'fs';


 async function setdomain(location) {
    if (location == null || location == undefined) {
        try {
            const answers = await inquirer.prompt([{
                name: 'newdomain',
                message: 'what is your obsidian vault\'s location? (where the documents are stored)'
            }]);
            return answers.newdomain;
            // Continue your logic here after getting the response
        } catch (error) {
            if (error.isTtyError) {
                console.log("error with question");
            } else {
                console.log("something errored. IDK");
            }
        }
    }
    else {
        return location;
    }
}

async function enterdomain(domain) {
    const newcontent = 'vaultDomain="' + domain + '"'
    const envFilePath = '.env';

    try {
        fs.writeFileSync(envFilePath, newcontent);
        console.log(chalk.green("Location saved!"));
    } catch (err) {
        console.error('Error:', err);
    }

}

export default async function domainprocess() {
    const location = await setdomain(process.argv[3]);
    await enterdomain(location);
    process.exit(7);
}