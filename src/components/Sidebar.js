import React, {useEffect, useState} from "react";

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

function Sidebar(props) {

  function activeRoute (routeName) {
    return props.location.pathname === routeName ? "active" : "";
  };

  const ScrollBarInner = () => (
    <>
      <div className="scrollbar-inner">
        <div className="sidenav-header d-flex justify-content-start">
          <NavbarBrand >
            <img
              alt="Logo Escholar"
              className="navbar-brand-img"
              src={logoImg}
            />
          </NavbarBrand>
        </div>
        <div className="navbar-inner">
        <Collapse navbar isOpen={false}>
          <h6 className="navbar-heading p-0 text-muted">Navegação</h6>
            <Nav className="mb-md-3" navbar>
              <NavItem
                className={activeRoute("/")}
                key={0}
              >
                <NavLink
                  to="/"
                  activeClassName={activeRoute("/")}
                  tag={NavLinkRRD}
                >
                  <>
                    <i className="ni ni-chart-pie-35" />
                    <span className="nav-link-text">Dashboard</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={activeRoute("/discipline")}
                key={1}
              >
                <NavLink
                  to="/discipline"
                  activeClassName={activeRoute("/discipline")}
                  tag={NavLinkRRD}
                >
                  <>
                    <i className="ni ni-book-bookmark" />
                    <span className="nav-link-text">Conteúdos</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={activeRoute("/users")}
                key={2}
              >
                <NavLink
                  to="/profiles"
                  activeClassName={activeRoute("/profiles")}
                  tag={NavLinkRRD}
                >
                  <>
                    <i className="ni ni-circle-08" />
                    <span className="nav-link-text">Acessar Perfil</span>
                  </>
                </NavLink>
              </NavItem>
              <NavItem
                className={activeRoute("/admins")}
                key={3}
              >
                <NavLink
                  to="/admins"
                  activeClassName={activeRoute("/admins")}
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
    </>
  );

  return (
    <Navbar
      className="sidenav navbar-vertical fixed-left navbar-expand-xs navbar-light bg-white"
    >
      <ScrollBarInner />
    </Navbar>
  );
}

export default Sidebar;
