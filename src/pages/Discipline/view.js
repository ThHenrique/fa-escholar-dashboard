import React, { useState, useEffect, useRef }  from "react";
import { useHistory } from 'react-router-dom';

import {
  Badge,
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

export default function ViewDiscipline({ match }) { 
  const [ad, setAd] = useState({});
  const [images, setImages] = useState([]);
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
  const adId = match.params.id;

  useEffect(() => {
    api.get(`posts/${adId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      const status = response.status;

      if (status === 200) {
        setAd(response.data);
        setImages(response.data.images);
      } else {
        history.push('/ads');
      }
    })
  }, [adId, history, token]);

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
      await api.get(`admin/ads/${adId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => { 
        if(response.data) {
          notify('fas fa-check', 'success', 'Sucesso!', 'Anúncio aprovado.');

          setTimeout(function(){ 
            history.push('/ads');
          }, 3000);
        }
      });
    } catch (err) {
      console.error(err);
      notify('fas fa-check', 'success', 'Erro!', 'Ocorrou um problema ao aprovar o anúncio');
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

    const data = { status_feedback, status: 2 };

    try {
      await api.post(`admin/ads/${adId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(response => { 
        if(response.data) {
          notify('fas fa-check', 'success', 'Sucesso!', 'Anúncio reprovado.');

          setTimeout(function(){ 
            history.push('/ads');
          }, 3000);
        }
      });
    } catch (err) {
      console.error(err);
      notify('fas fa-check', 'success', 'Erro!', 'Ocorrou um problema ao reprovar o anúncio');
      setLoad(
        <>
          <i className="fas fa-check" />
          {" "}Aprovar
        </>
      );
    }
  }

  return (
    <>
      <PageHeader name="Nome da disciplina" parentName="Disciplinas" parentPath="discipline" />


      <Container className="mt--6" fluid>
        <Card className="bg-primary">
        <CardBody>  
        Olá Mundo
        
        </CardBody>
        </Card>
      </Container>      
    </>
  )
}