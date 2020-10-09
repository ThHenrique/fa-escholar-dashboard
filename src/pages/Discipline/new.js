import React, { useState, useRef, useEffect} from 'react';

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

import { useHistory } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';


export default function NewDiscipline() {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Salvar');
  const [section, setSection] = useState([])
  const [cont, setCont] = useState(0)

  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    setSection(cont)
  }, [cont])

  async function handleNewDiscipline(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name,
      last_name,
      email,
      password
    }

    try {
      await api.post('admin/users', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      notify('fas fa-check', 'success', 'Sucesso!', 'Administrador cadastrado');

      setTimeout(function(){ 
        history.push('/admins');
      }, 3000);
    } catch (err) {
      console.error(err);

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
      <PageHeader name="Nova Disciplina" parentName="Disciplinas" parentPath="discipline" />
      
      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="card-frame">
          <CardBody>
            <Form onSubmit={handleNewDiscipline}>
              <Row>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3 >Disciplina</h3>
                    <Input
                      id="name"
                      placeholder="Digite o nome da disciplina..."
                      type="text"
                      onChange={e => setName(e.target.value)}
                      value={name}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12"> 
                  <FormGroup>
                    <label htmlFor="description">Descrição</label>
                    <Input 
                      type="text"
                      name="description"                      
                      className="form-control-lg"
                      placeholder="Adicione uma descrição"
                      id="description"
                      required
                    />
                  </FormGroup>  
                </Col>
                <Col md="12" sm="12" className="ml-3">
                  <Row className="align-items-center">
                    <Button
                      className="btn btn-icon-only"
                      color="success"
                      type="button"
                      onClick={() => {setCont++}}
                    >
                      <i className="ni ni-fat-add"/>
                    </Button>
                    <h3>Adicionar seção</h3>                       
                  </Row>                   
                </Col>
                {section.map(item => (
                  <>
                    <h3>Teste</h3>
                    <Col md="12" sm="12" className="ml-3"></Col>
                  </>
                ))}
                
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
