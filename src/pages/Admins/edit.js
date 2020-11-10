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
} from "reactstrap";

import NotificationAlert from "react-notification-alert";
import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';

import api from '../../services/api';

import PageHeader from "../../components/PageHeader";

export default function EditAdmin({ match }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Editar');

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');
  const adminId = match.params.id;

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`admin/show/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);

      } catch (error) {
        console.log(error);
        history.push('/admins');
      }
    })();
  }, [adminId]);

  async function handleEditAdmin(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name,
    }

    try {
      await api.put(`admin/update/${adminId}`, data, {
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
              <Col md="6" sm="12">
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
              {/* <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="role">Nível de acesso</label>
                  <Input id="role" type="select">
                    <option>operador</option>
                    <option>administrador</option>
                  </Input>
                </FormGroup>
              </Col> */}
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
