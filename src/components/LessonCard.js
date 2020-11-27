import React, {useState, useEffect, useRef} from 'react';

import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Container
} from "reactstrap";

import { Spinner } from "react-activity";
import ReactPlayer from 'react-player'
import NotificationAlert from "react-notification-alert";
import api from "../services/api";


export default function LessonCard({ sessionId, disciplineId, lesson }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [load, setLoad] = useState('Criar Aula');
  const [typeFile, setTypeFile] = useState('')
  const [typeOf, setTypeOf] = useState(null)
  const inputRef = useRef("notificationAlert");
  const token = localStorage.getItem("token");

  useEffect(() => {
    setName('');
    setDescription('');
    setFiles(null)
    setTypeOf(null)
    if (lesson) {
      setLoad('Salvar Alterações')
      setName(lesson.name);
      setDescription(lesson.description);
      setTypeOf(typeof(lesson.url))
      setFiles(lesson.url)
      let type = lesson.url.substr(-4)
      setTypeFile(type)
    }
  }, [lesson])

  const File = (props) => {
    if (typeOf == 'object')
      return (
        <>
          <Card>
            <>
              {(props.file.type == 'image/jpeg' || props.file.type == 'image/png') ? (
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
              ) : (
                <ReactPlayer controls url={URL.createObjectURL(props.file)} />
              )}
              <div
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}>
                {props.file.name}
              </div>
            </>
            <CardBody className="text-center">
              <Button
                onClick={() => setFiles(null)}
                className="btn btn-danger"
              >
                Remover
              </Button>
            </CardBody>

          </Card>
        </>
      );
    else
      return (
      <Card>
        {typeFile != '.mp4' ? (
          <Col md="12" sm="12">
            <img
              alt="..."
              className="img-center img-fluid shadow shadow-lg--hover"
              src={props.file}
              style={{ width: "300px", height: "250px", borderRadius: 3 }}
            />
          </Col>
        ) : (
          <Col md="12" sm="12">
            <ReactPlayer controls url={props.file} />
          </Col>
        )}
        <CardBody className="text-center">
          <Button
            onClick={() => setFiles(null)}
            className="btn btn-danger"
          >
            Remover
          </Button>
        </CardBody>
      </Card>
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

  const handleLesson = async (e) => {
    e.preventDefault();
    setLoad(<Spinner color="#FFF" />);

    try {
      const data = {
        session_id: sessionId,
        name,
        description
      }
      const response = await api.post(`discipline/session/lesson/create/${disciplineId}`, data, {
        headers: {  Authorization: `Bearer ${token}` }
      })

      if (response.status === 200) handleFile(response.data.id)
    } catch (error) {
      console.log(error);
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao cadastrar aular.");
    }
  }

  const handleFile = async (id) => {
    try {
      const formData = new FormData();
      formData.append('file', files);

      const response = await api.post(`discipline/session/lesson/file/${disciplineId}`, formData, {
        headers: {
          session_id: sessionId,
          lesson_id: id,
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      })

      if (response.status === 200) notify("fas fa-check", "success", "Sucesso!", "Aula cadastrada");
    } catch (error) {
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao enviar arquivo.");
    }
    setLoad('Criar Aula');
  }

  return (
    <>
      <div className="rna-wrapper">
        <NotificationAlert ref={inputRef} />
      </div>
      <Form onSubmit={handleLesson} className="mt-3">
        <FormGroup >
          <h3>Aula</h3>
          <InputGroup>
            <Input
              placeholder="Digite o nome da Aula..."
              type="text"
              value={name}
              onChange={e => {
                const lessonName = e.target.value;
                setName(lessonName)
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
                    setTypeOf(typeof(file))
                    setFiles(file)
                  }}
                />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {files !== null && (
            <Row className="justify-content-center mt-3">
              <File file={files} />
            </Row>
          )}
          <InputGroup className="mt-3">
            <Input
              placeholder="Descrição e/ou comentários da aula..."
              value={description}
              onChange={e => {
                const description = e.target.value;
                setDescription(description);
              }}
              type="textarea"
            />
          </InputGroup>
        </FormGroup>
        {lesson ? (
          <Col className="mt-2 mb-2 justify-content-center d-flex">
            <Button type="submit" color="default">{ load }</Button>
          </Col>
        ):(
          <Col className="mt-2 mb-2 justify-content-center d-flex">
            <Button type="submit" color="default">{ load }</Button>
          </Col>
        )}
      </Form>
    </>
  )
}
