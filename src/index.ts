import { ExtensionContext } from "@foxglove/studio";
import { ImageAnnotations, PointsAnnotation, Color, TextAnnotation } from "@foxglove/schemas";

// http://docs.ros.org/en/lunar/api/vision_msgs/html/msg/ObjectHypothesis.html
type ObjectHypothesis = {
  id: number,
  score: number
}

type SpatialDetection = {
  results: ObjectHypothesis[],
  bbox: any[any],
  position: number,
  is_tracking: boolean,
  tracking_id: string
};

// https://github.com/luxonis/depthai-ros/blob/noetic/depthai_ros_msgs/msg/SpatialDetection.msg
type SpatialDetectionArray = {
  header: any,
  detections: SpatialDetection[]
}


export function activate(extensionContext: ExtensionContext) {
  extensionContext.registerMessageConverter({
    fromSchemaName: "depthai_ros_msgs/SpatialDetectionArray",
    toSchemaName: "foxglove.ImageAnnotations",
    converter: (sda: SpatialDetectionArray) => {
      let image_annotations: ImageAnnotations = {
        circles: [],
        points: [],
        texts: []
      };
    
      let outline_color: Color = {
        a: 1,
        r: 0,
        g: 0,
        b: 1,
      };
    
      let transparent_color: Color = {
        a: 0,
        r: 0,
        g: 0,
        b: 0,
      };
    
      for (const sd of sda.detections) {
        let points_annotation: PointsAnnotation = {
          timestamp: sda.header.stamp,
          type: 2, // closed polygon
          points: [],
          outline_color: outline_color,
          outline_colors: [],
          fill_color: transparent_color,
          thickness: 2,
        };
    
        let tl_x = Math.round(sd.bbox.center.x - sd.bbox.size_x / 2);
        let tl_y = Math.round(sd.bbox.center.y - sd.bbox.size_y / 2);
        let br_x = Math.round(sd.bbox.center.x + sd.bbox.size_x / 2);
        let br_y = Math.round(sd.bbox.center.y + sd.bbox.size_y / 2);
    
        points_annotation.points.push({ x: tl_x, y: tl_y });
        points_annotation.points.push({ x: br_x, y: tl_y });
        points_annotation.points.push({ x: br_x, y: br_y });
        points_annotation.points.push({ x: tl_x, y: br_y });
    
        image_annotations.points.push(points_annotation);

        let best_hypothesis = sd.results.reduce((largest, current) => largest.score > current.score ? largest : current);

        let text_annotation: TextAnnotation = {
          timestamp: sda.header.stamp,
          position: {x: tl_x, y: tl_y},
          text: `${best_hypothesis.id}: ${best_hypothesis.score.toFixed(2)}`,
          font_size: 10,
          text_color: outline_color,
          background_color: transparent_color
        }
        image_annotations.texts.push(text_annotation)
      }


      return image_annotations;
    },
  });
}
