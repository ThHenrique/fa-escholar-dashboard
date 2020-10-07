import React, { useState, useEffect, useRef }  from "react";
import { useHistory } from 'react-router-dom';

import {
  Modal,
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

import NotificationAlert from "react-notification-alert";
import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';

import api from '../../services/api';
import PageHeader from "../../components/PageHeader";

export default function ViewAds({ match }) { 
  const [user, setUser] = useState({});
  const [images, setImages] = useState({});
  const [modal, setModal] = useState(false);
  const [status_feedback, setFeedback] = useState('');
  const [load, setLoad] = useState(
    <>
      <i className="fas fa-check" />
      {" "}Aprovar
    </>
  );

  const inputRef = useRef('notificationAlert');
  const history = useHistory();

  const token = localStorage.getItem('token');
  const userId = match.params.id;

  useEffect(() => {
    api.get(`admin/profiles/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      const status = response.status;

      if (status === 200) {
        const { document_url, selfie_url, residence_url } = response.data;
        setUser(response.data.user);
        setImages({ document_url, selfie_url, residence_url });
      } else {
        history.push('/profiles');
      }
    })
  }, [userId]);

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

  async function handleApprove() {
    setLoad(<Spinner color="#FFF" />);

    try {
      await api.post(`admin/profiles/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => { 
        if(response.data) {
          notify('fas fa-check', 'success', 'Sucesso!', 'Perfil verificado.');

          setTimeout(function(){ 
            history.push('/profiles');
          }, 3000);
        }
      });
    } catch (err) {
      console.error(err);
      notify('fas fa-times', 'danger', 'Erro!', 'Ocorreu um problema ao verificar o perfil');
      setLoad(
        <>
          <i className="fas fa-check" />
          {" "}Aprovar
        </>
      );
    }
  }

  async function handleReprove() {
    setModal(!modal);
  }

  async function handleReproveSubmit(e) {
    e.preventDefault();

    const data = { status_feedback, approved: 2 };

    try {
      await api.put(`admin/profiles/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => { 
        if(response.data) {
          notify('fas fa-check', 'success', 'Sucesso!', 'Perfil reprovado.');

          setTimeout(function(){ 
            history.push('/profiles');
          }, 3000);
        }
      });
    } catch (err) {
      console.error(err);
      notify('fas fa-check', 'danger', 'Erro!', 'Ocorrou um problema ao reprovar o perfil');
      setLoad(
        <>
          <i className="fas fa-times" />
          {" "}Aprovar
        </>
      );
    }
  }

  return (
    <>
      <PageHeader name="Aprovação de Perfil" parentName="Verificação de Perfil" parentPath="profiles" />

      <Container className="mt--6" fluid>
        <div className="rna-wrapper">
          <NotificationAlert ref={inputRef} />
        </div>
        <Card className="card-frame">
          <CardBody>
            <Row>
              <Col md="12" sm="12">
                <h2>Dados do usuário</h2>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="username">Nome</label>
                  <Input
                    className="form-control-alternative"
                    id="username"
                    placeholder="Nome"
                    type="text"
                    value={user.username}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="surname">Sobrenome</label>
                  <Input
                    className="form-control-alternative"
                    id="surname"
                    placeholder="Sobrenome"
                    type="text"
                    value={user.surname}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="email">Email</label>
                  <Input
                    className="form-control-alternative"
                    id="email"
                    placeholder="Email"
                    type="text"
                    value={user.email}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="celphone">Celular</label>
                  <Input
                    className="form-control-alternative"
                    id="celphone"
                    placeholder="Celular"
                    type="text"
                    value={user.celphone}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="birthday">Data de Nascimento</label>
                  <Input
                    className="form-control-alternative"
                    id="birthday"
                    placeholder="Data de Nascimento"
                    type="text"
                    value={user.birthday}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="6" sm="12">
                <FormGroup>
                  <label htmlFor="cpf">CPF</label>
                  <Input
                    className="form-control-alternative"
                    id="cpf"
                    placeholder="CPF"
                    type="text"
                    value={user.cpf}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <label htmlFor="gender">Gênero</label>
                  <Input
                    className="form-control-alternative"
                    id="gender"
                    placeholder="Gênero"
                    type="text"
                    value={user.gender}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <label htmlFor="ad_city">Cidade</label>
                  <Input
                    className="form-control-alternative"
                    id="ad_city"
                    placeholder="Estado"
                    type="text"
                    value={user.city}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="4" sm="12">
                <FormGroup>
                  <label htmlFor="state">Estado</label>
                  <Input
                    className="form-control-alternative"
                    id="state"
                    placeholder="Estado"
                    type="text"
                    value={user.state}
                    disabled
                    required
                  />
                </FormGroup>
              </Col>
              <Col md="12" sm="12" className="mb--3">
                <hr />
              </Col>
              <Col md="12" sm="12">
                <h2>Fotos</h2>
              </Col>
              <Col md="4" sm="12">
                <label>CNH/RG</label>
                <img
                  alt='...'
                  src={images.document_url}
                  style={{ width: '100%' }}
                  fluid
                />
              </Col>
              <Col md="4" sm="12">
                <label>Selfie</label>
                <img
                  alt='...'
                  src={images.selfie_url}
                  style={{ width: '100%' }}
                  fluid
                />
              </Col>
              <Col md="4" sm="12">
                <label>Comprovante de Residência</label>
                <img
                  alt='...'
                  src={images.residence_url}
                  style={{ width: '100%' }}
                  fluid
                />
              </Col>
              <Col md="12" sm="12" className="mb--3">
                <hr />
              </Col>
              <Col md="6" sm="12" className="mt-3">
                <Button onClick={handleReprove} color="danger" block>
                  <i className="fas fa-times" />
                  {" "}Reprovar
                </Button>
              </Col>
              <Col md="6" sm="12" className="mt-3">
                <Button onClick={handleApprove} color="success" block>
                  { load }
                </Button>
              </Col>
            </Row>  
          </CardBody>
        </Card>
      </Container>

      <Modal
        className="modal-dialog-centered"
        isOpen={modal}
        toggle={() => setModal(!modal)}
      >
        <div className="modal-header">
          <h2>Reprovar Perfil</h2>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setModal(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <CardBody className="mt--4">
          <Form onSubmit={handleReproveSubmit}>
            <Row>
              <Col md="12" sm="12">
                <label htmlFor="feedback">Motivo da reprovação</label>
                <Input
                  id="feedback"
                  className="form-control-alternative mb-3"
                  type="textarea"
                  required
                  onChange={e => setFeedback(e.target.value)}
                />
                <Button type="submit" color="danger" block>
                  <i className="fas fa-times" />
                  {" "}Reprovar
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Modal>
    </>
  )
}