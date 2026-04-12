import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GruposPage } from '../pages';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/grupos" replace />} />
        <Route path="/grupos" element={<GruposPage />} />
        <Route path="*" element={<Navigate to="/grupos" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
