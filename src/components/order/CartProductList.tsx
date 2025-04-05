import {getCartItems} from "@/utils/cartStorage";
import CartProductListItem from "@/components/order/CartProductListItem";

const CartProductList = () => {
    const cartItems = getCartItems();

    return (
        <div>
            {cartItems.map((cartItem) => (
                <div key={"cart_product_list_item_" + cartItem.productId} className="bg-white mt-1 p-5">
                    <CartProductListItem cartItem={cartItem} />
                </div>
            ))}
        </div>
    )
}

export default CartProductList;