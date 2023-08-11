import { CategoryModel } from "../categories/category";
import { TagModel } from "../tags/tag";

export interface PostSaveModel {
  title: string;
  content: string;
  tags: TagModel[];
  description?: string;
  category: CategoryModel; //without when update
}
