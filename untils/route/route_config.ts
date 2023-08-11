export function routerPathChange({ categorySlug }: { categorySlug: string }) {
  switch (categorySlug) {
    case "bai-viet":
      return "fast-food";
    case "hoi-dap":
      return "question";
    case "fast-food":
      return "fast-food";
    case "thao-luan":
      return "discussion";
    case "job":
      return "job";
  }
}
