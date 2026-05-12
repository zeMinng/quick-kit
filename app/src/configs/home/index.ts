import { Braces, Cpu, Image } from 'lucide-react'

export const HeroConfig = {
  heading: '文件留在本地，\n常用能力不打折。',
  description: '是一套纯前端的实用工具集合：无自有后端、无强制上传。适合对隐私敏感、又希望「点开即用」的团队与个人。',
} as const

export const ProductSignals = [
  { label: '使用门槛', value: '开箱即用，无需安装' },
  { label: '交付形态', value: '支持离线独立使用' },
  { label: '开源许可', value: 'MIT 协议，支持 Fork 自建' },
  { label: '数据路径', value: '本地浏览器运行，默认不上传数据' },
]

// const CapabilityCards = [
//   {
//     title: '极致响应',
//     description: '零延迟本地处理，所有操作均在浏览器中完成。',
//     icon: Zap,
//   },
//   {
//     title: '隐私至上',
//     description: '无服务器设计，您的文件永不离开您的设备。',
//     icon: Lock,
//   },
//   {
//     title: '日常工具',
//     description: '界面简洁、操作轻量，适合反复打开的效率工具场景。',
//     icon: Globe,
//   },
// ]

export const CapabilityCards = [
  {
    title: '图像与媒体',
    description: '面向日常素材流：格式互转、尺寸调整、智能压缩与网格拼接。处理管线走 Canvas，预览与参数调整同步可见。',
    icon: Image,
  },
  {
    title: 'JSON 与结构化数据',
    description: '格式化、校验、压缩与展示模式切换；结果支持一键复制。逻辑在浏览器内完成，适合接口联调与日志整理。',
    icon: Braces,
  },
  {
    title: '性能与工程底座',
    description: '重计算放入 Web Worker，避免阻塞主线程交互。后续将把解析与转换热点逐步迁到 Rust + WebAssembly，以接近原生的吞吐。',
    icon: Cpu,
  },
]

export const ToolCatalog = [
  {
    id: 'json',
    name: 'JSON 工作台',
    description: '格式化、校验、压缩、转义与美化选项；适合在发布前快速过一遍 payload。',
    href: '/tools/json',
    actionLabel: '打开工具',
    available: true,
  },
  {
    id: 'image',
    name: '图像工具组',
    description: '互转、裁切、拼接与压缩等能力正在按模块合入主线；进度与需求可在 GitHub 跟踪。',
    href: null,
    actionLabel: null,
    available: false,
  },
] as const