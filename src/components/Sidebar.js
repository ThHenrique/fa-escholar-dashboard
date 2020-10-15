import React from "react";

import { NavLink as NavLinkRRD, Link } from "react-router-dom";

import classnames from "classnames";

import { PropTypes } from "prop-types";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";

import logoImg from '../assets/img/logo.png';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      ...this.getCollapseStates(props.routes)
    };
  }
  // verifies if routeName is the one active (in browser input) -- this.props.location.pathname.indexOf(routeName) > -1 ? "active" : ""
  activeRoute = routeName => {
    return this.props.location.pathname === routeName ? "active" : "";
  };
  // makes the sidenav normal on hover (actually when mouse enters on it)
  onMouseEnterSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.add("g-sidenav-show");
    }
  };
  // makes the sidenav mini on hover (actually when mouse leaves from it)
  onMouseLeaveSidenav = () => {
    if (!document.body.classList.contains("g-sidenav-pinned")) {
      document.body.classList.remove("g-sidenav-show");
    }
  };
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };
  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }
  // this is used on mobile devices, when a user navigates
  // the sidebar will autoclose
  closeSidenav = () => {
    if (window.innerWidth < 1200) {
      this.props.toggleSidenav();
    }
  };
  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = routes => {
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <NavItem key={key}>
            <NavLink
              href="#pablo"
              data-toggle="collapse"
              aria-expanded={this.state[prop.state]}
              className={classnames({
                active: this.getCollapseInitialState(prop.views)
              })}
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              {prop.icon ? <i className={prop.icon} /> : null}
              <span className="nav-link-text">{prop.name}</span>
            </NavLink>
            <Collapse isOpen={this.state[prop.state]}>
              <Nav className="nav-sm flex-column">
                {this.createLinks(prop.views)}
              </Nav>
            </Collapse>
          </NavItem>
        );
      }
      return (
        <NavItem
          className={this.activeRoute(prop.layout + prop.path)}
          key={key}
        >
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={this.closeSidenav}
            tag={NavLinkRRD}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <span className="nav-link-text">{prop.name}</span>
              </>
            ) : (
              prop.name
            )}
          </NavLink>
        </NavItem>
      );
    });
  };
  render() {
    const { routes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    const scrollBarInner = (
      <div className="scrollbar-inner">
        <div className="sidenav-header d-flex align-items-center">
          <NavbarBrand {...navbarBrandProps}>
            <img
              alt="Logo E-SCHOLAR"
              className="navbar-brand-img"
              src={logoImg}                                          
            />
          </NavbarBrand>
          <div className="ml-auto">
            <div
              className={classnames("sidenav-toggler d-none d-xl-block", {
                active: this.props.sidenavOpen
              })}
              onClick={this.props.toggleSidenav}
            >
              <div className="sidenav-toggler-inner">
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
                <i className="sidenav-toggler-line" />
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-inner">
          <Collapse navbar isOpen={false}>
          <h6 className="navbar-heading p-0 text-muted">Navegação</h6>
            <Nav className="mb-md-3" navbar>
              <NavItem
                className={this.activeRoute("/")}
                key={0}
              >
                <NavLink
                  to="/"
                  activeClassName={this.activeRoute("/")}
                  onClick={this.closeSidenav}
                  tag={NavLinkRRD}
                >
                  <>
                    <i className="ni ni-chart-pie-35" />
                    <span className="nav-link-text">Dashboard</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={this.activeRoute("/discipline")}
                key={1}
              >
                <NavLink
                  to="/discipline"
                  activeClassName={this.activeRoute("/discipline")}
                  onClick={this.closeSidenav}
                  tag={NavLinkRRD}
                >              
                  <>
                    <i className="ni ni-book-bookmark" />
                    <span className="nav-link-text">Conteúdos</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={this.activeRoute("/users")}
                key={2}
              >
                <NavLink
                  to="/profiles"
                  activeClassName={this.activeRoute("/profiles")}
                  onClick={this.closeSidenav}
                  tag={NavLinkRRD}
                >
                  <>
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-text">Acessar Perfil</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={this.activeRoute("/admins")}
                key={3}
              >
                <NavLink
                  to="/admins"
                  activeClassName={this.activeRoute("/admins")}
                  onClick={this.closeSidenav}
                  tag={NavLinkRRD}
                >              
                  <>
                    <i className="ni ni-fat-add" />
                    <span className="nav-link-text">Adicionar Admin</span>
                  </>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </div>
    );
    return (
      <Navbar
        className="sidenav navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
        onMouseEnter={this.onMouseEnterSidenav}
        onMouseLeave={this.onMouseLeaveSidenav}
      >
        {navigator.platform.indexOf("Win") > -1 ? (
          <PerfectScrollbar>{scrollBarInner}</PerfectScrollbar>
        ) : (
          scrollBarInner
        )}
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}],
  toggleSidenav: () => {},
  sidenavOpen: false
};

Sidebar.propTypes = {
  // function used to make sidenav mini or normal
  toggleSidenav: PropTypes.func,
  // prop to know if the sidenav is mini or normal
  sidenavOpen: PropTypes.bool,
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  // logo
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
