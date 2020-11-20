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

import PageHeader from '../../components/PageHeader';

import api from '../../services/api';

export default function Discipline() {
  const [disciplines, setDisciplines] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('discipline/index', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setDisciplines(response.data)
      } catch (error) {
        console.log(error);
      }
    })();

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
                  className={data.image ? "has-background" : ""}
                  style={{
                    backgroundImage: `url(${data.image})`,
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
          {disciplines.map(discipline => (
            <Discipline key={discipline.id} data={discipline}/>
          ))}
        </Row>
      </Container>
    </>
  );
}
