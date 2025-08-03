import { type IdValueObject } from "@/domain/shared";
import {
  type CNPJValueObject,
  CompanyAggregateModel,
  type ICompanyRepository,
} from "@/domain/user";
import { type DatabaseHelper } from "@/application/framework";
import { type QueryResultRow } from "pg";

export class CompanyRepository implements ICompanyRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) {}

  private mapper(rows: QueryResultRow): CompanyAggregateModel {
    if (!rows) return null;

    return CompanyAggregateModel.create({
      companyId: rows.company_id,
      companyLegalName: rows.company_legal_name,
      companyUrl: rows.company_url,
      agentTypeId: rows.agent_type_id,
      companyName: rows.company_name,
      cnpj: rows.cnpj,
      active: Boolean(rows.active),
    });
  }

  async create(company: CompanyAggregateModel): Promise<CompanyAggregateModel> {
    const query = `
    INSERT INTO company (company_name, cnpj, agent_type_id, active, company_legal_name, company_url)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      company.companyName.value,
      company.cnpj.value,
      company.agentTypeId.value,
      company.active,
      company.companyLegalName.value,
      company.companyUrlName.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getAllIdpUserIdsByCompanyId(companyId: string): Promise<string[]> {
    const result = await this.databaseHelper.query(
      'SELECT idp_user_id FROM "user" WHERE company_id = $1',
      [companyId]
    );
    return result.rows.map((row) => row.idp_user_id);
  }

  private async changeCompanyStatus(
    idpUserId: string,
    status: boolean
  ): Promise<CompanyAggregateModel> {
    const adminQuery = `
        SELECT 
          company_id
        FROM 
          "user"
        WHERE 
          idp_user_id = $1 AND admin = true;
    `;
    const adminResult = await this.databaseHelper.query(adminQuery, [
      idpUserId,
    ]);
    const companyId = adminResult.rows[0]?.company_id;

    const companyQuery =
      "UPDATE company SET active = $1 WHERE company_id = $2 RETURNING *";
    const companyResult = await this.databaseHelper.query(companyQuery, [
      status,
      companyId,
    ]);
    const companyRows: QueryResultRow = companyResult.rows[0];

    const userQuery = 'UPDATE "user" SET active = $1 WHERE company_id = $2';
    await this.databaseHelper.query(userQuery, [status, companyId]);

    return this.mapper(companyRows);
  }

  async activateCompany(idpUserId: string): Promise<CompanyAggregateModel> {
    return await this.changeCompanyStatus(idpUserId, true);
  }

  async deactivateCompany(idpUserId: string): Promise<CompanyAggregateModel> {
    return await this.changeCompanyStatus(idpUserId, false);
  }

  async getCompanyById(
    companyId: IdValueObject
  ): Promise<CompanyAggregateModel | null> {
    const result = await this.databaseHelper.query(
      "SELECT * FROM company WHERE company_id = $1",
      [companyId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getCompanyByCNPJ(
    cnpj: CNPJValueObject
  ): Promise<CompanyAggregateModel | null> {
    const result = await this.databaseHelper.query(
      "SELECT * FROM company WHERE cnpj = $1",
      [cnpj.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getAll(): Promise<CompanyAggregateModel[]> {
    const result = await this.databaseHelper.query("SELECT * FROM company");
    const rows: QueryResultRow[] = result.rows;

    const models = [];

    for (const row of rows) models.push(this.mapper(row));

    return models;
  }

  async update(company: CompanyAggregateModel): Promise<CompanyAggregateModel> {
    const query = `
      UPDATE company
        SET company_name = $1, cnpj = $2, agent_type_id = $3, active = $4, company_legal_name = $5, company_url = $6
      WHERE company_id = $7 RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      company.companyName.value,
      company.cnpj.value,
      company.agentTypeId.value,
      company.active,
      company.companyLegalName.value,
      company.companyUrlName.value,
      company.companyId.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async delete(companyId: IdValueObject): Promise<CompanyAggregateModel> {
    const result = await this.databaseHelper.query(
      "DELETE FROM company WHERE company_id = $1 RETURNING *",
      [companyId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }
}
