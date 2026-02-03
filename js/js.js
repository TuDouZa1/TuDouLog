(function () {
  "use strict";

  // 修改文章详情标题为html文件名
  const articleTitle = {
    init() {
      this.showCurrentFileName();
    },
    showCurrentFileName() {
      const fileNameId = document.getElementById("fileName");
      if (fileNameId) {
        // 提取文件名
        const urlPaths = window.location.href.split("/");
        const fileName = urlPaths[urlPaths.length - 1].split("?")[0];
        // 解码中文
        const decodedFileName = decodeURIComponent(fileName).replace(
          ".html",
          "",
        );
        // 显示文件名
        fileNameId.textContent = decodedFileName;
        // 修改文件标题
        document.title = decodedFileName;
      }
    },
  };

  // 主题
  const ThemeManager = {
    init() {
      this.loadTheme();
      this.createToggleButton();
    },

    loadTheme() {
      const savedTheme = localStorage.getItem("tudou-theme") || "light";
      document.documentElement.setAttribute("data-theme", savedTheme);
    },

    toggle() {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("tudou-theme", newTheme);
    },

    createToggleButton() {
      const btn = document.createElement("button");
      btn.className = "theme-toggle";
      btn.setAttribute("aria-label", "切换主题");
      btn.innerHTML = `
      <svg class="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
      <svg class="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    `;
      btn.addEventListener("click", () => this.toggle());
      document.body.appendChild(btn);
    },
  };

  // 复制代码
  const copyCode = {
    init() {
      this.processCodeBlocks();
    },
    processCodeBlocks() {
      document.querySelectorAll("pre code").forEach((code) => {
        const pre = code.parentElement;
        const lang = code.className;
        const header = document.createElement("div");
        header.className = "code-lang";
        header.innerHTML = `
          <span class="code-lang-name">${lang ? lang.charAt(0).toUpperCase() + lang.slice(1) : "Text"}</span>
          <button class="copy-code-btn">
            复制
          </button>
        `;
        // 将头部插入到 pre 元素之前
        pre.parentNode.insertBefore(header, pre);
        const copyBtn = header.querySelector(".copy-code-btn");
        const codeText = code.textContent || code.innerText;
        copyBtn.addEventListener("click", () => {
          this.copyToClipboard(codeText, copyBtn);
        });
      });
    },
    copyToClipboard(text, btn) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            this.showCopySuccess(btn);
          })
          .catch((err) => {
            console.error("复制失败:", err);
          });
      }
    },
    showCopySuccess(btn) {
      const originalText = btn.textContent;
      btn.textContent = "已复制";
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1500);
    },
  };

  // 初始化
  document.addEventListener("DOMContentLoaded", () => {
    ThemeManager.init();
    articleTitle.init();
    copyCode.init();

    // 代码高亮（如果存在hljs）
    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }
  });
})();
