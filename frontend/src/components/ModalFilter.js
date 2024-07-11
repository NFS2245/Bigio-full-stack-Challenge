import React,{useState} from "react";
import { Button, Modal, Content } from 'react-bulma-components';

const ModalFilter = ({onApplyFilter}) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [category, setCategory] = useState('Financial');
    const [status, setStatus] = useState('Publish');

    const handleApplyFilter = () => {
        setModalOpen(false);
        onApplyFilter({ category, status });
    }

    return (
        <div>
            <Button color="primary" onClick={() => setModalOpen(true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
                </svg>
            </Button>

            <Modal show={isModalOpen} onClose={() => setModalOpen(false)}>
                <Modal.Card>
                    <Modal.Card.Header>
                        <Modal.Card.Title>Filter</Modal.Card.Title>
                    </Modal.Card.Header>
                    <Modal.Card.Body>
                        <Content>
                            <form action="">
                                <div className="columns">
                                    <div className='column'>
                                        <div className="field">
                                            <label className="label">Category</label>
                                            <div className="control">
                                                <div className='select is-fullwidth'>
                                                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                        <option value="Financial">Financial</option>
                                                        <option value="Technology">Technology</option>
                                                        <option value="Health">Health</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='column'>
                                    <div className="field">
                                        <label className="label">Status</label>
                                        <div className="control">
                                            <div className='select is-fullwidth'>
                                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                                    <option value="Publish">Publish</option>
                                                    <option value="Draft">Draft</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className='button is-primary mr-3 mt-6' onClick={handleApplyFilter}>Filter</button>
                                <Button className="mt-6" onClick={() => setModalOpen(false)}>Cancel</Button>
                            </form>
                        </Content>
                    </Modal.Card.Body>
                </Modal.Card>
            </Modal>
        </div>
    )
}

export default ModalFilter

