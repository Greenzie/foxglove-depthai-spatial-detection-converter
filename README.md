# Foxglove DepthAI Spatial Detection Message Converter


## _A Foxglove Studio Extension_

Converts ROS1 [depthai_ros_msgs/SpatialDetectionArray](https://github.com/luxonis/depthai-ros/blob/noetic/depthai_ros_msgs/msg/SpatialDetection.msg) to the Foxglove [ImageAnnotation](https://foxglove.dev/docs/studio/messages/image-annotations) schema.
With this extension, the detected object bounding boxes and their best object ID hypothesis can be selected as image annotations in the [Image panel](https://foxglove.dev/docs/studio/panels/image#imageannotation).

Created using [create-foxglove-extension](https://github.com/foxglove/create-foxglove-extension).

## Develop

Extension development uses the `npm` package manager to install development dependencies and run build scripts.

To install extension dependencies, run `npm` from the root of the extension package.

```sh
npm install
```

To build and install the extension into your local Foxglove Studio desktop app, run:

```sh
npm run local-install
```

Open the `Foxglove Studio` desktop (or `ctrl-R` to refresh if it is already open). Your extension is installed and available within the app.

## Package

Extensions are packaged into `.foxe` files. These files contain the metadata (package.json) and the build code for the extension.

Before packaging, make sure to set `name`, `publisher`, `version`, and `description` fields in _package.json_. When ready to distribute the extension, run:

```sh
npm run package
```

This command will package the extension into a `.foxe` file in the local directory.

## Publish

You can publish the extension for the public marketplace or privately for your organization.

See documentation here: https://foxglove.dev/docs/studio/extensions/publish#packaging-your-extension
