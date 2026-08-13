export type PublicLeaderboardRow = {
  userId: number;
  isPublic: number;
  xp: number;
  updatedAt: Date;
};

/**
 * A defensive ranking boundary shared by database results and tests. Even though
 * the database query filters public rows, this guarantees a hidden profile can
 * never reach the public tRPC response if a query changes later.
 */
export function rankPublicPetProfiles<T extends PublicLeaderboardRow>(rows: T[]) {
  return rows.filter((row) => row.isPublic === 1).sort((left, right) => {
    const xpDifference = right.xp - left.xp;
    return xpDifference || right.updatedAt.getTime() - left.updatedAt.getTime();
  });
}
