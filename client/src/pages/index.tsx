import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const whatsappID = localStorage.getItem('whatsapp-id');
    if (whatsappID) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, []);

  return <p>Hello Client</p>;
};

export default Home;
