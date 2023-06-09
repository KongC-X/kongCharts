// 在初始化一个渲染器的时候，首先会去创建一个上下文 ，然后再把它给其他函数使用
import { createContext } from './context';
import {
  line, circle, text, rect, path, ring,
} from './shape';
import {
  restore, save, scale, translate, rotate,
} from './transform';

export function createRenderer(width, height) {
  const context = createContext(width, height); // 创建上下文信息
  return {
    line: (options) => line(context, options), 
    circle: (options) => circle(context, options),
    text: (options) => text(context, options),
    rect: (options) => rect(context, options),
    path: (options) => path(context, options),
    ring: (options) => ring(context, options), // 绘制圆环
    restore: () => restore(context),
    save: () => save(context),
    scale: (...args) => scale(context, ...args),
    rotate: (...args) => rotate(context, ...args),
    translate: (...args) => translate(context, ...args),
    node: () => context.node,
    group: () => context.group,
  };
}

