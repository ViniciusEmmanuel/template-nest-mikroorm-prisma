import { Migration } from '@mikro-orm/migrations';

const TABLE = 'user_logins';

export class Migration20211220020249 extends Migration {
  async up(): Promise<void> {
    const query = this.getKnex()
      .schema.createTable(TABLE, (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('users');
        table.string('device').notNullable();
        table.string('location').nullable();
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
