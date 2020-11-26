import React, { useState, useRef, useEffect } from "react";
import {useHistory} from "react-router-dom";

import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
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
  Modal
} from "reactstrap";

import NotificationAlert from "react-notification-alert";
import { Spinner } from "react-activity";
import "../../assets/css/react-activity.css";
// import Carousel from "react-multi-carousel";
import api from "../../services/api";
import PageHeader from "../../components/PageHeader";

import "react-multi-carousel/lib/styles.css";

export default function NewDiscipline() {
  const [load, setLoad] = useState("Criar Disciplina");
  const [images, setImages] = useState([]);
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [objectives, setObjectives] = useState('')
  const [price, setPrice] = useState('')
  const [about, setAbout] = useState('')
  const [file, setFile] = useState()
  const inputRef = useRef("notificationAlert");
  const [sessionModal, setSessionModal] = useState(true);

  const history = useHistory();
  const token = localStorage.getItem("token");

  async function handleNewDiscipline(e) {
    e.preventDefault();

    setLoad(<Spinner color="#FFF" />);

    const data = {
      name,
      description,
      about,
      price,
      objectives
    }
    try {
      const response = await api.post('discipline/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      handleImage(response.data.id);

    } catch (error) {
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao realizar o cadastro.");
    }
    setLoad("Salvar");
  }

  const handleImage = async (id) => {
    setLoad(<Spinner color="#FFF" />);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post(`discipline/image/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        }
      })

      notify("fas fa-check", "success", "Sucesso!", "Disciplina cadastrada");
      setTimeout(() => history.push(`/discipline/session/${id}/0`), 3000)


    } catch (error) {
      console.log(error);
      notify("fas fa-times", "danger", "Erro!", "Ocorreu um erro ao enviar a capa.");
    }
    setLoad("Salvar");
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
          <CardImg
            key={props.file}
            id="background"
            className={props.images ? "has-background" : ""}
            style={{
              backgroundImage: `url(${URL.createObjectURL(props.file)})`,
              minHeight: 180,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          />
          <CardBody className="text-center">
            <Button
              onClick={() => setFile()}
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
                    <h3>Disciplina</h3>
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
                    <h3>Descrição</h3>
                    <Input
                      id="description"
                      placeholder="Adicione uma descrição"
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
                      id="about"
                      type="text"
                      placeholder="Fale um pouco sobre essa disciplina"
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
                      id="objectives"
                      type="text"
                      placeholder="Informe os objetivos..."
                      onChange={e => setObjectives(e.target.value)}
                      value={objectives}
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md={2} sm={12}>
                  <FormGroup>
                    <h3>Valor</h3>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>R$</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="price"
                        placeholder="00,00"
                        type="text"
                        onChange={e => setPrice(e.target.value)}
                        value={price}
                        required
                      />
                    </InputGroup>
                  </FormGroup>
                </Col>
                <Col md={12} sm={12}>
                  <FormGroup>
                    <h3>Capa</h3>
                    <Button
                      color="primary"
                      outline
                      type="button"
                      tag="label"
                    >
                      <span>Adicione uma capa</span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          setFile(file)
                        }}
                      />
                    </Button>
                  </FormGroup>
                </Col>
                <Col md={4} sm={12}>
                  {file && (
                    <File file={file}/>
                  )}
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
