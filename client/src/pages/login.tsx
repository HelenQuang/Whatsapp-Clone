import { Form, Button, Container } from 'react-bootstrap';
import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();
  const IDRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('whatsapp-id', IDRef.current?.value as string);
    router.push('/');
  };

  return (
    <Container
      className='align-items-center justify-content-center d-flex'
      style={{ height: '100vh' }}
    >
      <Form className='w-50' onSubmit={handleSubmit}>
        <Form.Group className='mb-4'>
          <Form.Label>Enter Your ID:</Form.Label>
          <Form.Control type='text' required ref={IDRef} />
        </Form.Group>
        <Button type='submit'>Login</Button>
        <Button
          variant='secondary'
          style={{ marginLeft: '1rem' }}
          type='button'
          onClick={() => {
            localStorage.setItem('whatsapp-id', uuidv4());
            router.push('/');
          }}
        >
          Create A New ID
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
