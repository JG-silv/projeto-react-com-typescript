import { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";

export enum Tema {
  Claro = "light",
  Escuro = "dark",
}

interface ThemeContextValue {
  tema: Tema;
  alternarTema: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: PropsWithChildren) {
  const [tema, setTema] = useState<Tema>(() =>
    localStorage.getItem("projeto-final-tema") === Tema.Escuro ? Tema.Escuro : Tema.Claro,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    localStorage.setItem("projeto-final-tema", tema);
  }, [tema]);

  const value = useMemo(() => ({
    tema,
    alternarTema: () => setTema((current) => current === Tema.Claro ? Tema.Escuro : Tema.Claro),
  }), [tema]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme deve ser usado dentro de ThemeProvider.");
  return context;
}
