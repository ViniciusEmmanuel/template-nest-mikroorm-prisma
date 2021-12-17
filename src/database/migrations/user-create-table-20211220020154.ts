import { Migration } from '@mikro-orm/migrations';

const TABLE = 'users';

export class Migration20211220020154 extends Migration {
  async up(): Promise<void> {
    const query = this.getKnex()
      .schema.createTable(TABLE, (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table
          .string('phoneNumber')
          .notNullable()
          .unique('user_phoneNumber_idx');
        table.string('email').nullable();
        table
          .timestamp('createdAt')
          .defaultTo(this.getKnex().raw('current_timestamp()'));
        table
          .timestamp('updatedAt')
          .defaultTo(
            this.getKnex().raw(
              'current_timestamp() ON UPDATE current_timestamp()',
            ),
          );
      })
      .toQuery();

    for (const q of query.split('\n')) {
      this.addSql(q);
    }
  }

  async down(): Promise<void> {
    const query = this.getKnex().schema.dropTableIfExists(TABLE).toQuery();
    this.addSql(query);
  }
}
