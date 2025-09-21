import Navigation from '../components/Navigation';

const These = () => {
  return (
    <>
      <Navigation />
      <iframe 
        src="/these-fr.html"
        style={{ 
          width: '100%', 
          height: '100vh', 
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        title="Thèse de Doctorat"
      />
    </>
  );
};

export default These;