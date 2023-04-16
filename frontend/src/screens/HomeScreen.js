import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import Product from "../components/Product.component";
import Message from "../components/Message.component";
import Loader from "../components/Loader.component";
import Paginate from "../components/Paginate.component";
import { listProducts } from "../actions/productActions";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const { keyword } = useParams("keyword");
  const { pageNumber } = useParams("pageNumber") || 1; 
  console.log(pageNumber)

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''}></Paginate>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
