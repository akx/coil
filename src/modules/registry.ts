import Choose from './modify/Choose';
import Ellipse from './prim/Ellipse';
import LinearArray from './array/LinearArray';
import Module from './Module';
import Ngon from './prim/Ngon';
import Rect from './prim/Rect';
import RectArray from './array/RectArray';
import RemoveChildren from './modify/RemoveChildren';
import Xform from './modify/Xform';

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
