const fs = require('fs');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ')

const child_process = require('child_process');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const currentVersion = `${pkg.name}@${pkg.version}`;
const npmCmd = `npm publish && npm dist-tag add ${currentVersion} snapshot`;
const npmCmd2 = `npm version prerelease --preid snapshot`

console.log(npmCmd)
console.log(npmCmd2)
// child_process.exec(npmCmd, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行 git 命令时出错: ${error}`);
//     return;
//   }
//   console.log(`成功推送至NPM仓库： ${currentVersion} -- snapshot`);
// });