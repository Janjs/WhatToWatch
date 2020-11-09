
import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import logo from '../../assets/img/icon.png';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col md="4">
              <h1 className="title"><img src={logo} alt="icon" width="50" height="auto"/>  What To Watch</h1>
            </Col>
            <Col md="4">
              <h3 className="title">Follow me:</h3>
              <div className="btn-wrapper profile">
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://www.linkedin.com/in/jan-jim%C3%A9nez-serra-8b8085111/"
                  id="tooltip622135962"
                  target="_blank"
                >
                  <i className="fab fa-linkedin" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip622135962">
                  Contact me on Linked In
                </UncontrolledTooltip>
                <Button
                  className="btn-icon btn-neutral btn-round btn-simple"
                  color="default"
                  href="https://github.com/Janjs"
                  id="tooltip230450801"
                  target="_blank"
                >
                  <i className="fab fa-github" />
                </Button>
                <UncontrolledTooltip delay={0} target="tooltip230450801">
                  See my other projects
                </UncontrolledTooltip>
              </div>
            </Col>
            <Col md="4">
              <h3 className="title">Made by <a href="https://janjs.github.io">Jan J. Serra</a></h3>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;
