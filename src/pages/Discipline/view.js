import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Button,
  Card,
  CardBody,
  Container,
  Col,
  Row,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  CardImg,
} from 'reactstrap';

import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';
import NotificationAlert from "react-notification-alert";

import api from '../../services/api';
import PageHeader from '../../components/PageHeader';

export default function ViewDiscipline({ match }) {
  const [disciplineName, setDisciplineName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [objectives, setObjectives] = useState('')
  const [price, setPrice] = useState('')
  const [about, setAbout] = useState('')

  const [sessions, setSessions] = useState([]);
  const [showSessions, setshowSessions] = useState(false);
  const [status_feedback, setFeedback] = useState('');
  const [load, setLoad] = useState("Salvar");
  const [loadDelete, setLoadDelete] = useState("Deletar");


  const inputRef = useRef('notificationAlert');
  const history = useHistory();

  const token = localStorage.getItem('token');
  const disciplineId = match.params.id;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`discipline/show/${disciplineId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })

        setDisciplineName(data.name)
        setDescription(data.description)
        setAbout(data.about)
        setObjectives(data.objectives)
        setPrice(data.price)
        setImage(data.image)
        setSessions(data.session)
      } catch (error) {
        console.log(error);
      }
    })();
  }, [])

  async function handleRemoveSession(sessionId) {

    try {
      await api.delete(`discipline/session/delete/${disciplineId}/${sessionId}`);

      setSessions(currentSession => currentSession.filter(item => item.id !== sessionId))
      notify("fas fa-check", "warning", "Sucesso! ", " Seção Excluída ");
    } catch (error) {
      console.log(error);
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao deletar seção.");
    }
  }

  const handleRemoveDiscipline = async (e) => {
    e.preventDefault();

    setLoadDelete(<Spinner color="#FFF" />);
    try {
      await api.delete(`discipline/delete/${disciplineId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      notify("fas fa-check", "warning", "Sucesso! ", " Disciplina Excluída ");

      setTimeout(() => history.goBack(), 3000)
    } catch (error) {
      console.log(error);
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao deletar disciplina.");
    }
    setLoadDelete("Deletar");
  }

  const notify = (icon, type, title, message) => {
    const options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span className="alert-title ml-2" data-notify="title">
            {title}
          </span>
          <span data-notify="message" className="ml-2">
            {message}
          </span>
        </div>
      ),
      type,
      icon,
      autoDismiss: 2,
    };
    inputRef.current.notificationAlert(options);
  };

  return (
    <>
      <PageHeader name="Nome da disciplina" parentName="Disciplinas" parentPath="discipline" />
      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="card-frame">
          <CardBody>
            <Form onSubmit={''}>
              <Row>
                <Col md="12" sm="12">
                  <img
                    alt="..."
                    className="img-center img-fluid shadow shadow-lg--hover"
                    src={image}
                    style={{ width: "300px", height: "250px", borderRadius: 3 }}
                  />
                </Col>
                <Col md="12" sm="12" className="mt-5">
                  <FormGroup>
                    <h3>Disciplina</h3>
                    <Input
                      id="name"
                      placeholder="Digite o nome da disciplina..."
                      type="text"
                      onChange={e => setDisciplineName(e.target.value)}
                      value={disciplineName}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3>Descrição</h3>
                    <Input
                      id="description"
                      type="text"
                      className="form-control-lg"
                      onChange={e => setDescription(e.target.value)}
                      value={description}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3>Sobre</h3>
                    <Input
                      id="description"
                      type="text"
                      onChange={e => setAbout(e.target.value)}
                      value={about}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3>Objetivos</h3>
                    <Input
                      id="description"
                      type="text"
                      onChange={e => setObjectives(e.target.value)}
                      value={objectives}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={2} sm={12}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>R$</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="description"
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
              </Row>
              <h3>Seções</h3>
              {sessions.map(item => (
                <Col md={5} className="mt-2">
                  <InputGroup>
                    <Input
                      value={item.name}
                      disabled
                      type="text"
                      />
                    <InputGroupAddon addonType="append">
                      <Button
                        color="primary"
                        outline
                        type="button"
                        onClick={() => history.push(`/discipline/session/${disciplineId}/${item.id}`)}
                      >
                        Editar
                      </Button>
                      <Button
                        className="btn btn-icon btn-danger btn2"
                        onClick={() => handleRemoveSession(item.id)}
                      >
                      <span className="btn-inner--icon">
                        <i class="fas fa-trash" />
                      </span>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </Col>
              ))}
              <Col md="12" sm="12" className="mt-2">
                <Button
                  color="primary"
                  outline
                  type="button"
                  onClick={() => history.push(`/discipline/session/${disciplineId}/0`)}
                >
                  Criar Seção
                </Button>
              </Col>
              <Col className="mt-6">
                <Button type="submit" color="default" block>{ load }</Button>
              </Col>
              <Col className="mt-6 d-flex justify-content-end">
                <Button type="button" color="danger" onClick={handleRemoveDiscipline}>{ loadDelete }</Button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
