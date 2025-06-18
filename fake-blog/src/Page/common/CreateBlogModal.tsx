import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";
import type React from 'react';
import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { tagContext } from '../../Context/tagContext';
import { createBlog } from '../../Services/BlogService';
import Dialog from './Dialog';

interface CreateBlogModalProps {
    show: boolean,
    onHide: () => void;
}

const createOption = (label: string) : Option => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ''),
});

interface Option { label: string; value: string; }

const CreateBlogModal: React.FC<CreateBlogModalProps> = ({ show, onHide })=> {
  const [options, setOptions] = useState<Option[] | undefined>([
    // {value: 'Laravel', label: 'laravel'},
    // {value: 'PHP', label: 'php' },
    // {value: 'Muzika', label: 'muzika' },
  ]);

  const { tags } = tagContext();
  
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const [confirm, setConfirm] = useState(false);
  const handleAgree= async () =>{
    try {
      setConfirm(false);
      onHide(); 
      const res = await createBlog(title, content, 1, value.map(o => o.value));
      if(res === 200) window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }
  const handleDissagree = () => {
    setConfirm(false);
  }

  const [value, setValue] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newOptions = tags?.map(tag => ({
      label: tag.name,
      value: tag.slug
    }));
    setOptions(newOptions);
    if(tags?.length !== 0) 
    {
      setIsLoading(false);
    }
  }, [tags])

  const handleCreate = (inputValue: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [newOption, ...prev!]);
      setValue((prev) => [newOption, ...prev]);
    }, 1000);
    console.log(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTitle(e.target.value);
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }

  const submit = () => {
    setConfirm(true);
  }

  return (
    <>
      {confirm && <Dialog open={confirm} handleAgree={handleAgree} handleDisagree={handleDissagree}/>}
      <Modal show={show} onHide={onHide}>
          <div className="h-fit dark:bg-gray-900 dark:text-white bg-white text-black rounded-lg">
        <Modal.Header closeButton className="dark:bg-gray-800 dark:text-white">
          <Modal.Title>BlogsBlogs</Modal.Title>
        </Modal.Header>
        <Modal.Body className="dark:bg-gray-900">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="dark:text-white">Title</Form.Label>
              <Form.Control
                type="textarea"
                placeholder="What are you thinking about?"
                onChange={handleTitleChange}
                autoFocus
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="dark:text-white">Tag</Form.Label>
              <CreatableSelect
                isMulti
                options={options}
                value={value}
                placeholder="Choose a tag"
                onChange={(newValue) => {
                    setValue(newValue as Option[])
                    console.log(value);
                }}
                onCreateOption={handleCreate}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="dark:text-white">Content</Form.Label>
              <Form.Control 
                onChange={handleContentChange}
                as="textarea" rows={3} maxLength={500}
             />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </div>
      </Modal>
    </>
  );
}

export default CreateBlogModal;