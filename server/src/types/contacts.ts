export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface NewContact {
  firstname: string;
  lastname?: string;
  email: string;
  message: string;
}
