import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-6 text-center gap-4">
      <div className="w-20 h-20 rounded-3xl bg-danger/10 flex items-center justify-center">
        <AlertCircle className="w-10 h-10 text-danger" />
      </div>
      <div>
        <h1 className="text-4xl font-black text-ink">404</h1>
        <h2 className="text-lg font-bold text-ink mt-1">Page Not Found</h2>
        <p className="text-sm text-ink-muted mt-2">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Link
        to="/"
        className="btn btn-primary mt-2"
      >
        <Home className="w-4 h-4" /> Go to Dashboard
      </Link>
    </div>
  );
}
