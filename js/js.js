// 获取html文件名
function showCurrentFileName() {
  // 提取文件名
  const urlPaths = window.location.href.split("/");
  const fileName = urlPaths[urlPaths.length - 1].split("?")[0];
  // 解码中文
  const decodedFileName = decodeURIComponent(fileName).replace(".html", "");
  // 显示文件名
  document.getElementById("fileName").textContent = decodedFileName;
}

document.querySelectorAll("pre code").forEach((block) => {
  block.textContent = block.innerHTML;
});

document.addEventListener("DOMContentLoaded", function () {
  // 在页面加载完成后执行
  hljs.highlightAll();
  showCurrentFileName();
});
