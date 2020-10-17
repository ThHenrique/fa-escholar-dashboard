import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardImg,
  CardBody,
  Row,
  Container,
  Col,
  Badge
} from 'reactstrap';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

export default function Discipline() {
  const [users, setUsers] = useState([]);

  const allowedState = [
    { id: 1, name: "Português: Pontuação", alunos: 59 , lucro: 299.00, uri: "https://s3.amazonaws.com/midia.korntraducoes.com.br/wp-content/uploads/2018/06/14103621/Depositphotos_68180183_original.jpg" },
    { id: 2, name: "Matemática", alunos: 99 , lucro: 475.00, uri: "https://sto-blog.s3.amazonaws.com/images/2018/06/13/matematica-o-guia-completo.jpg" },
    { id: 3, name: "Inglês", alunos: 159 , lucro: 799.00, uri: "https://www.fapcom.edu.br/wp-content/uploads/2019/02/Dicas-para-melhorar-o-ingl%C3%AAs-1-750x500.jpeg"},
    { id: 2, name: "Hadware", alunos: 99 , lucro: 475.00, uri: "https://i.ytimg.com/vi/IfpbpvP-FgU/maxresdefault.jpg"},
    { id: 3, name: "Lógica de programação", alunos: 159 , lucro: 799.00, uri: "https://becode.com.br/wp-content/uploads/2016/06/Algoritmos-1.jpg" },
  ];

  const token = localStorage.getItem('token');

  useEffect(() => {
    setUsers(allowedState)
  }, []);

  const Discipline = ({data}) => {
    return (
      <>
        <Col md={6} className="d-flex flex-column">
          <Card className="p-2 card-frame mt-2 col-auto">
            <Row>
              <Col md={4} sm={12}>
                <CardImg
                  //key={props.file}
                  id="background"
                  className={data.uri ? "has-background" : ""}
                  style={{
                    backgroundImage: `url(${data.uri})`,
                    minHeight: 180,
                    minWidth: 200,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              </Col>
              <CardBody className="d-flex flex-column justify-content-around " md={6} sm={12}>
                <Row className="align-items-center ml-2">
                  <Col md={9}>
                    <h3>{data.name}</h3>
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`discipline/${data.id}`}
                      query={{data}}
                      >
                      <Badge color="danger" >
                        Editar
                      </Badge>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-around align-items-center">
                    <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                      <i className="fa fa-users"/>
                    </div>
                    <h4>Alunos : {data.alunos}</h4>
                  </Col>
                  <Col className="d-flex justify-content-around align-items-center">
                    <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                      <i className="ni ni-money-coins" />
                    </div>
                    <h4>{data.lucro}</h4>
                  </Col>
                </Row>
              </CardBody>
            </Row>
          </Card>
        </Col>
      </>
    )
  }

  return (
    <>
      <PageHeader name="Disciplinas" pathAdd="discipline" />

      <Container className="mt--6" fluid>
        <Row>
          {users.map(user => (
            <Discipline data={user}/>
          ))}
        </Row>
      </Container>
    </>
  );
}
