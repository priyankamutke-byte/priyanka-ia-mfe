import { trackStatusDefaultAttributeColor } from "../constants";
import { TrackStatusAttributeProp } from "../types";

export const getColorForTrackStatusAttributeValue = (
  prop: TrackStatusAttributeProp | undefined,
  value?: string | number | boolean | null,
  defaultColor = trackStatusDefaultAttributeColor
) => {
  const colors = prop?.color ? prop.color : defaultColor;
  return value ? colors.on : colors.off;
};
