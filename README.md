# 土豆博客

这是我个人的静态博客网站，托管在 GitHub Pages 上。

## 项目结构

- `index.html` - 博客首页，展示文章列表
- `css/layout.css` - 样式文件
- `js/js.js` - JavaScript 功能脚本
- `pages/` - 存放博客文章的目录
- `articleList.json` - 自动生成的文章列表数据
- `build.js` - 生成文章列表的构建脚本
- `images/` - 图片资源目录
- `template.html` - 博客文章模板HTML

## 功能特性

- 响应式设计，适配移动端
- 支持代码高亮显示
- 自动从 pages 目录生成文章列表
- SEO 友好

## 使用方法

### 添加新文章

1. 在 `pages/` 目录下创建新的 HTML 文件
2. 运行 `node build.js` 更新文章列表
3. 提交更改并推送到 GitHub 仓库

### 本地预览

直接在浏览器中打开 `index.html` 文件即可预览。

### 更新文章列表

运行构建脚本：

```bash
node build.js
```

这会扫描 `pages/` 目录下的 HTML 文件并生成 `articleList.json`。

## 部署

1. 在本地运行 `node build.js` 生成文章列表
2. 推送到 GitHub 仓库
3. 通过 GitHub Pages 服务自动部署
