// 在 SVG 中使用坐标变换的能力其实就是给 g 元素添加对应的 transform 属性，
// 然后被 g 元素包裹的所有子元素都会应用这个 transform 属性所指定的变换。

import { applyTransform, createSVGElement, mount } from './utils';

export function transform(type, context, ...params) {
  // type 是希望的变换种类：scale，translate，rotate 等
  const { group } = context;
  applyTransform(group, `${type}(${params.join(', ')})`);
}

// 平移
export function translate(context, tx, ty) {
  transform('translate', context, tx, ty);
}

// 旋转
export function rotate(context, theta) {
  transform('rotate', context, theta);
}

// 放缩
export function scale(context, sx, sy) {
  transform('scale', context, sx, sy);
}
 
// 在使用坐标系变换的时候，除了应用对应变换之外，还应该实现对变换状态的管理。
// 这个地方的核心就是控制当前变换影响的元素范围。
// 基于 SVG 通过 g 元素来指定变换的特点，只用更新当前挂载节点，使得当前变换只会影响当前挂载节点下面的元素即可。

// 保存
export function save(context) {
  const { group } = context;
  const newGroup = createSVGElement('g');
  mount(group, newGroup);
  context.group = newGroup;
}

// 恢复
export function restore(context) {
  const { group } = context;
  const { parentNode } = group;
  context.group = parentNode;
}