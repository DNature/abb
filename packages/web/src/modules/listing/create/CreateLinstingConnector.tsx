import * as React from "react";
import { Form as AntForm, Row, Col, Button } from "antd";
import { Form, Formik } from "formik";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { RouteComponentProps } from "react-router-dom";
import { Page3 } from "./ui/Page3";

// name: String!
// category: String!
// description: String!
// price: Int!
// beds: Int!
// guests: Int!
// latitude: Float!
// longitude: Float!
// amenities: [String!]!

// interface FormValues {
//   name: string;
//   category: string;
//   description: string;
//   price: number;
//   beds: number;
//   guests: number;
//   latitude: number;
//   longitude: number;
//   amenities: string[];
// }
interface State {
  page: number;
}

const pages = [<Page1 />, <Page2 />, <Page3 />];

export class CreateListingConnector extends React.PureComponent<
  RouteComponentProps<{}>,
  State
> {
  state = {
    page: 0
  };

  submit = (values: any) => {
    console.log("values: ", values);
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));
  prevPage = () => this.setState(state => ({ page: state.page - 1 }));

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          category: "",
          description: "",
          price: 0,
          beds: 0,
          guests: 0,
          latitude: 0,
          longitude: 0,
          amenities: []
        }}
        onSubmit={this.submit}
      >
        {() => (
          <Form style={{ display: "flex" }}>
            <div className="login-form" style={{ width: 400, margin: "auto" }}>
              {pages[this.state.page]}
              <AntForm.Item>
                {this.state.page === pages.length - 1 ? (
                  <Row>
                    <Col span={6} push={0}>
                      <Button
                        type="danger"
                        className="login-form-button"
                        onClick={this.prevPage}
                      >
                        Go Back
                      </Button>
                    </Col>
                    <Col span={18} pull={0}>
                      <div>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="login-form-button"
                          block
                        >
                          Create listing
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    {this.state.page > 0 && (
                      <Col span={6} push={0}>
                        <Button
                          type="danger"
                          className="login-form-button"
                          onClick={this.prevPage}
                        >
                          Go Back
                        </Button>
                      </Col>
                    )}
                    <Col span={this.state.page === 0 ? 24 : 18} push={0}>
                      <Button
                        type="dashed"
                        block
                        className="login-form-button"
                        onClick={this.nextPage}
                      >
                        Next page
                      </Button>
                    </Col>
                  </Row>
                )}
              </AntForm.Item>
            </div>
          </Form>
        )}
      </Formik>
    );
  }
}
