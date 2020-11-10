import React, { useState, useEffect } from "react";
import { produce } from 'immer'
import {generate} from 'shortid'

import { Spinner, Dots, Windmill } from "react-activity";
import {
  Button,
  Card,
  CardHeader,
  FormGroup,
  Form,
  FormFeedback,
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

import api from "../../../services/api";
import { get } from "lodash";
import { getDefaultFormatCodeSettings } from "typescript";

export default function SessionModal({ path }) {
  const [name, setName] = useState("");
  const [images, setImages] = useState([]);
  const [lesson, setLesson] = useState([{
    id: generate(),
    lessonName: '',
    files: [],
    description: ''
  }]);
  const [load, setLoad] = useState('Salvar');

  const token = localStorage.getItem("token");


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

  async function handleImage(event, props) {
    const { target } = event;

    console.log(event.target.files[0].size);
    console.log(event.target.files[0]);

    if (images.length >= 10 && target.value.length > 0) {
      return alert("Número máximo de fotos Atingido(10/10)");
    }

    if (target.value.length > 0 && event.target.files[0].size <= 5000000) {
      setImages([...images, event.target.files[0]]);
      // setLesson(currentLesson => [
      //   currentLesson.map(lesson => lesson.id === props.id ? lesson.files.push(images) : lesson)
      // ])

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

  const Lesson = (props) => {
    return (
      <>
        <Col md="12" sm="12">
          <FormGroup >
            <h3>Aula</h3>
            <InputGroup>
              <Input
                placeholder="Digite o nome da Aula..."
                type="text"
                value={props.lesson.lessonName}
                onChange={e => {
                  const lessonName = e.target.value;
                  setLesson(currentLesson =>
                    produce(currentLesson, v => {
                      v[props.index].lessonName = lessonName;
                    })
                  )
                }}
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
                    setLesson(currentLesson => currentLesson.filter(item => item.id !== props.lesson.id))
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
                value={props.lesson.description}
                onChange={e => {
                  const description = e.target.value;
                  setLesson(currentLesson =>
                    produce(currentLesson, v => {
                      v[props.index].description = description;
                    })
                  )
                }}
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
          {/* {lesson.files.map((file, index) => (
            <Images file={file} index={index}/>
          ))} */}
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


  return (
    <>
      <div className="modal-body p-0">
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
                            description: ''
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
                            setLesson(currentLesson => currentLesson.filter(item => item.id !== props.id))
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
                    <Col>
                      <Button
                        className="button1"
                        color="#1B4263"
                        type="button"
                        tag="label"
                      >
                        Adicionar Foto ({props.files.length}/10)
                        <input
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*"
                          inputProps={{ accept: "image/*" }}
                          multiple
                          name="image[]"
                          onChange={(event) => handleImage(event, props)}
                        />
                      </Button>
                    </Col>
                    {/* {props.files.map((file, index) => (
                      <Images file={file} index={index}/>
                    ))} */}
                  </FormGroup>
                </div>
              ))}
              <div>{JSON.stringify(lesson, null, 2)}</div>
              <Col className="mt-6">
                <Button type="submit" color="default" block>{ load }</Button>
              </Col>
            </Form>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}
