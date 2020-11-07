import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_ORDER_HISTORY } from "../utils/queries";
import Auth from "../utils/auth";

const OrderHistory = () => {
  const { loading, data } = useQuery(QUERY_ORDER_HISTORY);
  let user;

  if (data) {
    user = data.user;
    console.log(user);
  }

  if (!Auth.loggedIn()) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-1">
      {user ? (
        <>
          <h2>
            Order History for {user.firstName} {user.lastName}
          </h2>
          {user.orders.map((order) => (
            <div key={order._id} className="my-2">
              <h3>
                {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
              </h3>
              <div className="flex-row">
                {order.blueprints.map(({ _id, name, price }, index) => (
                  <div key={index} className="card px-1 py-1">
                    <Link to={`/blueprints/${_id}`}>
                      <p>{name}</p>
                    </Link>
                    <div>
                      <span>${price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-row">
                {order.courses.map(({ _id, name, price }, index) => (
                  <div key={index} className="card px-1 py-1">
                    <Link to={`/courses/${_id}`}>
                      <p>{name}</p>
                    </Link>
                    <div>
                      <span>${price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : (
        <div>No order history!</div>
      )}
    </div>
  );
};

export default OrderHistory;
