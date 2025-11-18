import { gateStatusDefaultAttributeColor } from "../constants";
import { GateStatusAttributeProp } from "../types";

export const getColorForGateStatusAttributeValue = (
  prop: GateStatusAttributeProp | undefined,
  value?: string | number | boolean | null,
  defaultColor = gateStatusDefaultAttributeColor
) => {
  const colors = prop?.color ? prop.color : defaultColor;
  return value ? colors.on : colors.off;
};
