export const f1Color = "#e10600";

export const DATA_POINT_RADIUS = 2;

export const constructorColoursByYear = {
  "2022": {
    alfa: "#C92D4B",
    alphatauri: "#5E8FAA",
    alpine: "#2293D1",
    aston_martin: "#358C75",
    ferrari: "#F91536",
    haas: "#B6BABD",
    mclaren: "#F58020",
    mercedes: "#6CD3BF",
    red_bull: "#3671C6",
    williams: "#37BEDD",
  },
  "2021": {
    alfa: "#900000",
    alphatauri: "#2B4562",
    alpine: "#0090FF",
    aston_martin: "#006F62",
    ferrari: "#DC0000",
    haas: "#FFFFFF",
    mclaren: "#FF8700",
    mercedes: "#00D2BE",
    red_bull: "#0600EF",
    williams: "#005AFF",
  },
} as const;

export const getConstructorColor = (params: {
  year: string;
  constructorId: string;
}) => {
  const { year, constructorId } = params;
  const exactMatch = constructorColoursByYear[year]?.[constructorId];

  if (exactMatch) return exactMatch;

  for (const backupYear of Object.keys(constructorColoursByYear)) {
    const backupMatch = constructorColoursByYear[backupYear][constructorId];
    if (backupMatch) return backupMatch;
  }
  return undefined;
};
