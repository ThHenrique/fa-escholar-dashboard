import React, { useState, useEffect, useRef } from "react";
import {useHistory} from "react-router-dom";

import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";

import { Spinner } from "react-activity";
import NotificationAlert from "react-notification-alert";
import PageHeader from "../../components/PageHeader";
import LessonCard from "../../components/LessonCard";

import { produce } from 'immer'
import {generate} from 'shortid'

import api from "../../services/api";

export default function Session({ match }) {
  const disciplineId = match.params.id;
  const token = localStorage.getItem("token");

  const [load, setLoad] = useState('Criar Seção');

  const inputRef = useRef("notificationAlert");
  const history = useHistory();
  const [addLesson, setAddLesson] = useState(false);
  const [createSession, setCreateSession] = useState(false);

  const [sessionId, setSessionId] = useState();
  const [name, setName] = useState("");

  const [lessons, setLessons] = useState([]);
  const [lesson, setLesson] = useState([]);

  useEffect(() => {
    if (match.params.sessionId != 0) {
      setSessionId(match.params.sessionId)
      getSession()
    }
  }, [addLesson, match])

  const getSession = async () => {
    try {
      const {data} = await api.get(`discipline/session/lesson/${disciplineId}`, {
        headers: {
          session_id: match.params.sessionId,
          Authorization: `Bearer ${token}`
        }
      })
      if (data) setCreateSession(true)
      setName(data.name)
      setLessons(data.lesson)

    } catch (error) {
      console.log(`${error} aaaaaa`);
    }
  }

  const handleLesson = (lesson) => {
    if (match.params.sessionId != 0) getSession()
    setAddLesson(false)
    setLesson(lesson);
    setAddLesson(true)
  }

  async function handleSession(e) {
    e.preventDefault();
    setLoad(<Spinner color="#FFF" />);

    try {
      const response = await api.post(`discipline/create/session/${disciplineId}`, {name}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        notify("fas fa-check", "success", "Sucesso!", "Seção cadastrada");
        setSessionId(response.data.id);
        setTimeout(() => setCreateSession(true), 3000);
      }
    } catch (e) {
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao cadastrar seção.");
      setLoad('Criar Seção');
    }
  }

  async function handleRemoveLesson(lessonId) {
    try {
      await api.delete(`discipline/session/lesson/delete/${disciplineId}/${sessionId}/${lessonId}`);

      setLessons(currentSession => currentSession.filter(item => item.id !== lessonId))
      notify("fas fa-check", "warning", "Sucesso! ", " Aula Excluída ");
    } catch (error) {
      console.log(error);
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao deletar aula.");
    }
  }

  const notify = (icon, type, title, message) => {
    const options = {
      place: "tr",
      message: (
        <div className="alert-text">
          <span className="alert-title ml-2" data-notify="title">
            {" "}
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
      <PageHeader name="Seção" parentName="Disciplinas" parentPath={`discipline/${disciplineId}`} />
      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <Form role="form" onSubmit={handleSession}>
              <FormGroup>
                <h3>
                  Seção
                </h3>
                <InputGroup>
                  <Input
                    id="sessionName"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    placeholder="Digite o nome da seção..."
                    type="text"
                    name="name"
                    required
                  />
                  <InputGroupAddon addonType="append">
                  {!createSession ?
                      <Button type="submit" outline color="primary">{ load }</Button>
                  :
                    <Button
                      color="primary"
                      outline
                      type="button"
                      onClick={() => handleLesson(null)}
                    >
                      Adicionar aula
                    </Button>
                  }
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              <h3>Aulas Cadastradas</h3>
              {lessons.map(item => (
                <div  key={item.id}>
                  <Col md={5} className="mt-1">
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
                          onClick={() => handleLesson(item)}
                        >
                          Editar
                        </Button>
                        <Button
                          className="btn btn-icon btn-danger btn2"
                          onClick={() => handleRemoveLesson(item.id)}
                        >
                        <span className="btn-inner--icon">
                          <i class="fas fa-trash" />
                        </span>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </div>
              ))}
            </Form>
            {addLesson &&
              <LessonCard disciplineId={disciplineId} sessionId={sessionId} lesson={lesson} />
            }
          </CardHeader>
        </Card>
      </Container>
    </>
  );
}
