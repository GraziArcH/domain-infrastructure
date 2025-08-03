import { type IdValueObject } from "@/domain/shared";
import {
  type IUserPhoneRepository,
  type PhoneValueObject,
  UserPhoneEntityModel,
} from "@/domain/user";
import { type DatabaseHelper } from "@/application/framework";
import { type QueryResultRow } from "pg";

export class UserPhoneRepository implements IUserPhoneRepository {
  constructor(private readonly databaseHelper: DatabaseHelper) {}

  private mapper(rows: QueryResultRow): UserPhoneEntityModel {
    if (!rows) return null;

    return UserPhoneEntityModel.create({
      phoneId: rows.phone_id,
      userId: rows.user_id,
      phone: rows.phone,
      whatsapp: Boolean(rows.whatsapp),
      telegram: Boolean(rows.telegram),
      type: rows.type,
    });
  }

  async create(phone: UserPhoneEntityModel): Promise<UserPhoneEntityModel> {
    const query = `
      INSERT INTO phone (user_id, phone, whatsapp, telegram, type)
      VALUES ($1, $2, $3, $4, $5) RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      phone.userId.value,
      phone.phone.value,
      phone.whatsapp,
      phone.telegram,
      phone.type.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getPhoneById(
    phoneId: IdValueObject
  ): Promise<UserPhoneEntityModel | null> {
    const result = await this.databaseHelper.query(
      "SELECT * FROM phone WHERE phone_id = $1",
      [phoneId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getPhoneByPhone(
    phone: PhoneValueObject
  ): Promise<UserPhoneEntityModel> {
    const result = await this.databaseHelper.query(
      "SELECT * FROM phone WHERE phone = $1",
      [phone.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async getPhoneByUserId(
    userId: IdValueObject
  ): Promise<UserPhoneEntityModel[]> {
    const result = await this.databaseHelper.query(
      "SELECT * FROM phone WHERE user_id = $1",
      [userId.value]
    );
    const rows: QueryResultRow[] = result.rows;

    const models = [];

    for (const row of rows) models.push(this.mapper(row));

    return models;
  }

  async update(phone: UserPhoneEntityModel): Promise<UserPhoneEntityModel> {
    const query = `
      UPDATE phone
        SET phone = $1, whatsapp = $2, telegram = $3, type = $4
      WHERE phone_id = $5 AND user_id = $6 RETURNING *
    `;
    const result = await this.databaseHelper.query(query, [
      phone.phone.value,
      phone.whatsapp,
      phone.telegram,
      phone.type.value,
      phone.phoneId.value,
      phone.userId.value,
    ]);
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async delete(phoneId: IdValueObject): Promise<UserPhoneEntityModel> {
    const result = await this.databaseHelper.query(
      "DELETE FROM phone WHERE phone_id = $1 RETURNING *",
      [phoneId.value]
    );
    const rows: QueryResultRow = result.rows[0];
    return this.mapper(rows);
  }

  async deleteByUserId(userId: IdValueObject): Promise<UserPhoneEntityModel[]> {
    const result = await this.databaseHelper.query(
      "DELETE FROM phone WHERE user_id = $1 RETURNING *",
      [userId.value]
    );
    const rows: QueryResultRow[] = result.rows;

    const models = [];

    for (const row of rows) models.push(this.mapper(row));

    return models;
  }
}
