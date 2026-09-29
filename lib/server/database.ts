import { Pool, QueryResult, QueryResultRow } from "pg";

declare global {
  var ssEngineersDatabasePool: Pool | undefined;
}

const DEFAULT_POSTGRES_URL =
  "postgresql://sge_datahub:AnheVps2022@v2202501191704311155.ultrasrv.de:5432/amcmep";

function resolveDatabaseUrl(): string {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.AMCMEP_DATABASE_URL,
    process.env.SGE_AMCMEP_DATABASE_URL,
  ];

  for (const candidate of candidates) {
    if (candidate && (candidate.startsWith("postgresql://") || candidate.startsWith("postgres://"))) {
      return candidate;
    }
  }

  return DEFAULT_POSTGRES_URL;
}

export function database(): Pool {
  if (!global.ssEngineersDatabasePool) {
    global.ssEngineersDatabasePool = new Pool({
      connectionString: resolveDatabaseUrl(),
      max: 4,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });

    global.ssEngineersDatabasePool.on("error", (err) => {
      console.error("[PostgreSQL Pool Error]", err?.message || err);
    });
  }
  return global.ssEngineersDatabasePool;
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = database();
  return pool.query<T>(text, params);
}
