import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAllUnCompleted } from "../../redux/reducers/orders";
import OrderStatus from "../ChangeOrderStatus";

const AdminUnCompletedOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allUnCompleted } = useSelector((state) => {
    return {
      allUnCompleted: state.orders.allUnCompleted,
    };
  });
  const getUnCompletedOrders = () => {
    axios.get(`http://localhost:5000/order/all_uncompleted`).then((result) => {
      console.log(result);
      dispatch(setAllUnCompleted(result.data.result));
    });
  };

  useEffect(() => {
    getUnCompletedOrders();
  }, []);

  //   console.log("ALLL ORDERDS", allOrders);
  return (
    <>
      {allUnCompleted &&
        allUnCompleted.map((element) => {
          return (
            <div className="One-Order">
              <div
                onClick={() => {
                  navigate(`/admin/order_details/${element.id}`);
                }}
              >
                <p>{element.id}</p>
                <p>{element.orderDate}</p>
                <p>{element.orderStatus ? "Completed" : "Un Completed"} </p>
              </div>

              <OrderStatus
                order_id={element.id}
                orderStatus={element.orderStatus}
              />
            </div>
          );
        })}
    </>
  );
};

export default AdminUnCompletedOrders;
