document.querySelectorAll("pre code").forEach((block) => {
  block.textContent = block.innerHTML;
});
hljs.highlightAll();
