import LinearArray from './array/LinearArray';
import RectArray from './array/RectArray';
import Choose from './modify/Choose';
import RemoveChildren from './modify/RemoveChildren';
import Xform from './modify/Xform';
import Module from './Module';
import Ellipse from './prim/Ellipse';
import Ngon from './prim/Ngon';
import Rect from './prim/Rect';

const registry = {
  Choose,
  Ellipse,
  LinearArray,
  Ngon,
  Rect,
  RectArray,
  RemoveChildren,
  Xform,
} as {[name: string]: Module};
export default registry;

Object.keys(registry).forEach((name) => {
  (registry[name].render as any).displayName = `render_${name}`;
});
