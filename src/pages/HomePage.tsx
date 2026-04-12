import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import AuthService from '../services/auth.service';

export function HomePage() {
  const navigate = useNavigate();

  function handleLogout() {
    AuthService.logout();
    navigate('/login', { replace: true });
  }

  return (
    <main className="page">
      <header className="page-header">
        <h1 className="page-header__title">TechUp Fútbol</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Cerrar sesión
        </Button>
      </header>

      <section className="page-content">
        <p>Bienvenido. Selecciona una opción del menú para comenzar.</p>
      </section>
    </main>
  );
}
