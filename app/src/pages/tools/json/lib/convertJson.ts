import type { ConvertMode } from '@/pages/tools/json/configs'

export const ERROR_MESSAGE = '转换失败，请检查输入内容'

/** 不进行二次「结果美化」的模式（输出已是最终形态） */
const MODES_SKIP_VIEW_BEAUTIFY = new Set<ConvertMode>(['minify', 'escape'])

type ConvertContext = {
  beautify: boolean
}

type ModeConverter = (input: string, ctx: ConvertContext) => string

function parseJson(text: string): unknown {
  return JSON.parse(text)
}

function stringifyPretty(value: unknown): string {
  return JSON.stringify(value, null, 2)
}

function stringifyCompact(value: unknown): string {
  return JSON.stringify(value)
}

/** 若值为 JSON 对象/数组则格式化，否则返回 null */
function prettifyJsonValue(value: unknown): string | null {
  if (typeof value === 'object' && value !== null) {
    return stringifyPretty(value)
  }
  return null
}

/** 尝试将字符串再解析为一层 JSON（用于嵌套转义场景） */
function tryParseNestedString(value: unknown): unknown {
  if (typeof value !== 'string') return value
  try {
    return parseJson(value)
  } catch {
    return value
  }
}

/** 转义模式专用：美化已转义的展示文本 */
function beautifyEscapedOutput(escaped: string, rawInput: string): string {
  try {
    const parsed = tryParseNestedString(parseJson(rawInput))
    const pretty = prettifyJsonValue(parsed)
    if (pretty) return pretty
  } catch {
    // 输入不是合法 JSON，走可读文本回落
  }

  return escaped.slice(1, -1).replace(/\\n/g, '\n')
}

/** 通用：尝试将输出解析为 JSON 并美化展示 */
function beautifyOutputForView(output: string): string {
  if (!output.trim()) return output

  try {
    const parsed = parseJson(output)
    const direct = prettifyJsonValue(parsed)
    if (direct) return direct

    if (typeof parsed === 'string') {
      const nested = tryParseNestedString(parsed)
      const nestedPretty = prettifyJsonValue(nested)
      if (nestedPretty) return nestedPretty
    }
  } catch {
    // 非 JSON 文本，保持原输出
  }

  return output
}

const converters: Record<ConvertMode, ModeConverter> = {
  format: input => stringifyPretty(parseJson(input)),
  minify: input => stringifyCompact(parseJson(input)),
  escape: (input, { beautify }) => {
    const escaped = JSON.stringify(input)
    return beautify ? beautifyEscapedOutput(escaped, input) : escaped
  },
  unescape: input => {
    const value = parseJson(input)
    return typeof value === 'string' ? value : stringifyPretty(value)
  },
}

/**
 * 按模式转换 JSON 文本
 * @param mode - 转换模式
 * @param input - 原始输入
 * @param beautify - 是否对输出做展示美化（压缩模式始终忽略）
 */
export function convertJson(mode: ConvertMode, input: string, beautify: boolean): string {
  const trimmed = input.trim()
  if (!trimmed) return ''

  const converted = converters[mode](trimmed, { beautify })

  if (!beautify || MODES_SKIP_VIEW_BEAUTIFY.has(mode)) {
    return converted
  }

  return beautifyOutputForView(converted)
}
