import React from 'react';
import { Container } from 'react-bootstrap'
import Header from './components/Header.component';
import Footer from './components/Footer.component';

function App() {
  return (
    <>
      <Header />
      <main>
        <Container>
        <h1>Welcome to UltraShop</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
