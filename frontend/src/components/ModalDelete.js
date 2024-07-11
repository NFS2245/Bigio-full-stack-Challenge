import React, { useState } from "react";
import { Button, Modal, Content } from 'react-bulma-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const ModalDelete = ({ storyId, onDelete }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/stories/${storyId}`);
            await axios.delete(`http://localhost:5000/stories/${storyId}/chapters`);
            if (onDelete) {
                onDelete();
            }
            navigate("/story");
        } catch (error) {
            console.log(error);
        } finally {
            setModalOpen(false); 
        }
    }

    return (
        <div>
            <Button color="danger" onClick={() => setModalOpen(true)}>
                Delete
            </Button>

            <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header>
                        <Modal.Card.Title>Confirm Delete</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <Content>
                            <div className="text">
                                Are you sure you want to delete this story and all its chapters?
                            </div>
                        </Content>
                    </Modal.Card.Body>
                    <Modal.Card.Footer>
                        <Button className="button is-info m-4" onClick={() => setModalOpen(false)}>Cancel</Button>
                        <Button className="button is-danger m-4" onClick={handleDelete}>Delete</Button>
                    </Modal.Card.Footer>
                </Modal.Card>
            </Modal>
        </div>
    )
}

export default ModalDelete;
