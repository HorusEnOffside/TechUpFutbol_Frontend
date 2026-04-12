import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="page page--centered">
      <div className="not-found">
        <h1 className="not-found__code">404</h1>
        <p className="not-found__message">La página que buscas no existe.</p>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    </main>
  );
}
