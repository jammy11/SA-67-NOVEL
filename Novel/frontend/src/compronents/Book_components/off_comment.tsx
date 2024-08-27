import React,{ useState } from 'react';
import { Button } from 'react-bootstrap';
import { Offcanvas } from 'react-bootstrap';
import Commentsb from './comment';
import './comment.css'

function Off_comment() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Comment
      </Button>

      <Offcanvas show={show} onHide={handleClose} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Comment</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Commentsb/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


export default Off_comment;