import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '../store/AuthContext';

export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;
    processed.current = true;

    const token = searchParams.get('token');

    if (!token) {
      navigate('/auth', { replace: true });
      return;
    }

    try {
      const user = loginWithToken(token);
      if (user.roles.includes('ORGANIZER')) {
        navigate('/organizador', { replace: true });
      } else if (user.roles.includes('REFEREE')) {
        navigate('/arbitro', { replace: true });
      } else {
        navigate('/player', { replace: true });
      }
    } catch {
      navigate('/auth', { replace: true });
    }
  }, [searchParams, loginWithToken, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-[#050D1A]">
      <div className="flex flex-col items-center gap-4">
        <svg className="animate-spin w-10 h-10 text-[#17A65B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <p className="text-white text-lg font-semibold">Iniciando sesión con Google...</p>
      </div>
    </div>
  );
}
