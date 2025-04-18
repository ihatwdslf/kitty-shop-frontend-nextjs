export interface CreateCategoryRequest {
    key: string;
    name: string;
    description: string;
    parentId?: number;
    icon?: string;
    isQuicklyAccessible?: boolean;
    isRemovable?: boolean;
}