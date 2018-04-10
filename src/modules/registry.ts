import Rect from './prim/Rect';
import LinearArray from "./array/LinearArray";
import RectArray from "./array/RectArray";
import RemoveChildren from "./modify/RemoveChildren";
import Xform from './modify/Xform';
import Ellipse from "./prim/Ellipse";
import Module from "./Module";

export default {
  Rect,
  Ellipse,
  LinearArray,
  RectArray,
  RemoveChildren,
  Xform,
} as {[name: string]: Module};
