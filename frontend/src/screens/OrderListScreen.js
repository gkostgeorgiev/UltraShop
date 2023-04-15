import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.component";
import Loader from "../components/Loader.component";
import { listAllOrders } from "../actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allOrderList = useSelector((state) => state.allOrderList);
  const { loading, error, orders } = allOrderList;
  console.log(orders);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else if (userInfo && userInfo.isAdmin === false) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  //   const deleteHandler = (id) => {
  //     if (window.confirm('Are you sure')){
  //       dispatch(deleteUser(id));
  //     }
  //   };

  return (
    <Container>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders ? (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10).split('-').reverse().join('.')}</td>
                <td>€{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10).split('-').reverse().join('.')
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10).split('-').reverse().join('.')
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </Container>
  );
};

export default OrderListScreen;
