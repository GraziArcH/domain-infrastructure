import { type IdValueObject } from "@/domain/shared";
import {
  type CompanyAggregateModel,
  type CNPJValueObject,
} from "@/domain/user";

export interface ICompanyRepository {
  create: (company: CompanyAggregateModel) => Promise<CompanyAggregateModel>;

  getCompanyById: (
    companyId: IdValueObject
  ) => Promise<CompanyAggregateModel | null>;

  getCompanyByCNPJ: (
    cnpj: CNPJValueObject
  ) => Promise<CompanyAggregateModel | null>;

  getAll: () => Promise<CompanyAggregateModel[]>;

  update: (company: CompanyAggregateModel) => Promise<CompanyAggregateModel>;

  delete: (companyId: IdValueObject) => Promise<CompanyAggregateModel>;

  activateCompany: (idpUserId: string) => Promise<CompanyAggregateModel>;

  deactivateCompany: (idpUserId: string) => Promise<CompanyAggregateModel>;

  getAllIdpUserIdsByCompanyId: (companyId: string) => Promise<string[]>;
}
