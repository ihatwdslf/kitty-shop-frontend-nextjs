export interface UpdateCategoryRequest {
    key?: string;
    name?: string;
    description?: string;
    parentId?: number;
    icon?: string;
    isQuicklyAccessible?: boolean;
    isRemovable?: boolean;
}