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
