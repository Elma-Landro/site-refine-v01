const Index = () => {
  return (
    <iframe 
      src="/index.html"
      style={{ 
        width: '100%', 
        height: '100vh', 
        border: 'none',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
      title="Maël Rolland - Independent Researcher"
      onError={() => console.error('Failed to load index.html')}
      onLoad={() => console.log('index.html loaded successfully')}
    />
  );
};

export default Index;
