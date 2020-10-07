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
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Salvar');

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');
  const adminId = match.params.id;
  
  async function handleEditAdmin(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name,
      last_name,
      email,
      password
    }

    try {
      await api.put(`admin/users/${adminId}`, data, {
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
                <Col md="6" sm="12">
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
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="last_name">Sobrenome</label>
                    <Input
                      id="last_name"
                      placeholder="Sobrenome"
                      type="text"
                      onChange={e => setLastName(e.target.value)}
                      value={last_name}
                      required
                    />
                  </FormGroup>
                </Col>
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
                    <label htmlFor="password">CPF</label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      type="text"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="email">Data de Nascimento</label>
                    <Input
                      id="birthday"
                      placeholder="08/11/2001"
                      type="text"
                      onChange={e => setEmail(e.target.value)}
                      value={email}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="password">Celular / WhatApp</label>
                    <Input
                      id="cellphone"
                      placeholder="(00) 9 9152-2542"
                      type="text"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <Row>               
                    <Col md="6" sm="12">               
                      <FormGroup>
                        <label htmlFor="email">CEP</label>
                        <Input
                          id="zip_code"
                          placeholder="00000-027"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <label htmlFor="email">Endereço</label>
                        <Input
                          id="address"
                          placeholder="R. Morumbi"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>                             
                  </Row>
                </Col>
                
                <Col md="6" sm="12">
                  <Row>               
                    <Col md="6" sm="12">               
                      <FormGroup>
                        <label htmlFor="email">Número</label>
                        <Input
                          id="number"
                          placeholder="Número"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <label htmlFor="email">Complemento</label>
                        <Input
                          id="complement"
                          placeholder="Atrás da árvore"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>                             
                  </Row>
                </Col>
                <Col md="6" sm="12">
                  <FormGroup>
                    <label htmlFor="password">Cidade</label>
                    <Input
                      id="city"
                      placeholder="Sanja City"
                      type="text"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="12">
                  <Row>               
                    <Col md="6" sm="12">               
                      <FormGroup>
                        <label htmlFor="email">Bairro</label>
                        <Input
                          id="neighborhood"
                          placeholder="Residencial das residencia"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" sm="12">
                      <FormGroup>
                        <label htmlFor="email">UF</label>
                        <Input
                          id="state"
                          placeholder="SP"
                          type="text"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                          required
                        />
                      </FormGroup>
                    </Col>                             
                  </Row>
                </Col>
                <Col className="mt-6">
                  <Button type="submit" color="default" block>{ load }</Button>
                </Col>
              </Row>  
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}