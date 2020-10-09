import React, { useState, useEffect }  from "react";
import { Link } from 'react-router-dom';

import {
  Card,
  CardBody,
  Container
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

export default function Discipline() {
  const [ads, setAds] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    api.get('admin/ads', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      setAds(response.data);
    })
  }, [token]);
  
  const actionsFormatter = (cell, row) => (
    <>
      <Link className="btn btn-icon-only btn-default btn2" to={`ads/${row.id}`}>
        <span className="btn-inner--icon">
          <i class="fas fa-eye"/>
        </span>
      </Link>
    </>
  );

  const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: false,
    showTotal: true,
    withFirstAndLast: true,
    firstPageTitle: 'Primeira página',
    prePageTitle: 'Voltar',
    nextPageTitle: 'Avançar',
    lastPageTitle: 'Última página',
    sizePerPageRenderer: ({ options, currSizePerPage, onSizePerPageChange }) => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Mostrar{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={e => onSizePerPageChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          }{" "}
          registros.
        </label>
      </div>
    ),
    paginationTotalRenderer: (from, to, size ) => (
      <span className="react-bootstrap-table-pagination-total">
        {" "}Mostrando { from } a { to } de { size } resultados
      </span>
    )
  });

  const { SearchBar } = Search;

  return (
    <>
      <PageHeader name="Disciplinas" pathAdd="discipline" />

      <Container className="mt--6" fluid>
      
      </Container>
    </>
  )
}