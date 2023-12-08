const fs = require('fs');
const child_process = require('child_process');

// 获取当前版本号
const currentVersion = JSON.parse(fs.readFileSync('package.json')).version;

console.log('currentVersion', currentVersion)

const gitCmd = `git add . && git commit -m "Update version to ${currentVersion}" && git tag -a v${currentVersion} -m "version ${currentVersion}" && git push --tags`;
child_process.exec(gitCmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行 git 命令时出错: ${error}`);
    return;
  }
  console.log(`成功推送至远程仓库并打上标签：${stdout}`);
});