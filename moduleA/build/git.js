const fs = require('fs');
const child_process = require('child_process');
const pkg = JSON.parse(fs.readFileSync('package.json'));
const currentVersion = `${pkg.name}@${pkg.version}`;
const gitCmd = `git add . && git commit -m "更新组件版本 ${currentVersion}" && git tag ${currentVersion} && git push --tags && npm publish`;
child_process.exec(gitCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行 git 命令时出错: ${error}`);
    return;
  }
  console.log(`成功推送至远程仓库并打上标签： ${currentVersion}`);
});