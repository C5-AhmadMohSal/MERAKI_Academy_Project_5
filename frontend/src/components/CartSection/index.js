import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setCart,
  changeQuantity,
  removeFromCart,
} from "../../redux/reducers/cart";
import AddToCartButton from "../AddToCart";
const CartSection = () => {
  const dispatch = useDispatch();
  const { cart, token, userId } = useSelector((state) => {
    return {
      cart: state.cart.cart,
      token: state.auth.token,
      userId: state.auth.userId,
    };
  });
  const [subTotal, setSubTotal] = useState(0);


  const getProductInCart = () => {
    axios
      .get(`http://localhost:5000/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result, `CARTFORUSER`);
        dispatch(setCart(result.data.result));
        subTotalCalculate(result.data.result);
      })
      .catch((err) => {
        console.log(err, `ERROR IN USER CART`);
      });
  };

  const changeQuantityInCart = (product_id, updatedQuantity) => {
    axios
      .put(
        `http://localhost:5000/cart/change_quantity/${product_id}`,
        {
          quantityInCart: updatedQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(
          changeQuantity({
            product_id: product_id,
            quantityInCart: updatedQuantity,
          })
        );
        console.log(result, "UPDATE QUANTITY");
      })
      .catch((err) => {
        console.log(err, "ERR IN ADDTOCART");
      });
  };

  const deleteFromCart = (id) => {
    axios
      .delete(`http://localhost:5000/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(removeFromCart({ product_id: id }));
      })
      .catch((err) => {
        console.log(err, "ERR DELETE FROM CART");
      });
  };

  const subTotalCalculate = (result) => {
    console.log("REDUCEER");
    console.log(result, "INSIDE REDUCER");
    const totalPriceForCart = result.reduce((total, element) => {
      return total + element.price * element.quantityInCart;
    }, 0);
    setSubTotal(totalPriceForCart);
  };

  useEffect(() => {
    getProductInCart();
  }, []);

  return (
    <div className="CartContainer">
      <div className="CartOneProduct">
        <div className="ContainerInfoAndImage">
          <p className="CartHeader-P Bottom">Product</p>
        </div>
        <div className="CartPrice Bottom">
          <p className="CartHeader-P Bottom">Price</p>
        </div>

        <p className="CartQuantity Bottom">Quantity</p>
        <p className="CartTotal Bottom">Total</p>
      </div>
      {cart &&
        cart.map((element) => {
          return (
            <div className="CartOneProduct">
              <div className="ContainerInfoAndImage">
                <div className="Image">
                  <img src={element.productImage} />
                </div>
                <div className="infoInCart">
                  <p>{element.title}</p>
                  <p>{element.description}</p>
                </div>
              </div>

              <div className="CartPrice">
                <p>{element.price}</p>
              </div>

              <div className="CartQuantity">
                <div className="CartBtnsContainer">
                  <button
                    onClick={() => {
                      changeQuantityInCart(
                        element.product_id,
                        element.quantityInCart + 1
                      );
                      subTotalCalculate(cart);
                    }}
                  >
                    +
                  </button>
                  <span>x{element.quantityInCart}</span>
                  <button
                    onClick={() => {
                      if (element.quantityInCart - 1 == 0) {
                        return deleteFromCart(element.product_id);
                      }
                      changeQuantityInCart(
                        element.product_id,
                        element.quantityInCart - 1
                      );
                      subTotalCalculate(cart);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>

              <div className="CartTotal">
                <AddToCartButton productId={element.product_id} />
                <p>{element.quantityInCart * element.price}</p>
              </div>
            </div>
          );
        })}
      <div className="SubTotal">Subtotal {subTotal} </div>
    </div>
  );
};

export default CartSection;
