import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Navigation Test</h1>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/crisis" style={{ marginRight: '20px', color: 'blue', textDecoration: 'underline' }}>
          Crisis (English)
        </Link>
        <Link to="/crisis-fr" style={{ color: 'blue', textDecoration: 'underline' }}>
          Crisis (Français)
        </Link>
      </nav>
      <iframe 
        src="/index.html"
        style={{ 
          width: '100%', 
          height: '80vh', 
          border: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden'
        }}
        title="Maël Rolland - Independent Researcher"
        onError={() => console.error('Failed to load index.html')}
        onLoad={() => console.log('index.html loaded successfully')}
      />
    </div>
  );
};

export default Index;
