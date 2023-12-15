const fs = require('fs');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ')
const child_process = require('child_process');

// 更新版本号
child_process.exec(`npm version prerelease --preid ${args}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行 git 命令时出错: ${error}`);
    return;
  }
  const pkg = JSON.parse(fs.readFileSync('package.json'));
  const currentVersion = `${pkg.name}@${pkg.version}`;

  // 推送npm仓库
  const npmCmd = `npm publish && npm dist-tag add ${currentVersion} ${args || 'snapshot'}`;
  child_process.exec(npmCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行 git 命令时出错: ${error}`);
      return;
    }
    console.log(`成功推送至NPM仓库： ${currentVersion}`);
  });

  // 推送git仓库并打上tag标签
  const gitCmd = `git add . && git commit -m "更新组件版本 ${currentVersion}" && git tag ${currentVersion} && git push --tags`;
  child_process.exec(gitCmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`执行 git 命令时出错: ${error}`);
      return;
    }
    console.log(`成功推送至远程仓库并打上标签： ${currentVersion}`);
  });
});