# Usage
In order to use this widget from within the Intelligent Assets application, you will need to perform the following steps:

1. Add the micro-frontend to Intelligent Assets
2. Select the widget as a custom view widget within an asset type
3. Configure the widget in the asset type

The following sections will provide more detail related to the previously mentioned steps.

## Add the micro-frontend to Intelligent Assets

1. Select the User menu in the upper right-hand corner of the screen and select _Settings_
![Settings select image](../readme_images/settings_select.png)

2. Select _System_ under __Settings__
![System select image](../readme_images/system_select.png)

3. Scroll down to the section labled __Plugin settings__ and click the __+__ icon
![Plugin Settings image](../readme_images/plugin_settings.png)

4. In the resulting form, supply appropriate values to 
![Track Status Settings image](../readme_images/track_status_settings.png)

  * Label - __Track Status__
  * Data Type - __True/False__
  * Widget Mode - __View__
  * Plugin URL - __https://cdn.jsdelivr.net/gh/ClearBlade/ia-microfrontends@{PLUGIN_VERSION}/dist/attributeViewWidgets_TrackStatus.js__

5. Click the _Done_ icon (the check mark) in the upper right-hand corner of the form

## Select the widget as a custom view widget within an asset type
1. In the _Intelligent Assets_ application, select the asset type you wish to apply the _Track Status_ widget to.
2. Edit the asset type by clicking the pencil icon in the upper right-hand corner
3. Select _Attributes_ on the left-hand side of the screen
![Select attributes image](../readme_images/select_attributes.png)
4. Either define a new __True/False__ attribute or scroll to an existing __True/False__ attribute.
5. Under __View widget settings__, specify _Track Status_ as the widget
![Track attribute image](../readme_images/track_attribute.png)
6. Click __Next__ in the wizard until you are on the last step. Once on the last step in the wizard, click __Save__

## Configure the widget in the asset type
At the moment, it is not possible to configure the _Track Status_ widget in the __Intelligent Assets__ application. Configuration must be done manually by editing the json in the _schema_ column of the __asset_types__ collection.

The _Track Status_ widget requires 2 _attributes_ to be defined on the asset type (in addition to the previously created attribute for _Track Status_). The 2 attributes must map to the following configuration values:

  1. approach
  2. island

The following json should be used as a sample for the __custom_view_settings__ attribute:

```json
    "custom_view_settings": {
      "approach": {
        "attribute": "approach",
        "color": {
          "on": "red",
          "off": "green"
        }
      },
      "island": {
        "attribute": "island",
        "color": {
          "on": "red",
          "off": "green"
        }
      }
    },
  ```
    
The value of the __attribute__ attribute in each of the key items under __custom_view_settings__ must be the name of a custom_data attribute defined in the _asset_type_.