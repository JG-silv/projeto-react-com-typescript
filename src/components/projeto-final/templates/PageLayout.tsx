import type { PropsWithChildren, ReactNode } from "react";
import Header from "../organisms/Header";

interface PageLayoutProps extends PropsWithChildren {
  eyebrow?: string;
  title?: string;
  description?: string;
  actions?: ReactNode;
}

export default function PageLayout({ children, eyebrow, title, description, actions }: PageLayoutProps) {
  return (
    <div className="app-shell">
      <Header />
      <main className="page-container">
        {(title || eyebrow || description || actions) && (
          <div className="page-heading">
            <div>
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              {title && <h1>{title}</h1>}
              {description && <p className="page-description">{description}</p>}
            </div>
            {actions && <div className="page-heading__actions">{actions}</div>}
          </div>
        )}
        {children}
      </main>
      <footer className="site-footer"><span>NOVA.STORE</span><span>Projeto Final · React + TypeScript</span></footer>
    </div>
  );
}
