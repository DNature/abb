import * as React from "react";
import { Form as AntForm, Row, Col, Button } from "antd";
import { Form, Formik, FormikHelpers as FormikActions } from "formik";
import { Page1 } from "./ui/Page1";
import { Page2 } from "./ui/Page2";
import { RouteComponentProps } from "react-router-dom";
import { Page3 } from "./ui/Page3";
import { withCreateListing, WithCreateListing } from "@abb/controller";

// name: String!
// category: String!
// description: String!
// price: Int!
// beds: Int!
// guests: Int!
// latitude: Float!
// longitude: Float!
// amenities: [String!]!

interface FormValues {
  name: string;
  category: string;
  description: string;
  price: number;
  beds: number;
  guests: number;
  latitude: number;
  longitude: number;
  amenities: string[];
}
interface State {
  page: number;
}

const pages = [<Page1 />, <Page2 />, <Page3 />];

class C extends React.PureComponent<
  RouteComponentProps<{}> & WithCreateListing,
  State
> {
  state = {
    page: 0
  };

  submit = async (
    values: FormValues,
    { setSubmitting }: FormikActions<FormValues>
  ) => {
    this.props.createListing(values);
    setSubmitting(false);
  };

  nextPage = () => this.setState(state => ({ page: state.page + 1 }));
  prevPage = () => this.setState(state => ({ page: state.page - 1 }));

  render() {
    return (
      <Formik<FormValues>
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
        {({ isSubmitting }) => (
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
                          disabled={isSubmitting}
                          loading={isSubmitting}
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

export const CreateListingConnector = withCreateListing(C);
