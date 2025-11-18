export enum TrackStatusSettingKeys {
  approach = "approach",
  island = "island",
  enabled = "enabled",
}

export type TrackStatusAttributeProp = {
  attribute: string;
  color: {
    on: string;
    off: string;
  };
};

export type TrackEnabledAttributeProp = {
  attribute: string;
};

export type TrackStatusCustomViewSettings = {
  [TrackStatusSettingKeys.approach]: TrackStatusAttributeProp;
  [TrackStatusSettingKeys.island]: TrackStatusAttributeProp;
  [TrackStatusSettingKeys.enabled]: TrackEnabledAttributeProp;
};
