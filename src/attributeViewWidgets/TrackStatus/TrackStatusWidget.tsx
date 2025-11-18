import { MfeAssetForAttributeWidgets } from "@clearblade/ia-mfe-core";
import {
  StateObservable,
  Subscribe,
  useStateObservable,
} from "@react-rxjs/core";
import { trackStatusDefaultAttributeColor } from "./constants";
import { TrackStatusCustomViewSettings } from "./types";
import { getColorForTrackStatusAttributeValue } from "./utils/getColorForTrackStatusAttributeValue";
import { Grid, Typography } from "@material-ui/core";

export default function TrackStatusWidget(props: {
  settings: TrackStatusCustomViewSettings;
  attribute: StateObservable<string | number | boolean | null | undefined>;
  entity: StateObservable<MfeAssetForAttributeWidgets | undefined>;
}) {
  const entity = useStateObservable(props.entity);

  const { approach, island, enabled } = props.settings;

  const approachVal = approach
    ? entity?.custom_data?.[approach.attribute] ?? ""
    : "";
  const islandVal = island ? entity?.custom_data?.[island.attribute] ?? "" : "";
  const enabledVal = enabled ? entity?.custom_data?.[enabled.attribute] ?? true : true;
  const approachColor = getColorForTrackStatusAttributeValue(
    approach,
    approachVal,
    trackStatusDefaultAttributeColor
  );
  const islandColor = getColorForTrackStatusAttributeValue(
    island,
    islandVal,
    trackStatusDefaultAttributeColor
  );

  if (!enabledVal) {
    return (
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Typography>
          Island is disabled
        </Typography>
      </Grid>
    );
  }

  return (
    <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
      <div style={{ 
        width: '489px', 
        height: '22px',
        maxWidth: '100%',
        transform: 'translateZ(0)', // Force GPU acceleration
        willChange: 'transform',    // Optimize for animations
        display: 'flex',           // Use flexbox for stable layout
        justifyContent: 'center'   // Center the SVG
      }}>
        <svg
          width="489"
          height="22"
          viewBox="0 0 489 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,         // Prevent SVG from shrinking
            width: '100%',
            height: '100%',
            display: 'block'       // Remove extra space below SVG
          }}
        >
          {typeof approach !== "undefined" && (
            <line
              x1="19"
              y1="11"
              x2="470"
              y2="11"
              stroke={approachColor}
              strokeWidth="8"
            />
          )}
          {typeof approach !== "undefined" && (
            <path d="M0 11L19 0V22L0 11Z" fill={approachColor} />
          )}
          {typeof island !== "undefined" && (
            <line
              x1="165"
              y1="4.5"
              x2="324"
              y2="4.5"
              stroke={islandColor}
              strokeWidth="5"
            />
          )}
          $
          {typeof approach !== "undefined" && (
            <path d="M488.756 11L470 22V0L488.756 11Z" fill={approachColor} />
          )}
        </svg>
      </div>
    </Grid>
  );
}
