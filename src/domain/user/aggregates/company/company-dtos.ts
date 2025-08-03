export interface CompanyDTO {
  companyId: number;
  agentTypeId: number;
  companyName: string;
  companyUrl: string;
  companyLegalName: string;
  cnpj: string;
  active: boolean;
}

export interface CreateCompanyDTO {
  agentTypeId: number;
  companyName: string;
  companyUrl: string;
  companyLegalName: string;
  cnpj: string;
  idpUserId: string;
  name: string;
  surname: string;
  cpf: string;
  userTypeId: number;
  email: string;
  phones: Array<{ phone: string; type: string }>;
}

export interface CreateUserDTO {
  idpUserId: string;
  companyId: number;
  name: string;
  surname: string;
  userTypeId: number;
  email: string;
  admin: boolean;
  cpf?: string;
  phones: Array<{ phone: string; type: string }>;
  active: boolean;
}

export type CreateSimpleUserDTO = Omit<CreateUserDTO, "admin">;
