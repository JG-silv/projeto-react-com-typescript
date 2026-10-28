import { useState, type SyntheticEvent } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import type { Produto } from "../../../types/produto";
import Button from "../atoms/Button";

interface ProductFilterProps {
  produtos: Produto[];
  aoFiltrar: (nome: string) => void;
}

export default function ProductFilter({ produtos, aoFiltrar }: ProductFilterProps) {
  const [selecionado, setSelecionado] = useState<string | null>(null);
  const nomes = [...new Set(produtos.map(({ nome }) => nome))];

  const handleChange = (_event: SyntheticEvent, value: string | null) => setSelecionado(value);

  return (
    <div className="filter-bar">
      <Autocomplete<string, false, false, false>
        options={nomes}
        value={selecionado}
        onChange={handleChange}
        renderInput={(params) => <TextField {...params} label="Buscar produto" placeholder="Digite ou selecione um nome" />}
        sx={{ flex: 1, minWidth: 220 }}
        clearOnEscape
      />
      <Button type="button" onClick={() => aoFiltrar(selecionado ?? "")}>Filtrar</Button>
    </div>
  );
}
