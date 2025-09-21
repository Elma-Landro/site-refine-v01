import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Accueil', labelEn: 'Home' },
    { path: '/crisis', label: 'Timeline Crises', labelEn: 'Crisis Timeline' },
    { path: '/these', label: 'Thèse', labelEn: 'Thesis' },
    { path: '/curriculum', label: 'CV', labelEn: 'CV' },
    { path: '/talks', label: 'Talks', labelEn: 'Talks' },
    { path: '/contact', label: 'Contact', labelEn: 'Contact' },
  ];
  
  const isCurrentPage = (path: string) => {
    return location.pathname === path || 
           (location.pathname.endsWith('-fr') && location.pathname.replace('-fr', '') === path);
  };

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4">
      <div className="flex flex-wrap justify-center gap-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={isCurrentPage(item.path) ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link to={item.path} className="font-mono text-xs">
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;