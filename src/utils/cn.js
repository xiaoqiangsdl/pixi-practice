import { clsx } from 'clsx'

/**
 * 类名组合工具函数
 * @param inputs - 类名或条件类名
 * @returns 组合后的类名字符串
 */
export function cn(...inputs) {
  return clsx(inputs)
}