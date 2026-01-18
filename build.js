// build.js
const fs = require('fs');
const path = require('path');

// 定义文件夹路径
const pagesDir = path.join(__dirname, 'pages');
const jsonPath = path.join(__dirname, 'articleList.json');

// 读取 pages 目录
fs.readdir(pagesDir, (err, files) => {
  if (err) {
    console.error('读取目录失败:', err);
    return;
  }

  // 过滤掉非 .html 文件
  const htmlFiles = files.filter(file => path.extname(file) === '.html');

  // 构建文章列表数据
  const articleList = htmlFiles.map(file => {
    const filePath = path.join(pagesDir, file);
    const stats = fs.statSync(filePath);

    // 获取文件名（去掉后缀）
    const title = path.basename(file, '.html');

    // 获取最后修改时间
    const mtime = stats.mtime;

    return {
      title: title,
      filename: file,
      // 将时间对象转为字符串，例如: "2023/10/27 14:30:00"
      time: mtime.toLocaleString('zh-CN', { hour12: false })
    };
  });

  // 按时间倒序排列（最新的文章在最前面）
  articleList.sort((a, b) => new Date(b.time) - new Date(a.time));

  // 写入 JSON 文件
  fs.writeFile(jsonPath, JSON.stringify(articleList, null, 2), (err) => {
    if (err) throw err;
    console.log('articleList.json 生成成功！');
    console.log(`共生成 ${articleList.length} 篇文章列表。`);
  });
});
