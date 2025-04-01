import React from "react";
import Image from "next/image";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";

interface ProductCardPropsType {
    img: string;
    title: string;
    desc: string;
    rating: number;
    price: string;
}

const ProductCard: React.FC<ProductCardPropsType> = ({ img, title, desc, rating, price }) => {

    const generateRating = (rating: number) => {
        const validRating = Math.max(0, Math.min(5, rating));

        const filledStars = Array(validRating).fill(null).map((_, index) => (
            <AiFillStar key={`filled-${index}`} />
        ));
        const emptyStars = Array(5 - validRating).fill(null).map((_, index) => (
            <AiOutlineStar key={`empty-${index}`} />
        ));

        return (
            <div className="flex gap-1 text-[20px] text-amber-400">
                {filledStars}
                {emptyStars}
            </div>
        );
    }

    return (
        <div className="px-4 border border-gray-200 rounded-xl max-w-[400px]">
            <div>
                <Image
                    className="w-full h-auto"
                    src={img}
                    alt={title}
                    width={200}
                    height={300}
                />
            </div>

            <div className="space-y-2 py-2">
                <h2 className="text-rose-400 font-medium uppercase">{title}</h2>
                <p className="text-gray-500 max-w-[150px]">{desc}</p>
                <div>{generateRating(rating)}</div>

                <div className="font-bold flex gap-4">
                    ${price}
                    <del className="text-gray-500 font-normal">
                        ${parseInt(price) + 50}.00
                    </del>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;