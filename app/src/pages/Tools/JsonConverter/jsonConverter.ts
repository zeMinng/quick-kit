export type ConvertMode = 'format' | 'minify' | 'escape' | 'unescape'

export interface ConvertType {
  label: string
  value: ConvertMode
  description: string
  placeholder: string
}

export const JSON_CONVERT_OPTIONS: Record<ConvertMode, ConvertType> = {
  format: {
    label: '格式化',
    value: 'format',
    description: '将 JSON 字符串格式化为更易读的结构，适合查看和调试。',
    placeholder: '{"name":"quick-kit","enabled":true}',
  },
  minify: {
    label: '压缩',
    value: 'minify',
    description: '将 JSON 字符串压缩成一行，去除所有空白字符，适合传输和存储。',
    placeholder: '{\n  "name": "quick-kit",\n  "enabled": true\n}',
  },
  escape: {
    label: '转义',
    value: 'escape',
    description: '将 JSON 字符串中的特殊字符转义，适合在代码中使用。',
    placeholder: '{"name":"quick-kit","enabled":true}',
  },
  unescape: {
    label: '反转义',
    value: 'unescape',
    description: '将转义后的 JSON 字符串还原为原始格式，适合查看和编辑。',
    placeholder: '"{\\"name\\":\\"quick-kit\\",\\"enabled\\":true}"',
  },
}

interface ConversionResult {
  result: string
  error: string
}

const ERROR_MESSAGE = '转换失败，请检查输入内容'

const beautifyEscapedText = (escaped: string, rawInput: string) => {
  try {
    let parsed: unknown = JSON.parse(rawInput)
    if (typeof parsed === 'string') {
      try {
        parsed = JSON.parse(parsed)
      } catch {
        // 字符串内容不是 JSON，保持默认逻辑
      }
    }

    if (typeof parsed === 'object' && parsed !== null) {
      return JSON.stringify(parsed, null, 2)
    }
  } catch {
    // 输入不是 JSON 对象/数组时，回落到基础可读模式
  }

  return escaped.slice(1, -1).replace(/\\n/g, '\n')
}

const beautifyOutputForView = (output: string) => {
  if (!output.trim()) return output

  try {
    const parsed = JSON.parse(output)

    if (typeof parsed === 'object' && parsed !== null) {
      return JSON.stringify(parsed, null, 2)
    }

    if (typeof parsed === 'string') {
      try {
        const nestedParsed = JSON.parse(parsed)
        if (typeof nestedParsed === 'object' && nestedParsed !== null) {
          return JSON.stringify(nestedParsed, null, 2)
        }
      } catch {
        // 字符串不是嵌套 JSON，回落为默认输出
      }
    }
  } catch {
    // 不是 JSON，回落为默认输出
  }

  return output
}

const convertJson = (mode: ConvertMode, input: string, beautify: boolean) => {
  if (!input.trim()) return ''

  let converted = ''
  if (mode === 'format') {
    converted = JSON.stringify(JSON.parse(input), null, 2)
  } else if (mode === 'minify') {
    converted = JSON.stringify(JSON.parse(input))
  } else if (mode === 'escape') {
    const escaped = JSON.stringify(input)
    converted = beautify ? beautifyEscapedText(escaped, input) : escaped
  } else {
    const unescaped = JSON.parse(input)
    converted = typeof unescaped === 'string' ? unescaped : JSON.stringify(unescaped, null, 2)
  }

  if (mode === 'minify') return converted
  return beautify ? beautifyOutputForView(converted) : converted
}

export const getJsonConversion = (params: {
  mode: ConvertMode
  input: string
  beautify: boolean
}): ConversionResult => {
  const { mode, input, beautify } = params
  if (!input.trim()) return { result: '', error: '' }

  try {
    return {
      result: convertJson(mode, input, beautify),
      error: '',
    }
  } catch (err) {
    return {
      result: '',
      error: err instanceof Error ? err.message : ERROR_MESSAGE,
    }
  }
}
