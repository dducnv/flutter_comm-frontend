export function routerPathChange({ categorySlug }: { categorySlug: string }) {
  switch (categorySlug) {
    case "bai-viet":
      return "posts";
    case "hoi-dap":
      return "question";
    case "thao-luan":
      return "discussion";
    case "job":
      return "job";
  }
}
