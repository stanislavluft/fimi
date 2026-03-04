import { NavLink, Outlet, Link } from 'react-router-dom';

type NavItem = {
  path: '/dashboard' | '/operations' | '/analytics' | '/settings';
  label: string;
};

const navigation: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/operations', label: 'Operations' },
  { path: '/analytics', label: 'Analytics' },
  { path: '/settings', label: 'Settings' },
];

function AppLayout() {
  return (
    <div>
      <header className="border-border bg-card border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-3xl font-semibold">
            fimi
          </Link>
          <nav className="flex items-center gap-2">
            {navigation.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-1.5 text-sm transition ${
                    isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`
                }
              >
                {page.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
