import { Braces } from 'lucide-react'
import ToolHeader from '@/widgets/tool-header'
import { JsonEditor } from '@/features/json'
import { toolEntries } from '@/configs/tools'
import './index.scss'

const JsonTool = toolEntries.find(t => t.id === 'json')!

const JsonPage: React.FC = () => (
  <div className="json-page">
    <ToolHeader
      info={{title: JsonTool.name, description: JsonTool.description }}
      icon={<Braces size={22} strokeWidth={1.75} />}
    />

    <JsonEditor />
  </div>
)

export default JsonPage
