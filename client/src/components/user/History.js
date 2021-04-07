import React, { useState, useEffect } from "react";
import { getOrders } from "../../Functions/user";
import { useSelector } from "react-redux";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const History = () => {
  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    footer: {
      padding: "100px",
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  const loadOrders = () => {
    getOrders(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  useEffect(() => {
    loadOrders();
  }, []);

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={
        <Document>
          <Page style={styles.body}>
            <Text style={styles.header} fixed>
              ~{" "}
              {new Date().toLocaleString("en-US", {
                style: "date",
                hour12: true,
                month: "long",
                day: "2-digit",
                year: "numeric",
                weekday: "short",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              ~
            </Text>
            <Text style={styles.title}>Order Invoice</Text>
            <Text style={styles.author}>React Redux Ecommerce</Text>
            <Text style={styles.subtitle}>Order Summary</Text>

            <Table>
              <TableHeader>
                <TableCell>Title</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Color</TableCell>
              </TableHeader>
            </Table>

            <Table data={order.products}>
              <TableBody>
                <DataTableCell getContent={(x) => x.product.title} />
                <DataTableCell
                  getContent={(x) =>
                    x.product.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })
                  }
                />
                <DataTableCell getContent={(x) => x.count} />
                <DataTableCell getContent={(x) => x.product.color} />
              </TableBody>
            </Table>

            <Text style={styles.text}>
              <Text>
                Date: {"               "}
                {new Date(order.paymentIntent.created * 1000).toLocaleString(
                  "en-US",
                  {
                    style: "date",
                    hour12: true,
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </Text>
              {"\n"}
              <Text>
                Order Id: {"         "}
                {order.paymentIntent.id}
              </Text>
              {"\n"}
              <Text>
                Order Status: {"  "}
                {order.ordderStatus}
              </Text>
              {"\n"}
              <Text>
                Total Paid: {"       "}
                {(order.paymentIntent.amount / 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "INR",
                })}
              </Text>
            </Text>

            <Text style={styles.footer}>
              {" "}
              ~ Thank you for shopping with us ~{" "}
            </Text>
          </Page>
        </Document>
      }
      className="btn btn-info"
      fileName="invoice.pdf"
    >
      Download Invoice
    </PDFDownloadLink>
  );
  return (
    <div className="container-fluid mt-5 pt-5">
      <div className="container">
        <div className="row text-center mt-5">
          <h3>Purchase History</h3>
        </div>
        <div className="row h-100">
          <div className="col-12">
            {orders.map((order, i) => (
              <div key={i} className="m-3  card">
                <div className="row w-100">
                  <div className="col-12 text-center">
                    <p>Order Id: {order.paymentIntent.id}</p>
                    <p>
                      {`Order Amount : ${(
                        order.paymentIntent.amount / 100
                      ).toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}`}
                      {" / "}
                      {`Method: ${order.paymentIntent.payment_method_types[0]}`}
                      {" / "}
                      {`Payment Status: ${order.paymentIntent.status.toUpperCase()}`}
                      {" / "}
                      {`Ordered On: ${new Date(
                        order.paymentIntent.created * 1000
                      ).toLocaleString("en-US", {
                        style: "date",
                        hour12: true,
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                        weekday: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`}
                    </p>
                  </div>
                </div>
                <div className="row w-100 overflow-scroll">
                  <table className="table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Price</th>
                        <th scope="col">Count</th>
                        <th scope="col">Color</th>
                        <th scope="col">Shipping</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((p, i) => (
                        <tr key={i}>
                          <td>{p.product.title}</td>
                          <td>
                            <span>&#8377;</span>
                            {p.product.price}
                          </td>
                          <td>{p.count}</td>
                          <td>{p.product.color}</td>
                          <td>
                            {p.product.shipping === "Yes" ? (
                              <CheckCircleFilled className="text-success" />
                            ) : (
                              <CloseCircleFilled className="text-danger" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="row d-flex flex-row-reverse">
                  <div className="col-6 text-center">
                    <div
                      className="btn btn-primary disabled"
                      style={{ fontSize: "xx-small" }}
                    >
                      <strong>Status : {order.ordderStatus}</strong>
                    </div>
                  </div>
                  <div className="col-6 d-flex justify-content-center">
                    {showDownloadLink(order)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
