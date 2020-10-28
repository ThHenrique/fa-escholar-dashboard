import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import classnames from "classnames";

import { Spinner } from 'react-activity';
import '../../assets/css/react-activity.css';

import api from '../../services/api';

import { get } from 'lodash';
import { isAuthenticated } from '../../services/auth';

import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  FormFeedback,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

import logoImg from '../../assets/img/logo.png';

export default function Login() {
  const [focusedEmail, setFocusedEmail] = useState(false);
  const [focusedPassword, setFocusedPassword] = useState(false);

  const [validationEmail, setValidationEmail] = useState('');
  const [validationPassword, setValidationPassword] = useState('');
  const [validationForm, setValidationForm] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [load, setLoad] = useState('ENTRAR')

  const history = useHistory();
  const authenticated = isAuthenticated();

  useEffect(() => {
    if ( authenticated ) {
      history.push('/');
    }

    const rememberActive = localStorage.getItem('remember') ? true : false;

    if(rememberActive) {
      setEmail(localStorage.getItem('email'));
    }
    setRemember(rememberActive);
  }, [authenticated]);

  async function handleCheckbox() {
    setRemember(!remember);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoad(<Spinner color="#FFF" />);

    const data = {
      email,
      password
    }

    try {
      const response = await api.post('adminAuth/signIn', data);
      const { token } = response.data;

      if(remember) {
        localStorage.setItem('email', email);
        localStorage.setItem('remember', remember);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('remember');
      }
      localStorage.setItem('token', token);

      history.push('/');
    } catch (err) {
      console.log(err);
      const status = get(err, 'response.status');

      if (status === 400) {
        const { field, message } = get(err, 'response.data.0');

        if (field === 'email') {
          setFocusedEmail(true)
          setValidationEmail(message);
          setValidationPassword('');
          setValidationForm('');
        } else if (field === 'password') {
          setFocusedPassword(true)
          setValidationPassword(message);
          setValidationEmail('');
          setValidationForm('');
        }
      } else if (status === 401) {
        setValidationEmail('');
        setValidationPassword('');

        setValidationForm('Email ou senha incorretos, tente novamente.');
      }

      setLoad('ENTRAR');
    }
  }
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-7 mb-5">
          <Col lg="5" md="7" className="text-center text-default">
            <h2>
              E-SCHOLAR
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-2">
              <CardHeader className="bg-transparent">
                <div className="text-muted text-center">
                  <h2 className="mb-0 text-warning">PAINEL DE CONTROLE</h2>
                </div>
              </CardHeader>
              <CardBody className="px-lg-5 py-lg-5">
                { validationForm ? (
                  <Alert color="danger">
                    {validationForm}
                  </Alert>
                ) : ('') }
                <Form role="form" onSubmit={handleLogin}>
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail
                    })}
                  >
                    <InputGroup className={validationEmail ? 'input-group-merge input-group-alternative invalid-input' : 'input-group-merge input-group-alternative'}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-email-83" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={validationEmail ? true : false}
                        placeholder="Email"
                        type="email"
                        onFocus={
                          () => {
                            setFocusedEmail(true);
                            setValidationEmail('');
                          }
                        }
                        onBlur={
                          () => {
                            setFocusedEmail(false);
                            setValidationEmail('');
                          }
                        }
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                      <FormFeedback>{validationEmail}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword
                    })}
                  >
                    <InputGroup className={validationPassword ? 'input-group-merge input-group-alternative invalid-input' : 'input-group-merge input-group-alternative'}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={validationPassword ? true : false}
                        placeholder="Senha"
                        type="password"
                        onFocus={
                          () => {
                            setFocusedPassword(true);
                            setValidationPassword('');
                          }
                        }
                        onBlur={
                          () => {
                            setFocusedPassword(false);
                            setValidationPassword('');
                          }
                        }
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                      <FormFeedback>{validationPassword}</FormFeedback>
                    </InputGroup>
                  </FormGroup>
                  <div className="custom-control custom-control-alternative custom-checkbox">
                    <input
                      className="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                      checked={remember}
                      onClick={handleCheckbox}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor=" customCheckLogin"
                    >
                      <span className="text-muted">Lembrar-me</span>
                    </label>
                  </div>
                  <div className="text-center">
                    <Button className="mt-4" block color="default" type="submit">
                      { load }
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
            {/* <Row>
              <Col xs="6">
                <Link
                  className="text-gray"
                  to="/forgot-password"
                  onClick={e => e.preventDefault()}
                >
                  <small>Esqueceu a senha?</small>
                </Link>
              </Col>
            </Row> */}
          </Col>
        </Row>
      </Container>
    </>
  );
}
