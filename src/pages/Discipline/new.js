import React, { useState, useRef, useEffect} from 'react';

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
  UncontrolledCollapse,
  DropdownItem,
  DropdownMenu,
  Collapse,
  DropdownToggle,
  CardImg
} from "reactstrap";

import { useHistory } from "react-router-dom";
import NotificationAlert from "react-notification-alert";
import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';
import api from '../../services/api';
import PageHeader from '../../components/PageHeader';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function NewDiscipline() {
  const [discipline, setDiscipline] = useState({
    name : "",
    description : "",
    session : [{
      name : "",
      lesson : [{
        name : "",
        description : "",
      }]
    }]
  })

  const updateField = e => {
    console.log(e.target.name);
    setDiscipline({
      ...discipline,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    console.log(`${discipline.name} MUDOU`);
  }, [discipline.name])

  const [name, setName] = useState('');

  const [nameDiscipline, setNameDiscipline] = useState('');
  const [lessonName, setLessonName] = useState('');
  const [sessionName, setSessionName] = useState('');

  const [descriptionDiscipline, setDescriptionDiscipline] = useState('');


  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [load, setLoad] = useState('Salvar');
  const [section, setSection] = useState([])
  const [cont, setCont] = useState(0)
  const [contAula, setContAula] = useState(0)
  const [images, setImages] = useState([]);
  const inputRef = useRef('notificationAlert');

  const history = useHistory();

  const token = localStorage.getItem('token');

  useEffect(() => {
    //setSection(cont)
    // setSection(section.push(cont))
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

  async function handleImage(event) {
    console.log(event);
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

    let pivot = images.filter((item, iterableIndex) => index !== iterableIndex);
    setImages(pivot);
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const printValues = e => {
    e.preventDefault();
    console.log(discipline.name);
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
            <Form onSubmit={printValues}>
              <Row>
                <Col md="12" sm="12">
                  <FormGroup>
                    <h3 >Disciplina</h3>
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
                    <label htmlFor="description">Descrição</label>
                    <Input 
                      id="description"
                      placeholder="Adicione uma descrição"
                      type="text"
                      name="description"                      
                      className="form-control-lg"
                      onChange={e => setDescriptionDiscipline(e.target.value)}
                      value={descriptionDiscipline}
                      required
                    />
                  </FormGroup>  
                </Col>                
                {Array(cont).fill().map(item => (    
                  <>
                    <Col md="12" sm="12">                    
                      <FormGroup>
                        <h3>Seção {cont}</h3>                        
                          <InputGroup>
                            <Input 
                              id="sessionName"
                              onChange={e => setSessionName(e.target.value)}
                              value={sessionName}
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
                                onClick={() => setContAula(contAula + 1)}
                              >
                                Adicionar aula
                              </Button>
                              <Button
                                className="btn btn-icon btn-danger btn2"
                                onClick={() => {setCont(cont - 1)}}                                
                              >
                                <span className="btn-inner--icon">
                                  <i class="fas fa-trash" />
                                </span>
                              </Button>
                            </InputGroupAddon>
                          </InputGroup>
                      </FormGroup>                 
                    </Col>
                    {Array(contAula).fill().map(item => (  
                      <>
                        <Col md="12" sm="12">                    
                          <FormGroup>
                            <h3>Aula</h3>                        
                            <InputGroup>
                              <Input 
                                id="nameLession"
                                value={lessonName}
                                onChange={e => setLessonName(e.target.value)}
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
                                  onClick={() => {setContAula(contAula - 1)}}                                
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
                                  <>
                                    <Card
                                      style={{ width: "100%" }}
                                      style={{ marginLeft: 2, marginTop: 15 }}
                                    >
                                      <CardImg
                                        key={file}
                                        id="background"
                                        className={images ? "has-background" : ""}
                                        style={{
                                          backgroundImage: `url(${URL.createObjectURL(file)})`,
                                          minHeight: 180,
                                          width: "100%",
                                          backgroundSize: "cover",
                                          backgroundRepeat: "no-repeat",
                                        }}
                                      />
                                      <CardBody className="text-center">
                                        <Button
                                          onClick={() => removeImage(index)}
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
                                      {file.name}
                                    </div>
                                  </>
                                ))}
                              </Row>
                      </>
                    ))}             
                  </> 
                ))}
                               
                <Col md="12" sm="12" className="ml-3">
                  <Row className="align-items-center">
                    <Button
                      className="btn btn-icon-only"
                      color="success"
                      type="button"
                      onClick={() => {setCont(cont + 1)}}
                    >
                      <i className="ni ni-fat-add"/>
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
  )
}
