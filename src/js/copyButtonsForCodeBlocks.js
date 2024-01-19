document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
        const copyButton = createCopyButton(codeBlock);
        codeBlock.parentElement.appendChild(copyButton);
    });
});

const createCopyButton = (codeBlock) => {
    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.innerText = "Copy";
    copyButton.classList.add("copy-button");
    copyButton.addEventListener("click", () => {
        copyCodeBlockToClipboard(codeBlock, copyButton);
    });

    return copyButton;
};

const copyCodeBlockToClipboard = (codeBlock, copyButton) => {
    const code = codeBlock.innerText;
    navigator.clipboard.writeText(code).then(() => {
        copyButton.innerText = "Copied!";

        setTimeout(() => {
            copyButton.innerText = "Copy";
        }, 2000);
    });
};