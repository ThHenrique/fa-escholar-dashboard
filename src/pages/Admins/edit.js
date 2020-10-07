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

export default function EditAdmin({ match }) {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Salvar');

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');
  const adminId = match.params.id;
 
  useEffect(() => {
      api.get(`admin/users/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => {
        const status = response.status;

        if (status === 200) {
          setName(response.data.name);
          setLastName(response.data.last_name);
          setEmail(response.data.email);
          setPassword(response.data.password);
        } else {
          history.push('/admins');
        }
      })
      
  }, [token]);

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
      <PageHeader name="Editar administrador" parentName="Administradores" parentPath="admins" />

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
                    <label htmlFor="password">Senha</label>
                    <Input
                      id="password"
                      placeholder="Senha"
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col>
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