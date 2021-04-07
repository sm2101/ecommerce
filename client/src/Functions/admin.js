import axios from "axios";

export const getOrders = async (authToken) => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/orders`, {
    headers: {
      authToken,
    },
  });
};

export const updateOrder = async (orderId, ordderStatus, authToken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/admin/order-status`,
    { orderId, ordderStatus },
    {
      headers: {
        authToken,
      },
    }
  );
};
