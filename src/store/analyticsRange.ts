import { atom } from "recoil";

export const analyticsRangeAtom = atom<{
  label: string,
  value: string
}>({
  key: "analyticsRangeAtom",
  default: {
    label: "All time",
    value: "alltime"
  }
})
