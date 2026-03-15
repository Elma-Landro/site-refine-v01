const RarePepeFr = () => (
  <iframe
    src="/rare-pepe-fr.html"
    style={{ width: '100%', height: '100vh', border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
    title="Rare Pepe Cards - Précurseurs du Crypto-Art"
    onError={() => console.error('Failed to load rare-pepe-fr.html')}
    onLoad={() => console.log('rare-pepe-fr.html loaded successfully')}
  />
);

export default RarePepeFr;
