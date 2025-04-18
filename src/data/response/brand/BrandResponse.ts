import {CountryResponse} from "@/data/response/country/CountryResponse";

export interface BrandResponse {
    id: number;
    name: string;
    description: string;
    website: string;
    country: CountryResponse;
}