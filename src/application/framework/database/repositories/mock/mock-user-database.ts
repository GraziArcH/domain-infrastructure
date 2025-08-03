import { type DatabaseHelper } from '@/application/framework'

export class MockUserDatabase {
  constructor (private readonly databaseHelper: DatabaseHelper) { }

  async createMocks (): Promise<void> {
    await this.databaseHelper.query(`
            INSERT INTO company (company_id, company_name, cnpj, agent_type_id, active, company_legal_name, company_url) VALUES (1, 'Empresa 1', '60638328000160', 1, true, 'Company Legal Name', 'Url');
            INSERT INTO company (company_id, company_name, cnpj, agent_type_id, active, company_legal_name, company_url) VALUES (2, 'Empresa 2', '97845975000152', 1, true, 'Company Legal Name', 'Url');

            INSERT INTO "user" (user_id, idp_user_id, name, surname, cpf, company_id, admin, user_type_id, active, created_at) VALUES (1, '1', 'Usuário 1', 'Test', '74795411042', 1, true, 1, true, NOW());
            INSERT INTO email (email_id, user_id, email, type) VALUES (1, 1, 'usuario1@email.com', 'comercial');
            INSERT INTO phone (phone_id, user_id, phone, whatsapp, telegram, type) VALUES (1, 1, '1198747070', true, false, 'comercial');

            INSERT INTO "user" (user_id, idp_user_id, name, surname, cpf, company_id, admin, user_type_id, active, created_at) VALUES (2, '2', 'Usuário 2', 'Test', '48544946038', 1, false, 1, true, NOW());
            INSERT INTO email (email_id, user_id, email, type) VALUES (3, 2, 'usuario2@email.com', 'comercial');
            INSERT INTO phone (phone_id, user_id, phone, whatsapp, telegram, type) VALUES (2, 2, '11974745809', true, true, 'comercial');

            INSERT INTO "user" (user_id, idp_user_id, name, surname, cpf, company_id, admin, user_type_id, active, created_at) VALUES (3, '3', 'Usuário 3', 'Test', '23654845061', 1, false, 1, true, NOW());
            INSERT INTO email (email_id, user_id, email, type) VALUES (4, 3, 'usuario3@email.com', 'comercial');
            INSERT INTO phone (phone_id, user_id, phone, whatsapp, telegram, type) VALUES (3, 3, '11974745808', true, false, 'comercial');

            INSERT INTO invite (invite_id, hash, user_admin_id, company_id, expirations_date, used, email) VALUES  (1, 'hash', 1, 1, '2024-04-01', false, 'emailnewuser@test.com');
        `)
  }

  async clearTables (): Promise<void> {
    await this.databaseHelper.query(`
            DELETE FROM invite;
            DELETE FROM email;
            DELETE FROM phone;
            DELETE FROM "user";
            DELETE FROM company;
        `)
  }
}
