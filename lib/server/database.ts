import { Pool, QueryResult, QueryResultRow } from "pg";

const DEFAULT_POSTGRES_URL =
  "postgresql://sge_datahub:AnheVps2022@v2202501191704311155.ultrasrv.de:5432/amcmep";

export function resolveDatabaseUrl(): string {
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

export function createDbPool(): Pool {
  const pool = new Pool({
    connectionString: resolveDatabaseUrl(),
    ssl: false,
    max: 1,
    connectionTimeoutMillis: 7000,
    idleTimeoutMillis: 1000,
  });

  pool.on("error", (err) => {
    console.error("[PostgreSQL Pool Error]", err?.message || err);
  });

  return pool;
}

export function database(): Pool {
  return createDbPool();
}

export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<QueryResult<T>> {
  const pool = createDbPool();
  try {
    return await pool.query<T>(text, params);
  } finally {
    await pool.end().catch(() => {});
  }
}
