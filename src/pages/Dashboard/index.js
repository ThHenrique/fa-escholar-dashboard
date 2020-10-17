import React from "react";
import classnames from "classnames";
import Chart from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import CardsHeader from "../../components/Headers/CardsHeader.jsx";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "./variables/charts.jsx";

class Dashboard extends React.Component {
  state = {
    activeNav: 1,
    chartExample1Data: "data1"
  };
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  render() {
    return (
      <>
        <CardsHeader name="Default" parentName="Dashboards" />
        <Container className="mt-6" fluid>
          <Row>
            <Col xl="8">
              <Card>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-light text-uppercase ls-1 mb-1">
                        Visão geral
                      </h6>
                      <h5 className="h3 text-white mb-0">Valor de venda</h5>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem className="mr-2 mr-md-0">
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Mês</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames("py-2 px-3", {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Semana</span>
                            <span className="d-md-none">S</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      id="chart-sales-dark"
                      className="chart-canvas"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card>
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Vendas
                      </h6>
                      <h5 className="h3 mb-0">Compras Total</h5>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                      className="chart-canvas"
                      id="chart-bars"
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xl={12} className="mt-3">
              <Card>
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Visitas por Disciplina</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Ver Tudo
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Disciplina</th>
                      <th scope="col">Visitas</th>
                      <th scope="col">Usuários únicos</th>
                      <th scope="col">Taxa de rejeição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">/Homepage/</th>
                      <td>4,569</td>
                      <td>340</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/Discipline/portuguese/pontuacao</th>
                      <td>3,985</td>
                      <td>319</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />
                        46,53%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/Discipline/portuguese</th>
                      <td>3,513</td>
                      <td>294</td>
                      <td>
                        <i className="fas fa-arrow-down text-warning mr-3" />
                        36,49%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/Discipline/english</th>
                      <td>2,050</td>
                      <td>147</td>
                      <td>
                        <i className="fas fa-arrow-up text-success mr-3" />
                        50,87%
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">/Discipline/hardware</th>
                      <td>1,795</td>
                      <td>190</td>
                      <td>
                        <i className="fas fa-arrow-down text-danger mr-3" />
                        46,53%
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Dashboard;
