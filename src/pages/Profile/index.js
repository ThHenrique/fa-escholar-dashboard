import React, { useState, useEffect, useRef }  from "react";
import { useHistory } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Input,
  Button,
  Card,
  CardBody,
  Container,
  Col,
  Row,
} from "reactstrap";

import NotificationAlert from "react-notification-alert";
import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';

import api from '../../services/api';
import PageHeader from "../../components/PageHeader";

export default function Profile({match}) {
  const [id, setId] = useState('')
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [created_at, setCreatedAt] = useState('');
  const [load, setLoad] = useState('Salvar');

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');


  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/adminAuth/getUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setId(response.data.id)
        setName(response.data.name)
        setEmail(response.data.email)
        setCreatedAt(response.data.created_at)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [token])

  async function handleEditAdmin(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name
    }

    try {
      await api.put(`admin/update/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notify('fas fa-check', 'success', 'Sucesso!', 'Administrador alterado.');

      setTimeout(function(){
        history.push('/admins');
      }, 3000);
    } catch (err) {
      console.error(err);

      notify('fas fa-times', 'danger', 'Erro!', 'Ocorreu um erro ao realizar a alteração.');

      setLoad('Salvar');
    }
  }

  const notify = (icon, type, title, message) => {
    let options = {
      place: 'tr',
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {" "}
            {title}
          </span>
          <span data-notify="message">
            {message}
          </span>
        </div>
      ),
      type: type,
      icon: icon,
      autoDismiss: 2
    };
    inputRef.current.notificationAlert(options);
  };

  return (
    <>
      <PageHeader name="Meu Perfil" parentName="Administradores" parentPath="admins" />

      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="card-frame">
          <CardBody>
            <Form onSubmit={handleEditAdmin}>
              <Row>
                <Col md="12" sm="12">
                  <FormGroup>
                    <label htmlFor="name">Nome</label>
                    <Input
                      id="name"
                      type="text"
                      onChange={e => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      type="email"
                      disabled
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="email">Data de admissão</label>
                    <Input
                      id="created_at"
                      type="text"
                      disabled
                      onChange={e => setCreatedAt(e.target.value)}
                      value={created_at}
                    />
                  </FormGroup>
                </Col>
              </Row>
                <Col className="mt-6">
                  <Button type="submit" color="default" block>{ load }</Button>
                </Col>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}
