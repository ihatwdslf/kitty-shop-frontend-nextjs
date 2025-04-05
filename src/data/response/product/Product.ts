import {BrandIdentifierAndNameResponseDto} from "@/data/response/brand/BrandIdentifierAndNameResponseDto";
import {CategoryIdentifierAndNameResponseDto} from "@/data/response/category/CategoryIdentifierAndNameResponseDto";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    discount: number;
    imageUrl: string;
    stockQuantity: number;
    stockKeepingUnit: string;
    createdAt: string;
    updatedAt: string;
    brand: BrandIdentifierAndNameResponseDto;
    categories: CategoryIdentifierAndNameResponseDto[];
}