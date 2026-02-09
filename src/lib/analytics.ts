export async function logSearch(query: string) {
  if (!query) return;
  await fetch("/api/analytics/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });
}

export async function logProductClick(productId: string, source?: string) {
  await fetch("/api/analytics/product-click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, source }),
  });
}
