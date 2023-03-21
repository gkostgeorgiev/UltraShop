import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header.component';
import Footer from './components/Footer.component';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
