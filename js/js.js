// 获取html文件名
function showCurrentFileName() {
  // 提取文件名
  const urlPaths = window.location.href.split("/");
  const fileName = urlPaths[urlPaths.length - 1].split("?")[0];
  // 解码中文
  const decodedFileName = decodeURIComponent(fileName).replace(".html", "");
  // 显示文件名
  document.getElementById("fileName").textContent = decodedFileName;
  // 修改文件标题
  document.title = decodedFileName;
}

document.querySelectorAll("pre code").forEach((block) => {
  block.textContent = block.innerHTML;
});

// 自动插入代码头并识别语言
document.querySelectorAll('pre code').forEach(code => {
  const pre = code.parentElement;
  const lang = code.className;
  const header = document.createElement('div');
  header.className = 'code-lang';
  header.innerHTML = `
    <span class="code-lang-name">${lang.charAt(0).toUpperCase() + lang.slice(1)}</span>
    <button onclick="copyCode(this)">复制</button>
  `;
  pre.parentNode.insertBefore(header, pre);
});

// 复制代码
function copyCode(btn) {
  const code = btn.closest('.code-lang').nextElementSibling.querySelector('code');
  navigator.clipboard.writeText(code.textContent).then(() => {
    btn.textContent = '已复制';
    setTimeout(() => btn.textContent = '复制', 1500);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // 在页面加载完成后执行
  hljs.highlightAll();
  showCurrentFileName();
});
