export type StatusOS = "aberto" | "em_andamento" | "finalizado";

export interface OrdemServico {
  id: string;
  cliente: string;
  aparelho: string;
  defeito: string;
  status: StatusOS;
}
