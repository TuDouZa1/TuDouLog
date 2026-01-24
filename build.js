// build.js
const fs = require("fs");
const path = require("path");

console.log("开始构建文章列表...");

// 定义文件夹路径
const pagesDir = path.join(__dirname, "pages");
const jsonPath = path.join(__dirname, "articleList.json");

// 检查 pages 目录是否存在
if (!fs.existsSync(pagesDir)) {
  console.error("错误：pages 目录不存在，请先创建该目录");
  process.exit(1);
}

// 读取 pages 目录
fs.readdir(pagesDir, (err, files) => {
  if (err) {
    console.error("读取目录失败:", err);
    process.exit(1);
    return;
  }

  // 过滤掉非 .html 文件
  const htmlFiles = files.filter((file) => {
    const ext = path.extname(file);
    return ext === ".html";
  });

  console.log(`找到 ${htmlFiles.length} 个HTML文件`);

  // 构建文章列表数据
  const articleList = htmlFiles
    .map((file) => {
      const filePath = path.join(pagesDir, file);
      let stats;
      try {
        stats = fs.statSync(filePath);
      } catch (statErr) {
        console.error(`获取文件状态失败 ${file}:`, statErr);
        return null; // 返回null，后续过滤掉
      }

      // 获取文件名（去掉后缀）
      const title = path.basename(file, ".html");

      // 获取最后修改时间
      const mtime = stats.mtime;

      return {
        title: title,
        filename: file,
        // 将时间对象转为字符串，例如: "2023/10/27 14:30:00"
        time: mtime.toLocaleString("zh-CN", { hour12: false }),
      };
    })
    .filter((item) => item !== null); // 过滤掉因错误返回的null项

  console.log(`成功处理 ${articleList.length} 个有效文章`);

  // 按时间倒序排列（最新的文章在最前面）
  articleList.sort((a, b) => {
    // 确保比较的是日期对象
    const dateA = new Date(a.time);
    const dateB = new Date(b.time);
    return dateB - dateA;
  });

  // 写入 JSON 文件
  fs.writeFile(jsonPath, JSON.stringify(articleList, null, 2), (err) => {
    if (err) {
      console.error("写入JSON文件失败:", err);
      process.exit(1);
      return;
    }

    console.log("articleList.json 生成成功！");
    console.log(`共生成 ${articleList.length} 篇文章列表。`);

    // 输出文章列表概览
    if (articleList.length > 0) {
      console.log("\n最新文章：");
      articleList.slice(0, 3).forEach((article, index) => {
        console.log(`${index + 1}. ${article.title} (${article.time})`);
      });
    }
  });
});
