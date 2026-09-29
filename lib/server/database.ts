import { Pool } from "pg";

declare global {
  var ssEngineersDatabasePool: Pool | undefined;
}

function connectionString() {
  const value = process.env.AMCMEP_DATABASE_URL;
  if (!value) throw new Error("AMC MEP database is not configured.");
  return value;
}

export function database() {
  if (!global.ssEngineersDatabasePool) {
    global.ssEngineersDatabasePool = new Pool({
      connectionString: connectionString(),
      max: 4,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });
  }
  return global.ssEngineersDatabasePool;
}
