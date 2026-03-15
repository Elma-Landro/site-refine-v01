const RarePepe = () => (
  <iframe
    src="/rare-pepe.html"
    style={{ width: '100%', height: '100vh', border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
    title="Rare Pepe Cards - Crypto-Art Pioneers"
    onError={() => console.error('Failed to load rare-pepe.html')}
    onLoad={() => console.log('rare-pepe.html loaded successfully')}
  />
);

export default RarePepe;
