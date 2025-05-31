export function stripHtml(html: string): string {
  const div = document.createElement("div");
  div.innerHTML = html;

  div.querySelectorAll("li").forEach((li) => {
    li.innerHTML = "• " + li.textContent;
  });

  div.querySelectorAll("br, p").forEach((el) => {
    el.insertAdjacentText("afterend", "\n");
  });

  const text = div.textContent || div.innerText || "";
  return text.replace(/\s+/g, " ").trim();
}

export function truncateText(text: string, maxLength: number): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const truncated = trimmed.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");
  return truncated.slice(0, lastSpace) + "...";
}
