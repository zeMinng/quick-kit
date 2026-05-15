import { Palette } from 'lucide-react'
import ToolHeader from '@/widgets/tool-header'
import { ColorPickWorkbench } from '@/pages/tools/color-pick/components/ColorPickWorkbench/ColorPickWorkbench'
import { toolEntries } from '@/configs/tools'
import './index.scss'

const colorPickTool = toolEntries.find(t => t.id === 'color-pick')!

const ColorPickPage: React.FC = () => (
  <div className="color-pick-page">
    <ToolHeader
      info={{ title: colorPickTool.name, description: colorPickTool.description }}
      icon={<Palette size={22} strokeWidth={1.75} />}
    />
    <ColorPickWorkbench />
  </div>
)

export default ColorPickPage
