import { MfeAssetForAttributeWidgets } from "@clearblade/ia-mfe-core";
import { Grid, Typography } from "@material-ui/core";
import { StateObservable, useStateObservable } from "@react-rxjs/core";
import { GateStatusCustomViewSettings } from "./types";
import { getColorForGateStatusAttributeValue } from "./utils/getColorForGateStatusAttributeValue";

export default function GateStatusWidget(props: {
  settings: GateStatusCustomViewSettings;
  attribute: StateObservable<string | number | boolean | null | undefined>;
  entity: StateObservable<MfeAssetForAttributeWidgets | undefined>;
}) {
  const entity = useStateObservable(props.entity);
  const { gateUp, gateDown, bellStatus, gateControl, flip, enabled } = props.settings;
  
  const enabledVal = enabled ? entity?.custom_data?.[enabled.attribute] ?? true : true;
  const gateUpVal = gateUp ? entity?.custom_data?.[gateUp.attribute] ?? "" : "";
  const gateDownVal = gateDown
    ? entity?.custom_data?.[gateDown.attribute] ?? ""
    : "";
  const bellStatusVal = bellStatus
    ? entity?.custom_data?.[bellStatus.attribute] ?? ""
    : "";
  const gateControlVal = gateControl
    ? entity?.custom_data?.[gateControl.attribute] ?? ""
    : "";
  const gateUpColor = getColorForGateStatusAttributeValue(gateUp, gateUpVal);
  const gateDownColor = getColorForGateStatusAttributeValue(
    gateDown,
    gateDownVal
  );
  const bellStatusColor = getColorForGateStatusAttributeValue(
    bellStatus,
    bellStatusVal
  );
  const gateControlColor = getColorForGateStatusAttributeValue(
    gateControl,
    gateControlVal
  );
  const gateControlActivePath = "M153 85L161.66 100H144.34L153 85Z";
  const gateControlInactivePath = "M153 100L144.34 85H161.66L153 100Z";

  if (!enabledVal) {
    return (
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Typography>
          Gate is disabled
        </Typography>
      </Grid>
    );
  }

  return (
    // <Grid container item xs={12} justify={flip ? "flex-end" : "flex-start"}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <div style={{ width: '100%', height: '129px', position: 'relative' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
          style={flip ? { transform: "scale(-1, 1)" } : {}}
          className={flip ? "ml-auto" : ""}
            viewBox="0 0 203 129"
          >
            <rect x="71" y="9" width="4" height="120" fill="black" />
            <rect x="58" y="54" width="30" height="4" fill="black" />
            <circle cx="58" cy="64" r="10" fill="black" />
            <circle cx="58" cy="64" r="5" fill="white" />
            <circle cx="88" cy="64" r="10" fill="black" />
            <circle cx="88" cy="64" r="5" fill="white" />
            <rect
              x="50.3394"
              y="5"
              width="60"
              height="4"
              transform="rotate(35 50.3394 5)"
              fill="black"
            />
            <rect
              x="46.915"
              y="39.6182"
              width="60"
              height="4"
              transform="rotate(-35 46.915 39.6182)"
              fill="black"
            />
            <rect
              x="98.5583"
              y="99.8395"
              width="100"
              height="4"
              transform="rotate(-83 98.5583 99.8395)"
              fill={gateUpColor}
            />
          <rect x="103" y="105" width="100" height="4" fill={gateDownColor} />$
            {bellStatus && (
              <path
                fill={bellStatusColor}
                d="M15.1063 37.0386C15.1063 36.8656 15.0198 36.7791 14.8469 36.7791C14.209 36.7791 13.6604 36.5494 13.2009 36.0899C12.7415 35.6305 12.5117 35.0818 12.5117 34.444C12.5117 34.271 12.4252 34.1845 12.2523 34.1845C12.0793 34.1845 11.9928 34.271 11.9928 34.444C11.9928 35.2332 12.2712 35.9061 12.828 36.4629C13.3847 37.0197 14.0577 37.298 14.8469 37.298C15.0198 37.298 15.1063 37.2116 15.1063 37.0386ZM4.32255 32.3683H25.3712C23.5982 30.4116 22.2658 28.1872 21.3739 25.6953C20.482 23.2034 20.0361 20.5845 20.0361 17.8386C20.0361 15.071 18.3063 13.6872 14.8469 13.6872C11.3874 13.6872 9.65768 15.071 9.65768 17.8386C9.65768 20.5845 9.21174 23.2034 8.31984 25.6953C7.42795 28.1872 6.09552 30.4116 4.32255 32.3683ZM28.3388 32.3683C28.3388 32.9305 28.1334 33.417 27.7225 33.8278C27.3117 34.2386 26.8252 34.444 26.2631 34.444H18.9982C18.9982 35.5899 18.5928 36.5683 17.782 37.3791C16.9712 38.1899 15.9928 38.5953 14.8469 38.5953C13.7009 38.5953 12.7225 38.1899 11.9117 37.3791C11.1009 36.5683 10.6955 35.5899 10.6955 34.444H3.43066C2.86849 34.444 2.38201 34.2386 1.9712 33.8278C1.56039 33.417 1.35498 32.9305 1.35498 32.3683C3.40903 30.6278 4.96039 28.4791 6.00903 25.9224C7.05768 23.3656 7.58201 20.671 7.58201 17.8386C7.58201 16.0548 8.10093 14.6386 9.13876 13.5899C10.1766 12.5413 11.6036 11.9088 13.4198 11.6926C13.3334 11.498 13.2901 11.298 13.2901 11.0926C13.2901 10.6602 13.4415 10.2926 13.7442 9.98993C14.0469 9.68723 14.4144 9.53588 14.8469 9.53588C15.2793 9.53588 15.6469 9.68723 15.9496 9.98993C16.2523 10.2926 16.4036 10.6602 16.4036 11.0926C16.4036 11.298 16.3604 11.498 16.2739 11.6926C18.0901 11.9088 19.5171 12.5413 20.555 13.5899C21.5928 14.6386 22.1117 16.0548 22.1117 17.8386C22.1117 20.671 22.6361 23.3656 23.6847 25.9224C24.7334 28.4791 26.2847 30.6278 28.3388 32.3683Z"
              />
            )}
            <path
              d={gateControl ? gateControlActivePath : gateControlInactivePath}
              fill={gateControlColor}
            />
            <rect x="53" y="105" width="40" height="4" fill="black" />
          </svg>
        </div>
      </Grid>
    // </Grid>
  );
}
