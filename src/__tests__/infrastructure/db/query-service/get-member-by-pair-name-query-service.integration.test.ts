import { PrismaClient } from ".prisma/client";
import { nestedTeamData } from "__tests__/__stubs__/infrastructure/db/query-service/get-member-by-pair-name-query-service";
import { Context } from "infrastructure/db/context";
import { GetMemberByPairNameQueryService } from "infrastructure/db/query-service/get-member-by-pair-name-query-service";

let context: Context;

beforeEach(() => {
  context = {
    prisma: new PrismaClient(),
  };
});

describe("GetMemberByPairNameQueryService", () => {
  describe("チーム名とペア名で参加者を取得できる", () => {
    test("teamIDが正しく設定されている", async () => {
      const targetTeamName = nestedTeamData.name;
      const targetPairName = nestedTeamData.pair[0].name;

      const memberList = await new GetMemberByPairNameQueryService(
        context,
      ).execute(targetTeamName, targetPairName);

      const targetTeamID = nestedTeamData.id;

      expect(memberList.every((m) => m.teamID === targetTeamID)).toBe(true);
    });

    test("pairIDが正しく設定されている", async () => {
      const targetTeamName = nestedTeamData.name;
      const targetPairName = nestedTeamData.pair[0].name;

      const memberList = await new GetMemberByPairNameQueryService(
        context,
      ).execute(targetTeamName, targetPairName);

      const targetPairID = nestedTeamData.pair[0].id;

      expect(memberList.every((m) => m.pairID === targetPairID)).toBe(true);
    });
  });
});
