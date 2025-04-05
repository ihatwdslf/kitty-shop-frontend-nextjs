export interface Category {
    id: number;
    key: string;
    name: string;
    description: string;
    icon: string;
    isQuicklyAccessible: boolean;
    isRemovable: boolean;
    parentId: number | null;
}