import React from "react";
import { useHistory, Link } from 'react-router-dom';

import classnames from "classnames";
import PropTypes from "prop-types";

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  ListGroupItem,
  ListGroup,
  Media,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

import { logout } from '../services/auth';

export default function AdminNavbar() {
  const history = useHistory();

  async function handleLogout() {
    logout();

    history.push('/login');
  }

  const openSearch = () => {
    document.body.classList.add("g-navbar-search-showing");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-showing");
      document.body.classList.add("g-navbar-search-show");
    }, 150);
    setTimeout(function() {
      document.body.classList.add("g-navbar-search-shown");
    }, 300);
  };
  // function that on mobile devices makes the search close
  const closeSearch = () => {
    document.body.classList.remove("g-navbar-search-shown");
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-show");
      document.body.classList.add("g-navbar-search-hiding");
    }, 150);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hiding");
      document.body.classList.add("g-navbar-search-hidden");
    }, 300);
    setTimeout(function() {
      document.body.classList.remove("g-navbar-search-hidden");
    }, 500);
  };

  return (
    <>
      <Navbar
        className={classnames(
          "navbar-top navbar-expand border-bottom",
          { "navbar-dark bg-default": true },
          { "navbar-light bg-secondary": false }
        )}
      >
        <Container fluid>
          <Collapse navbar isOpen={true}>
            <Form
              className={classnames(
                "navbar-search form-inline mr-sm-3",
                { "navbar-search-light": true },
                { "navbar-search-dark": false }
              )}
            >
              <FormGroup className="mb-0">
                <InputGroup className="input-group-alternative input-group-merge bg-secondary">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-search" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Buscar..." type="text" />
                </InputGroup>
              </FormGroup>
              <button
                aria-label="Close"
                className="close"
                type="button"
                onClick={closeSearch}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </Form>

            <Nav className="align-items-center ml-md-auto" navbar>
              <NavItem className="d-xl-none">
                <div
                  className={classnames(
                    "pr-3 sidenav-toggler",
                    { active: true },
                    { "sidenav-toggler-dark": false }
                  )}
                >
                  <div className="sidenav-toggler-inner">
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                    <i className="sidenav-toggler-line" />
                  </div>
                </div>
              </NavItem>
              <NavItem className="d-sm-none">
                <NavLink onClick={openSearch}>
                  <i className="ni ni-zoom-split-in" />
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link" color="" tag="a">
                  <i className="ni ni-bell-55" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-xl py-0 overflow-hidden"
                  right
                >
                  <div className="px-3 py-3">
                    <h6 className="text-sm text-muted m-0">
                      Você possuí <strong className="text-info">1</strong>{" "}
                      notificações.
                    </h6>
                  </div>

                  <ListGroup flush>
                    <ListGroupItem
                      className="list-group-item-action"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      tag="a"
                    >
                      <Row className="align-items-center">
                        <Col className="col-auto">
                          <img
                            alt="..."
                            className="avatar rounded-circle"
                            src={require("../assets/img/theme/team-1.jpg")}
                          />
                        </Col>
                        <div className="col ml--2">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h4 className="mb-0 text-sm">Carlos</h4>
                            </div>
                            <div className="text-right text-muted">
                              <small>há 2 hrs</small>
                            </div>
                          </div>
                          <p className="text-sm mb-0">
                            Solicitação de verificação de perfil
                          </p>
                        </div>
                      </Row>
                    </ListGroupItem>
                  </ListGroup>

                  <DropdownItem
                    className="text-center text-info font-weight-bold py-3"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                  >
                    Ver todas
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link" color="" tag="a">
                  <i className="ni ni-ungroup" />
                </DropdownToggle>
                <DropdownMenu
                  className="dropdown-menu-lg dropdown-menu-dark bg-default"
                  right
                >
                  <Row className="shortcuts px-4">
                    <Col
                      className="shortcut-item "
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      xs="6"
                      tag="a"
                    >
                      <Link to="/">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-yellow">
                          <i className="ni ni-chart-pie-35" />
                        </span>
                        <small>Dashboard</small>
                      </Link>
                    </Col>
                    <Col
                      className="shortcut-item "
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      xs="6"
                      tag="a"
                    >
                      <Link to="/discipline">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-info">
                          <i className="ni ni-book-bookmark" />
                        </span>
                        <small>Disciplinas</small>
                      </Link>
                    </Col>
                    <Col
                      className="shortcut-item "
                      xs="6"
                      tag="a"
                    >
                      <Link to="/profiles">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-green">
                          <i className="ni ni-circle-08" />
                        </span>
                        <small>Acessar Perfil</small>
                      </Link>
                    </Col>
                    <Col
                      className="shortcut-item "
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      xs="6"
                      tag="a"
                    >
                      <Link to="/admins">
                        <span className="shortcut-media avatar rounded-circle bg-gradient-purple">
                          <i className="ni ni-fat-add" />
                        </span>
                        <small>Administradores</small>
                      </Link>
                    </Col>
                  </Row>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <Nav className="align-items-center ml-auto ml-md-0" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="nav-link pr-0" color="" tag="a">
                  <Media className="align-items-center">
                     <span className="avatar avatar-sm rounded-circle">
                      <img
                        alt="..."
                        src={require("../assets/img/theme/team-1.jpg")}
                      />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        { localStorage.getItem('name') }
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem className="noti-title" header tag="div">
                    <h6 className="text-overflow m-0">Bem vindo!</h6>
                  </DropdownItem>
                  <DropdownItem
                    onClick={e => history.push('/profiles')}
                  >
                    <i className="ni ni-single-02" />
                    <span>Meu perfil</span>
                  </DropdownItem>

                  <DropdownItem divider />
                  <DropdownItem
                    href="#"
                    onClick={handleLogout}
                  >
                    <i className="ni ni-user-run" />
                    <span>Sair</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}
AdminNavbar.defaultProps = {
  toggleSidenav: () => {},
  sidenavOpen: false,
  theme: "dark"
};
AdminNavbar.propTypes = {
  toggleSidenav: PropTypes.func,
  sidenavOpen: PropTypes.bool,
  theme: PropTypes.oneOf(["dark", "light"])
};
