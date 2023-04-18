import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Container,
  Form,
} from "react-bootstrap";
import {
  listProductDetails,
  createProductreview,
  editProductReview,
  deleteProductReview,
} from "../actions/productActions";
import Rating from "../components/Rating.component";
import Loader from "../components/Loader.component";
import Message from "../components/Message.component";
import Meta from "../components/Meta.component";
import { addToCart } from "../actions/cartActions";
import {
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_EDIT_REVIEW_RESET,
} from "../constants/productConstants";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const productReviewUpdate = useSelector((state) => state.productReviewUpdate);
  const { success: successProductReviewUpdate, error: errorProductReviewUpdate } =
    productReviewUpdate;

  const productReviewDelete = useSelector((state) => state.productReviewDelete);
  const { success: successProductReviewDelete, error: errorProductReviewDelete } =
    productReviewDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    } else if (successProductReviewUpdate){
      alert("Review Edited!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_EDIT_REVIEW_RESET })
    }


    dispatch(listProductDetails(id));
  }, [dispatch, id, successProductReview, successProductReviewUpdate, successProductReviewDelete]);

  const addToCartHandler = () => {
    addToCart(id, qty);
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductreview(id, {
        rating,
        comment,
      })
    );
  };

  const editHandler = (e) => {
    e.preventDefault();

    dispatch(
      editProductReview(id, {
        rating,
        comment,
      })
    );
  };

  const deleteHandler = (e) => {
    e.preventDefault();
    dispatch(deleteProductReview(id));
  }

  return (
    <Container>
      <Link className="btn btn-light my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: €{product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>€{product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>
                      {review.createdAt
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join(".")}
                    </p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a customer review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {!userInfo ? (
                    <Message>
                      Please <Link to="/login">log in</Link> to leave a review.
                    </Message>
                  ) : product.reviews.some(
                      (review) =>
                        review.user.toString() === userInfo._id.toString()
                    ) ? (
                    <>
                      <Message variant="success">
                        Product successfully reviewed! Would you like to edit or
                        delete your review? <Button variant='danger' onClick={deleteHandler}>Delete</Button>
                      </Message>
                      {errorProductReviewUpdate && (
                    <Message variant="danger">{errorProductReviewUpdate}</Message>
                  )}
                      {errorProductReviewDelete && (
                    <Message variant="danger">{errorProductReviewDelete}</Message>
                  )}
                      <Form onSubmit={editHandler}>
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            row="3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          variant="primary"
                          className="continue-button"
                        >
                          Submit
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        type="submit"
                        variant="primary"
                        className="continue-button"
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProductScreen;
