import React, { useState, useEffect } from "react";
import { produce } from 'immer'
import {generate} from 'shortid'
import ReactPlayer from 'react-player'
import { Spinner, Dots, Windmill } from "react-activity";
import {
  Container,
  Button,
  Card,
  CardHeader,
  FormGroup,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardImg,
  CardBody,
  Row
} from "reactstrap";

import api from "../../services/api";
import { get } from "lodash";
import { getDefaultFormatCodeSettings } from "typescript";
import PageHeader from "../../components/PageHeader";

export default function EditSession({ match }) {
  const [name, setName] = useState("");
  const [lesson, setLesson] = useState([{
    id: generate(),
    lessonName: '',
    description: '',
    files: null,
  }]);
  const [load, setLoad] = useState('Salvar');

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(match.state);
  }, [])

  async function handleLogin(e) {
    e.preventDefault();
    setLoad(<Spinner color="#FFF" />);

    const data = {}

    try {
      const response = await api.post(`/sessions`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setTimeout(() => setLoad('Salvar'), 3000);
      }
    } catch (e) {
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
        <Card className="bg-secondary shadow border-0">
          <CardHeader>
            <Form role="form">
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
