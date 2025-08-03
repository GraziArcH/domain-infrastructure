import { IdValueObject } from "@/domain/shared";
import {
  type CPFValueObject,
  type IUserRepository,
  type IDPUserIdValueObject,
  UserAggregateModel,
} from "@/domain/user";
import { type DatabaseHelper } from "@/application/framework";
import { type QueryResultRow } from "pg";

export class UserRepository implements IUserRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) { }

  private async mapper(rows: QueryResultRow): Promise<UserAggregateModel> {
    if (!rows) return null;

    return UserAggregateModel.create({
      userId: rows.user_id,
      idpUserId: rows.idp_user_id,
      companyId: rows.company_id,
      name: rows.name,
      surname: rows.surname,
      cpf: !rows?.cpf ? null : rows?.cpf,
      userTypeId: rows.user_type_id,
      admin: Boolean(rows.admin),
      active: Boolean(rows.active),
      createdAt: rows.created_at,
      lastLoginAt: rows.last_login_at
    });
  }

  private async mapperWithEmailAndPhones(
    rows: QueryResultRow
  ): Promise<UserAggregateModel> {
    if (!rows) return null;

    const phones: Array<{
      phoneId: number;
      userId: number;
      phone: string;
      whatsapp: boolean;
      telegram: boolean;
      type: string;
    }> = [];

    for (const phone of rows.phones) {
      phones.push({
        phoneId: phone.phone_id,
        userId: phone.user_id,
        phone: phone.phone,
        type: phone.type,
        telegram: phone.telegram,
        whatsapp: phone.whatsapp,
      });
    }

    return UserAggregateModel.create({
      userId: rows.user_id,
      idpUserId: rows.idp_user_id,
      companyId: rows.company_id,
      name: rows.name,
      surname: rows.surname,
      cpf: !rows?.cpf ? "" : rows?.cpf,
      userTypeId: rows.user_type_id,
      admin: Boolean(rows.admin),
      active: Boolean(rows.active),
      createdAt: rows.created_at,
      lastLoginAt: rows.last_login_at,
      email: {
        emailId: rows.email_id,
        userId: rows.user_id,
        email: rows.email,
        type: rows.type,
      },
      phones,
    });
  }

  async create(user: UserAggregateModel): Promise<UserAggregateModel> {
    const query = `
      INSERT INTO "user" (idp_user_id, name, surname, cpf, company_id, admin, user_type_id, active, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *
    `;

    const result = await this.databaseHelper.query(query, [
      user.idpUserId.value,
      user.name.value,
      user.surname.value,
      user.cpf?.value,
      user.companyId.value,
      user.admin,
      user.userTypeId.value,
      user.active,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  async update(user: UserAggregateModel): Promise<UserAggregateModel> {
    const query = `
      UPDATE "user"
        SET idp_user_id = $1, name = $2, surname = $3, admin = $4, active = $5, user_type_id = $6
      WHERE user_id = $7 RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      user.idpUserId.value,
      user.name.value,
      user.surname.value,
      user.admin,
      user.active,
      user.userTypeId.value,
      user.userId.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  private async changeUserStatus(
    idpUserId: IDPUserIdValueObject,
    active: boolean
  ): Promise<UserAggregateModel> {
    const query = `
      UPDATE "user"
        SET active = $1
      WHERE idp_user_id = $2 RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      active,
      idpUserId.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  async activateUser(
    idpUserId: IDPUserIdValueObject,
    idpUserIdOfAdmin: IDPUserIdValueObject
  ): Promise<UserAggregateModel> {
    await this.verifyAdminAndCompany(idpUserId, idpUserIdOfAdmin);
    return await this.changeUserStatus(idpUserId, true);
  }

  async deactivateUser(
    idpUserId: IDPUserIdValueObject,
    idpUserIdOfAdmin: IDPUserIdValueObject
  ): Promise<UserAggregateModel> {
    await this.verifyAdminAndCompany(idpUserId, idpUserIdOfAdmin);
    return await this.changeUserStatus(idpUserId, false);
  }

  async getUserByCPF(cpf: CPFValueObject): Promise<UserAggregateModel> {
    const result = await this.databaseHelper.query(
      'SELECT * FROM "user" WHERE cpf = $1',
      [cpf.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  async getUsersTotalByCompanyId(
    companyId: IdValueObject
  ): Promise<number | null> {
    const result = await this.databaseHelper.query(
      'SELECT COUNT(*) FROM "user" WHERE company_id = $1 AND active = true',
      [companyId.value]
    );
    const usersTotal: number | null = result.rows[0]?.count;
    return usersTotal ? Number(usersTotal) : null;
  }

  async getUsersByIDPUserIdOfAdmin(
    idpUserId: IDPUserIdValueObject,
    limit?: number,
    offset?: number
  ): Promise<UserAggregateModel[]> {
    const adminQuery = `
        SELECT 
          company_id
        FROM 
          "user"
        WHERE 
          idp_user_id = $1 AND admin = true;
    `;

    const adminResult = await this.databaseHelper.query(adminQuery, [
      idpUserId.value,
    ]);

    const companyId = adminResult.rows[0]?.company_id;

    // Em seguida, use o companyId na consulta principal
    const query = `
        SELECT 
          u.*, 
          e.*,
          jsonb_agg(
            jsonb_build_object(
              'phone_id', p.phone_id,
              'user_id', p.user_id,
              'phone', p.phone,
              'whatsapp', p.whatsapp,
              'telegram', p.telegram,
              'type', p.type
            )
            ) AS phones
        FROM 
          "user" u
        INNER JOIN 
          email e ON u.user_id = e.user_id
        INNER JOIN 
          phone p ON u.user_id = p.user_id
        WHERE 
          u.company_id = $1
        GROUP BY 
          u.user_id, 
          u.idp_user_id, 
          u.name, 
          u.CPF, 
          u.company_id, 
          u.admin, 
          u.active, 
          u.user_type_id, 
          u.created_at,
          u.last_login_at,
          e.email_id, 
          e.user_id, 
          e.email, 
          e.type
        LIMIT CASE WHEN $2 <> 0 THEN $2 ELSE NULL END
          OFFSET CASE WHEN $3 <> 0 THEN $3 ELSE NULL END;
    `;
    const result = await this.databaseHelper.query(query, [
      companyId,
      limit ?? 0,
      offset ?? 0,
    ]);

    const rows: QueryResultRow[] = result.rows;

    const models = [];

    for (const row of rows)
      models.push(await this.mapperWithEmailAndPhones(row));

    return models;
  }

  private async verifyAdminAndCompany(
    idpUserId: IDPUserIdValueObject,
    idpUserIdOfAdmin: IDPUserIdValueObject
  ): Promise<void> {
    const adminUser = await this.getUserByIDPUserId(idpUserIdOfAdmin);
    const targetUser = await this.getUserByIDPUserId(idpUserId);

    if (adminUser.companyId.value !== targetUser.companyId.value) {
      throw new Error("Os usuários não pertencem à mesma empresa");
    }

    if (!adminUser.admin) {
      throw new Error("O usuário não tem permissões suficientes");
    }
  }

  async getUserById(userId: IdValueObject): Promise<any> {
    const query = `
      SELECT
        u.*,
        e.*,
        jsonb_agg(
          jsonb_build_object(
            'phone_id', p.phone_id,
            'user_id', p.user_id,
            'phone', p.phone,
            'whatsapp', p.whatsapp,
            'telegram', p.telegram,
            'type', p.type
          )
        ) AS phones
      FROM
        "user" u
      INNER JOIN
        email e ON u.user_id = e.user_id
      INNER JOIN
        phone p ON u.user_id = p.user_id
      WHERE
        u.user_id = $1
      GROUP BY
        u.user_id,
        u.idp_user_id,
        u.name,
        u.CPF,
        u.company_id,
        u.admin,
        u.active,
        u.user_type_id,
        u.created_at,
        e.email_id,
        e.user_id,
        e.email,
        e.type;
    `;

    const result = await this.databaseHelper.query(query, [userId.value]);
    const rows: QueryResultRow = result.rows[0];
    return await this.mapperWithEmailAndPhones(rows);
  }

  async getUserByIDPUserId(
    idpUserId: IDPUserIdValueObject
  ): Promise<UserAggregateModel> {
    const query = `
        SELECT 
          u.*, 
          e.*,
          jsonb_agg(
            jsonb_build_object(
              'phone_id', p.phone_id,
              'user_id', p.user_id,
              'phone', p.phone,
              'whatsapp', p.whatsapp,
              'telegram', p.telegram,
              'type', p.type
            )
            ) AS phones
        FROM 
          "user" u
        INNER JOIN 
          email e ON u.user_id = e.user_id
        INNER JOIN 
          phone p ON u.user_id = p.user_id
        WHERE 
          u.idp_user_id = $1
        GROUP BY 
          u.user_id, 
          u.idp_user_id, 
          u.name, 
          u.CPF, 
          u.company_id, 
          u.admin, 
          u.active, 
          u.user_type_id,
          u.created_at,
          e.email_id, 
          e.user_id, 
          e.email, 
          e.type;
    `;
    const result = await this.databaseHelper.query(query, [idpUserId.value]);
    const rows: QueryResultRow = result.rows[0];
    return await this.mapperWithEmailAndPhones(rows);
  }

  async getUserIdByIDPUserId(
    idpUserId: IDPUserIdValueObject
  ): Promise<IdValueObject | null> {
    const result = await this.databaseHelper.query(
      'SELECT user_id FROM "user" WHERE idp_user_id = $1',
      [idpUserId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return IdValueObject.create(rows.user_id as number);
  }

  async delete(idpUserId: IDPUserIdValueObject): Promise<UserAggregateModel> {
    const result = await this.databaseHelper.query(
      'UPDATE "user" SET active = FALSE WHERE idp_user_id = $1 RETURNING *',
      [idpUserId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  async deleteByUserId(user: IdValueObject): Promise<UserAggregateModel> {
    const result = await this.databaseHelper.query(
      'UPDATE "user" SET active = FALSE WHERE user_id = $1 RETURNING *',
      [user.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return await this.mapper(rows);
  }

  async updateLastLoginAt(idpUserId: IDPUserIdValueObject): Promise<boolean> {
    const query = `
      UPDATE "user"
        SET last_login_at = NOW()
      WHERE idp_user_id = $1
      `;

    try {
      await this.databaseHelper.query(query, [idpUserId.value]); return true;  // Retorna true se a atualização for bem-sucedida
    } catch (error) {
      return false;  // Retorna false se ocorrer um erro
    }
  }
}
