export type ToolCategoryId = 'data-text' | 'image-media' | 'engineering'
export type ToolIconKey = 'braces' | 'image' | 'cpu' | 'diff' | 'palette'

export interface ToolCategory {
  id: ToolCategoryId
  /** Section index label (editorial rhythm). */
  index: string
  title: string
  /** Atmospheric orb token — maps to SCSS modifiers, not button fills. */
  orb: 'mint' | 'peach' | 'lavender' | 'sky' | 'rose'
  blurb: string
}

export interface ToolEntry {
  id: string
  categoryId: ToolCategoryId
  name: string
  /** Short rhythm line under the title. */
  tagline: string
  description: string
  href: string | null
  available: boolean
  tags: string[]
  iconKey: ToolIconKey
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'data-text',
    index: '01',
    title: '数据与文本',
    orb: 'mint',
    blurb: '面向接口联调、日志整理与发布前校对；默认在浏览器内完成，不依赖自有后端。',
  },
  {
    id: 'image-media',
    index: '02',
    title: '图像与媒体',
    orb: 'peach',
    blurb: '围绕日常素材流：格式互转、裁切拼接与体积控制；预览与参数同步可见。',
  },
  {
    id: 'engineering',
    index: '03',
    title: '性能与工程',
    orb: 'lavender',
    blurb: '把重计算放进 Worker，主线程留给交互；后续热点逐步迁向 Rust + WebAssembly。',
  },
]

export const toolEntries: ToolEntry[] = [
  {
    id: 'json',
    categoryId: 'data-text',
    name: 'JSON 工作台',
    tagline: '格式化 · 校验 · 压缩',
    description:
      '在本地完成格式化、压缩、转义与反转义；支持一键复制结果，适合 payload 发布前的快速自检。',
    href: '/tools/json',
    available: true,
    tags: ['本地', '无上传', '剪贴板'],
    iconKey: 'braces',
  },
  {
    id: 'text-diff',
    categoryId: 'data-text',
    name: '文本差异对比',
    tagline: '并排 · 统一 diff',
    description: '对比两段文本或配置片段，输出可读性更好的变更视图；适合评审与回滚说明草稿。',
    href: null,
    available: false,
    tags: ['筹备中', '评审'],
    iconKey: 'diff',
  },
  {
    id: 'image-suite',
    categoryId: 'image-media',
    name: '图像工具组',
    tagline: '互转 · 裁切 · 压缩',
    description: '互转、裁切、拼接与压缩等能力按模块合入主线；进度可在 GitHub 跟踪，不在此伪造外链。',
    href: null,
    available: false,
    tags: ['Canvas', '筹备中'],
    iconKey: 'image',
  },
  {
    id: 'color-pick',
    categoryId: 'image-media',
    name: '色彩与取样',
    tagline: '吸管 · 对比度',
    description: '从画面取样并生成可复制的标记色值；与后续图像管线共用同一预览画布。',
    href: '/tools/color-pick',
    available: true,
    tags: ['本地', '无上传', '无障碍'],
    iconKey: 'palette',
  },
  {
    id: 'worker-lab',
    categoryId: 'engineering',
    name: 'Worker 沙箱',
    tagline: '重计算隔离',
    description: '演示解析与批处理在 Worker 中的调度方式，主线程只负责进度与可取消任务。',
    href: null,
    available: false,
    tags: ['架构', '筹备中'],
    iconKey: 'cpu',
  },
]

export function toolsInCategory(categoryId: ToolCategoryId): ToolEntry[] {
  return toolEntries.filter(t => t.categoryId === categoryId)
}
