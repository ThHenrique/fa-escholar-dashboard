import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
  Form,
  FormGroup,
  Input,
  InputGroup,
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
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [status_feedback, setFeedback] = useState('');
  const [load, setLoad] = useState("Salvar");

  const inputRef = useRef('notificationAlert');
  const history = useHistory();

  const [lesson, setLesson] = useState([{
    name: "",
    description: ""
  }]);

  const [session, setSession] = useState([{
    name: "",
    lesson
  }]);

  const [discipline, setDiscipline] = useState({
    name: "",
    description: "",
    session,
  });

  const updateField = (e) => {
    const { id, value } = e.target;
    setDiscipline(prevState => ({
      ...prevState,
      [id]: value
    }))
  };

  async function handleNewDiscipline(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    // notify("fas fa-check", "success", "Sucesso!", "Administrador cadastrado");

    // notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao realizar o cadastro.");

    setLoad("Salvar");
  }

  async function handleImage(event) {
    // console.log(event);
    const { target } = event;

    console.log(event.target.files[0].size);
    console.log(event.target.files[0]);

    if (images.length >= 10 && target.value.length > 0) {
      return alert("Número máximo de fotos Atingido(10/10)");
    }

    if (target.value.length > 0 && event.target.files[0].size <= 5000000) {
      setImages([...images, event.target.files[0]]);
    } else {
      event.target.value = null;
    }
  }

  async function removeImage(index) {
    if (images.length === 1) {
      return setImages([]);
    }

    const pivot = images.filter((item, iterableIndex) => index !== iterableIndex);
    return setImages(pivot);
  }

  const Sessions = (props) => {
    return (
      <Col md="12" sm="12">
      <FormGroup>
        <h3>
          Sessão{" "}
          {props.index}
        </h3>
        <InputGroup>
          <Input
            id="sessionName"
            onChange={updateField}
            value={discipline.session.name}
            placeholder="Digite o nome da seção..."
            type="text"
            name="description"
            required
          />
          <InputGroupAddon addonType="append">
            <Button
              color="primary"
              outline
              type="button"
              onClick={e => {
                setLesson([
                  ...lesson,
                  {name: ""}
                ])
              }}
            >
              Adicionar aula
            </Button>
            <Button
              className="btn btn-icon btn-danger btn2"
              onClick={(e) => {
                const pivot = session.filter((item, iterableIndex) => props.index !== iterableIndex);
                setSession(pivot);
              }}
            >
              <span className="btn-inner--icon">
                <i className="fas fa-trash" />
              </span>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>
      {lesson.map((item, index) => (
        <Lesson index={index}/>
      ))}
      </Col>
    );
  };

  const Lesson = (props) => {
    return (
      <>
        <Col md="12" sm="12">
          <FormGroup>
            <h3>Aula</h3>
            <InputGroup>
              <Input
                id="nameLession"
                value={lesson.name}
                //onChange={e => setLessonName(e.target.value)}
                placeholder="Digite o nome da Aula..."
                type="text"
              />
              <InputGroupAddon addonType="append">
                <UncontrolledDropdown  group>
                  <DropdownToggle
                    color="primary"
                    outline
                    style={{borderRadius: 0}}
                    className="btn2"
                  >
                    Adicionar Conteúdo
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem
                      onClick={e => e.preventDefault()}
                    >
                      <i className="ni ni-single-copy-04" />
                      <span>Documento</span>
                    </DropdownItem>
                    <DropdownItem>
                      <Button
                        className="button1"
                        color="#1B4263"
                        type="button"
                        tag="label"
                      >
                      <i className="ni ni-button-play" />
                      <span>Vídeo / Aúdio / Imagens </span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        accept="image/*"
                        inputProps={{ accept: "image/*" }}
                        multiple
                        name="image[]"
                        onChange={(event) => handleImage(event)}
                        />
                      </Button>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                <Button
                  className="btn btn-icon btn-danger btn2"
                  onClick={() => {
                    const pivot = lesson.filter((item, iterableIndex) => props.index !== iterableIndex);
                    setLesson(pivot);
                  }}
                >
                  <span className="btn-inner--icon">
                    <i class="fas fa-trash" />
                  </span>
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <InputGroup className="mt-3">
              <Input
                placeholder="Descrição e/ou comentários da aula..."
                value={lesson.description}
                type="textarea"
              />
            </InputGroup>
            <Col>
              <Button
                className="button1"
                color="#1B4263"
                type="button"
                tag="label"
              >
                Adicionar Foto ({images.length}/10)
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                  inputProps={{ accept: "image/*" }}
                  multiple
                  name="image[]"
                  onChange={(event) => handleImage(event)}
                />
              </Button>
            </Col>
          </FormGroup>
        </Col>
        <Row>
          {images.map((file, index) => (
            <Images file={file} index={index}/>
          ))}
        </Row>
      </>
    )
  }

  const Images = (props) => {
    return (
      <>
        <Card
          style={{ width: "100%" }}
          style={{ marginLeft: 2, marginTop: 15 }}
        >
          <CardImg
            key={props.file}
            id="background"
            className={props.images ? "has-background" : ""}
            style={{
              backgroundImage: `url(${URL.createObjectURL(props.file)})`,
              minHeight: 180,
              width: "100%",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardBody className="text-center">
            <Button
              onClick={() => removeImage(props.index)}
              className="btn btn-danger"
            >
              Remover
            </Button>
          </CardBody>
        </Card>
        <div
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}>
          {props.file.name}
        </div>
      </>
    );
  }

  useEffect(() => {

  }, []);

  const notify = (icon, type, title, message) => {
    const options = {
      place: 'tr',
      message: (
        <div className="alert-text">
          <span className="alert-title" data-notify="title">
            {' '}
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

  async function handleApprove() {
    setLoad(<Spinner color="#FFF" />);

  }

  async function handleReprove() {
    setModal(!modal);
  }

  async function handleReproveSubmit(e) {
    e.preventDefault();

    const data = { status_feedback, status: 2 };
  }

  return (
    <>
      <PageHeader name="Nome da disciplina" parentName="Disciplinas" parentPath="discipline" />
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
                    <h3>Disciplina</h3>
                    <Input
                      id="name"
                      placeholder="Digite o nome da disciplina..."
                      type="text"
                      onChange={updateField}
                      value={discipline.name}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3>Descrição</h3>
                    <Input
                      id="description"
                      placeholder="Adicione uma descrição"
                      type="text"
                      className="form-control-lg"
                      onChange={updateField}
                      value={discipline.description}
                      required
                    />
                  </FormGroup>
                </Col>
                {session.map((item, index) => (
                  <Sessions index={index}/>
                ))}
                <Col md="12" sm="12" className="ml-3">
                  <Row className="align-items-center">
                    <Button
                      className="btn btn-icon-only"
                      color="success"
                      type="button"
                      onClick={e => {
                        setSession([
                          ...session,
                          {name: ""}
                        ])
                      }}
                    >
                      <i className="ni ni-fat-add" />
                    </Button>
                    <h3>Adicionar seção</h3>
                  </Row>
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
  );
}
