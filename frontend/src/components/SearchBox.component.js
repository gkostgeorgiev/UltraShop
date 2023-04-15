import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} inline className="d-flex align-items-center">
      <Row>
        <Col className="col-lg-8 col-md-7 col-12 ml-auto">
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search Products..."
            className="mr-sm-2 w-100"
            style={{ maxWidth: "500px", borderRadius: '5px', marginLeft: '50px' }}
          ></Form.Control>
        </Col>
        <Col>
          <Button
            type="submit"
            variant="success"
            className="px-3 py-1.5"
            style={{marginTop: '-0.5px'}}
          >
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
