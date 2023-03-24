#!/usr/bin/env node

const { execSync } = require('child_process')

const runCommand = command => {
    try {
     execSync(`${command}`, {stdio: 'inherit'})
    } catch (error) {
        console.error(`Failed to execute ${command}`)
        return false;
    }

    return true;

}

const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 https://github.com/likeprix/create-prix ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm i`;


console.log(`Starting the project with name ${repoName}`)

const checkedOut = runCommand(gitCheckoutCommand)
if(!checkedOut) process.exit(-1);
console.log(`Installing dependencies for ${repoName}`)

const installedDeps = runCommand(installDepsCommand);
if(!installedDeps) process.exit(-1);
console.log(`Congratulations! You can start editing your Prix project. Use the following commands to start.`);

console.log(`cd ${repoName} && npm run dev`)
