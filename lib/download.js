// 下载模块
const download = require('download-git-repo')

module.exports = function (target) {
    target = path.join(target || '.', './download-temp')
    return new Promise(function (resolve, reject) {
        download('https://github.com/yeshanshan/qd-cli-template.git',
            target, { clone: true }, (err) => {
                if (err) {
                    reject(err)
                } else {
                    // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
                    resolve(target)
                }
            })
    });
}

