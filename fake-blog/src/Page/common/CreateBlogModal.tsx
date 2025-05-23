import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import type React from 'react';
import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { tagContext } from '../../Context/tagContext';

interface CreateBlogModalProps {
    show: boolean,
    onHide: () => void;
}

interface Option { value: string; label: string; }

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({ show, onHide })=> {
  const [options, setOptions] = useState<Option[] | undefined>([
    // {value: 'Laravel', label: 'laravel'},
    // {value: 'PHP', label: 'php' },
    // {value: 'Muzika', label: 'muzika' },
  ]);

  const { tags } = tagContext();

  const [value, setValue] = useState<Option[]>([]);

  useEffect(() => {
    const newOptions = tags?.map(tag => ({
      label: tag.name,
      value: tag.slug
    }));
    setOptions(newOptions);
  }, [tags])

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="What are you thinking about?"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tag</Form.Label>
              <CreatableSelect
                isMulti
                options={options}
                value={value}
                placeholder="Choose a tag"
                onChange={(newValue) => setValue(newValue as Option[])}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} maxLength={500} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateBlogModal;