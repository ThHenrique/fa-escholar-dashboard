import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  DropdownItem,
  Table,
  Media,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import PageHeader from "../../components/PageHeader";

import api from "../../services/api";

export default function Admins() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("admin/index", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUsers(response.data);
      }
      catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const levelFormatter = (cell) => (
    <>
      <Badge color={cell == 'admin' ? 'danger' : cell == 'manager' ? 'success' : 'primary'}>
        {cell}
      </Badge>
    </>
  );


  const actionsFormatter = (cell, row) => (
    <>
      <Link
        className="btn btn-icon-only btn-success btn2"
        to={`admins/${row.id}`}
      >
        <span className="btn-inner--icon">
          <i class="fas fa-pen" />
        </span>
      </Link>
      <Button
        className="btn btn-icon-only btn-danger btn2"
        onClick={() => handleDeleteUser(row.id)}
      >
        <span className="btn-inner--icon">
          <i class="fas fa-trash" />
        </span>
      </Button>
    </>
  );

  async function handleDeleteUser(id) {
    try {
      await api.delete(`admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      console.error("Erro ao deletar usuário, tente novamente: ", err);
    }
  }

  const pagination = paginationFactory({
    page: 1,
    alwaysShowAllBtns: false,
    showTotal: true,
    withFirstAndLast: true,
    firstPageTitle: "Primeira página",
    prePageTitle: "Voltar",
    nextPageTitle: "Avançar",
    lastPageTitle: "Última página",
    sizePerPageRenderer: ({
      options,
      currSizePerPage,
      onSizePerPageChange,
    }) => (
      <div className="dataTables_length" id="datatable-basic_length">
        <label>
          Mostrar{" "}
          {
            <select
              name="datatable-basic_length"
              aria-controls="datatable-basic"
              className="form-control form-control-sm"
              onChange={(e) => onSizePerPageChange(e.target.value)}
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
    paginationTotalRenderer: (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        {" "}
        Mostrando {from} a {to} de {size} resultados
      </span>
    ),
  });

  const { SearchBar } = Search;

  return (
    <>
      <PageHeader name="Administradores" pathAdd="admins" />

      <Container className="mt--6" fluid>
        <Card className="card-frame">
          <CardBody>
            <ToolkitProvider
              data={users}
              keyField="id"
              columns={[
                {
                  dataField: "id",
                  text: "#",
                  sort: true,
                  style: { width: "5%" },
                },
                {
                  dataField: "name",
                  text: "Nome",
                  sort: true,
                },
                {
                  dataField: "role",
                  text: "Nível de acesso",
                  formatter: levelFormatter,
                  sort: true,
                },
                {
                  dataField: "created_at",
                  text: "Criado em",
                  sort: true,
                },
                {
                  dataField: "action",
                  isDummyField: true,
                  formatter: actionsFormatter,
                  text: "Ações",
                  sort: false,
                  style: { width: "5%" },
                },
              ]}
              search
            >
              {(props) => (
                <div className="py-4 table-responsive">
                  <div
                    id="datatable-basic_filter"
                    className="dataTables_filter px-4 pb-1"
                  >
                    <label>
                      Pesquisar:
                      <SearchBar
                        className="form-control-sm ml-2"
                        placeholder="Pesquisar"
                        {...props.searchProps}
                      />
                    </label>
                  </div>
                  <BootstrapTable
                    {...props.baseProps}
                    bootstrap4={true}
                    pagination={pagination}
                    bordered={false}
                  />
                </div>
              )}
            </ToolkitProvider>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
