export interface Cv {
  id?: number;
  name: string;
  alan: string;
  notes: string;
  decision?: string;
  commissioner?: string;



}

export interface User {
  id?: number;
  name: string;
  cvs: Cv;
}
