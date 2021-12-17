import { join } from 'path';
import * as readlineSync from 'readline-sync';
import { headerCase, camelCase } from 'change-case';
import {
  Configuration,
  EntityCaseNamingStrategy,
  Options,
} from '@mikro-orm/core';
import { env } from '@config/environment';

const BASE_DIR = join(__dirname, '..', '..');
const ENTITY_JS = join('dist', 'repositories', '**', 'schemas', '*.schema.js');
const ENTITY_TS = join('src', 'repositories', '**', 'schemas', '*.schema.ts');
const MIGRATIONS = join(__dirname, 'migrations');
const environment = env();

function selectFileType() {
  return readlineSync.keyInSelect(
    ['Create table!', 'Alter table!', 'Drop table!'],
    'Type file ?',
  );
}

function inputFileName() {
  return readlineSync.question('\nFilename migrations?\n> ');
}

const fileNameMigration = (timestamp: string) => {
  const fileTypes = {
    0: 'create-table',
    1: 'alter-table',
    2: 'drop-table',
  };
  const answerFileType = selectFileType();

  let fileType = fileTypes[0];
  if (answerFileType) {
    fileType = Reflect.get(fileTypes, answerFileType);
  }

  let fileName = '';
  while (!fileName) {
    const answerFileName = inputFileName();
    if (answerFileName) {
      fileName = headerCase(answerFileName).toLowerCase();
    }
  }

  return `${fileName}-${fileType}-${timestamp}`;
};

class NameStrategy extends EntityCaseNamingStrategy {
  propertyToColumnName(propertyName: string): string {
    return camelCase(propertyName);
  }
}

const options: Options = {
  type: environment.database.type as keyof typeof Configuration.PLATFORMS,
  host: environment.database.host,
  dbName: environment.database.name,
  port: environment.database.port,
  user: environment.database.user,
  password: environment.database.password,
  pool: { min: 2, max: environment.database.maxPool },
  baseDir: BASE_DIR,
  entities: [ENTITY_JS],
  entitiesTs: [ENTITY_TS],
  debug: environment.app.env === 'local',
  namingStrategy: NameStrategy,
  migrations: {
    fileName: fileNameMigration,
    path: MIGRATIONS,
    emit: 'ts',
    transactional: false,
  },
};

export default options;
