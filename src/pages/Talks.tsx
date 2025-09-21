import Navigation from '../components/Navigation';

const Talks = () => {
  return (
    <>
      <Navigation />
      <iframe 
        src="/talks-fr.html"
        style={{ 
          width: '100%', 
          height: '100vh', 
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        title="Conférences et Talks"
      />
    </>
  );
};

export default Talks;