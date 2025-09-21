const Crisis = () => {
  return (
    <iframe 
      src="/crisis.html"
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Crisis Timeline"
      onError={(e) => {
        console.error('Failed to load crisis.html:', e);
        console.log('Attempting to access:', window.location.origin + '/crisis.html');
      }}
      onLoad={() => console.log('crisis.html loaded successfully')}
    />
  );
};

export default Crisis;