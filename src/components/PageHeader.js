import React from 'react';
import { Link } from 'react-router-dom';


import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from "reactstrap";

export default function PageHeader({ name, parentName, parentPath, pathAdd }) {
  const parent = () => {
    if(parentName) {
      return (
        <BreadcrumbItem>
          <Link to={`/${parentPath}`}>
            {parentName}
          </Link>
        </BreadcrumbItem>
      )
    }
  };

  const newButton = () => {
    if(pathAdd) {
      return (
        <Col className="text-right" lg="6" xs="5">
          <Link
            className="btn btn-success btn-sm"
            to={`/${pathAdd}/new`}
          >
            <i className="fas fa-plus"></i>
            {" "}Novo
          </Link>
        </Col>
      )
    }
  }

  return (
    <div className="header bg-default pb-6 pt-6">
      <Container fluid>
        <div className="header-body">
          <Row className="align-items-center py-4">
            <Col lg="6" xs="7">
              <h6 className="h2 text-white d-inline-block mb-0">
                {name}
              </h6>{" "}
              <Breadcrumb
                className="d-none d-md-inline-block ml-md-4 bg-default"
                listClassName="breadcrumb-links breadcrumb-dark bg-default "
              >
                <BreadcrumbItem>
                  <Link to="/">
                    <i className="fas fa-home text-white" />
                  </Link>
                </BreadcrumbItem>
                {parent()}
                <BreadcrumbItem aria-current="page" className="active text-white">
                  {name}
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            {newButton()}
          </Row>
        </div>
      </Container>
    </div>
  )
}