declare module "react-sparklines" {
  import * as React from "react";

  export interface SparklinesProps {
    data: number[];
    limit?: number;
    width?: number;
    height?: number;
    margin?: number;
    svgWidth?: number;
    svgHeight?: number;
    preserveAspectRatio?: string;
    min?: number;
    max?: number;
    children?: React.ReactNode; // ✅ Allow children like SparklinesLine
  }

  export class Sparklines extends React.Component<SparklinesProps> {}

  export interface SparklinesLineProps {
    color?: string;
    style?: React.CSSProperties;
    onMouseMove?: (event: MouseEvent, value: number) => void;
  }

  export class SparklinesLine extends React.Component<SparklinesLineProps> {}
  export class SparklinesBars extends React.Component<any> {}
  export class SparklinesCurve extends React.Component<any> {}
  export class SparklinesSpots extends React.Component<any> {}
}
