import { Braces } from 'lucide-react'
import ToolHeader from '@/widgets/tool-header'

export const JsonWorkbench: React.FC = () => {
  return (
    <div className="json-workbench">
      <ToolHeader
        info={{
          title: 'JSON 工作台',
          description: '格式化、压缩、转义与反转义一站完成；数据留在本机，不经过服务器。'
        }}
        icon={<Braces size={22} strokeWidth={1.75} />}
      />
      {/* <div>json-workbench</div> */}
    </div>
  )
}
