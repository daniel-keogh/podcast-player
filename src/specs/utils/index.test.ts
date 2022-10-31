import { isEmpty } from "@/utils/index";

describe("utils", () => {
  describe("isEmpty", () => {
    it("should return true for empty object", () => {
      expect(isEmpty({})).toBe(true);
    });
    it("should return false for object with keys", () => {
      expect(isEmpty({ key: "value" })).toBe(false);
    });
  });
});
