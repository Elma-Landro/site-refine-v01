import Navigation from '../components/Navigation';

const Contact = () => {
  return (
    <>
      <Navigation />
      <iframe 
        src="/contact-fr.html"
        style={{ 
          width: '100%', 
          height: '100vh', 
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        title="Contact"
      />
    </>
  );
};

export default Contact;