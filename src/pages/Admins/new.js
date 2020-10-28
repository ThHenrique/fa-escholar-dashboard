import React, { useState, useRef }  from "react";
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

export default function NewAdmin() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Cadastrar');

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');

  async function handleNewAdmin(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name,
      email,
      password,
      role: "manager",
    }

    try {
      await api.post('adminAuth/signUp', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notify('fas fa-check', 'success', 'Sucesso!', 'Administrador cadastrado');

      setTimeout(function(){
        history.push('/admins');
      }, 3000);
    } catch (err) {
      console.log(err);

      notify('fas fa-times', 'danger', 'Erro!', 'Ocorreu um erro ao realizar o cadastro.');

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
      <PageHeader name="Novo administrador" parentName="Administradores" parentPath="admins" />

      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="card-frame">
          <CardBody>
            <Form onSubmit={handleNewAdmin}>
              <FormGroup>
                <label htmlFor="name">Nome</label>
                <Input
                  id="name"
                  placeholder="Nome"
                  type="text"
                  onChange={e => setName(e.target.value)}
                  value={name}
                  required
                />
              </FormGroup>
              <Row>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <Input
                      id="email"
                      placeholder="Email"
                      type="email"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      required
                      />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="password">Senha</label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      onChange={e => setPassword(e.target.value)}
                      value={password}
                      required
                      />
                  </FormGroup>
                </Col>
              </Row>
              <Col className="mt-6 d-flex justify-content-center">
                <Button type="submit" color="default">{ load }</Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}
