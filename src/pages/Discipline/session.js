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

import ReactPlayer from 'react-player'
import { Spinner } from "react-activity";
import NotificationAlert from "react-notification-alert";
import PageHeader from "../../components/PageHeader";

import { produce } from 'immer'
import {generate} from 'shortid'

import api from "../../services/api";

export default function Session({ match }) {
  const disciplineId = match.params.id;
  const token = localStorage.getItem("token");

  const [load, setLoad] = useState('Salvar');

  const inputRef = useRef("notificationAlert");
  const history = useHistory();

  const [name, setName] = useState("");
  const [lesson, setLesson] = useState([{
    id: generate(),
    lessonName: '',
    description: '',
    files: null,
  }]);

  async function handleSession(e) {
    e.preventDefault();
    setLoad(<Spinner color="#FFF" />);

    const data = { name, lesson }

    try {
      const response = await api.post(`discipline/create/session/${disciplineId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        notify("fas fa-check", "success", "Sucesso!", "Seção cadastrada");
        setTimeout(() => history.goBack(), 3000);
      }
    } catch (e) {
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao realizar o cadastro.");
      setLoad('Salvar');
    }
  }

  async function removeImage(index) {
    setLesson(currentLesson =>
      produce(currentLesson, v => {
        v[index].files = null;
      })
    )
  }

  const notify = (icon, type, title, message) => {
    const options = {
      place: "tr",
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
      type,
      icon,
      autoDismiss: 2,
    };
    inputRef.current.notificationAlert(options);
  };

  const File = (props) => {
    return (
      <>
        <Card>
          {props.file.type != 'video/mp4' ? (
            <CardImg
              key={props.file}
              id="background"
              className={props.images ? "has-background" : ""}
              style={{
                backgroundImage: `url(${URL.createObjectURL(props.file)})`,
                minHeight: 180,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
              }}
              />
          ):(
            <ReactPlayer controls url={URL.createObjectURL(props.file)} />
          )}
          <CardBody className="text-center">
            <Button
              onClick={() => removeImage(props.index)}
              className="btn btn-danger"
            >
              Remover
            </Button>
          </CardBody>
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}>
            {props.file.name}
          </div>
        </Card>
      </>
    );
  }


  return (
    <>
      <PageHeader name="Seção" parentName="Disciplinas" parentPath="discipline" />
      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <Form role="form" onSubmit={handleSession}>
              <FormGroup>
                <h3>
                  Sessão
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
                    <Button
                      color="primary"
                      outline
                      type="button"
                      onClick={() => {
                        setLesson(prevLesson => [
                          ...prevLesson,
                          {
                            id: generate(),
                            lessonName: '',
                            description: '',
                            files: null
                          }
                        ])
                      }}
                    >
                      Adicionar aula
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
              {lesson.map((props, index) => (
                <div key={props.id}>
                  <FormGroup >
                    <h3>Aula</h3>
                    <InputGroup>
                      <Input
                        placeholder="Digite o nome da Aula..."
                        type="text"
                        value={props.lessonName}
                        onChange={e => {
                          const lessonName = e.target.value;
                          setLesson(currentLesson =>
                            produce(currentLesson, v => {
                              v[index].lessonName = lessonName;
                            })
                          )
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <Button
                          color="primary"
                          outline
                          type="button"
                          tag="label"
                        >
                          <span>Adicionar Conteúdo</span>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              setLesson(currentLesson =>
                                produce(currentLesson, v => {
                                  v[index].files = file;
                                })
                              )
                            }}
                          />
                        </Button>
                        <Button
                          className="btn btn-icon btn-danger btn2"
                          onClick={() => {
                            setLesson(currentLesson => currentLesson.filter(item => item.id !== props.id))
                          }}
                        >
                          <span className="btn-inner--icon">
                            <i class="fas fa-trash" />
                          </span>
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                    {props.files !== null && (
                      <Row className="justify-content-center mt-3">
                        <File file={props.files} index={index}/>
                      </Row>
                    )}
                    <InputGroup className="mt-3">
                      <Input
                        placeholder="Descrição e/ou comentários da aula..."
                        value={props.description}
                        onChange={e => {
                          const description = e.target.value;
                          setLesson(currentLesson =>
                            produce(currentLesson, v => {
                              v[index].description = description;
                            })
                          )
                        }}
                        type="textarea"
                      />
                    </InputGroup>
                  </FormGroup>
                </div>
              ))}
              <Col className="mt-6">
                <Button type="submit" color="default" block>{ load }</Button>
              </Col>
            </Form>
          </CardHeader>
        </Card>
      </Container>
    </>
  );
}
