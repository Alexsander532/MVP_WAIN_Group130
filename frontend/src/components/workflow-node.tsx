'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  Play, 
  Pause, 
  MoreVertical,
  Circle
} from 'lucide-react'

export interface WorkflowNodeData {
  id: string
  title: string
  type: 'trigger' | 'action' | 'condition' | 'webhook'
  status: 'active' | 'inactive' | 'error' | 'running'
  description?: string
  icon?: React.ReactNode
  position: { x: number; y: number }
  inputs?: number
  outputs?: number
}

interface WorkflowNodeProps {
  node: WorkflowNodeData
  isSelected?: boolean
  onSelect?: (nodeId: string) => void
  onDrag?: (nodeId: string, position: { x: number; y: number }) => void
  onConnect?: (fromNodeId: string, toNodeId: string) => void
}

const getNodeColor = (type: WorkflowNodeData['type']) => {
  switch (type) {
    case 'trigger':
      return 'bg-green-50 dark:bg-green-900/70 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600'
    case 'action':
      return 'bg-blue-50 dark:bg-blue-900/70 border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-600'
    case 'condition':
      return 'bg-yellow-50 dark:bg-yellow-900/70 border-yellow-200 dark:border-yellow-700 hover:border-yellow-300 dark:hover:border-yellow-600'
    case 'webhook':
      return 'bg-purple-50 dark:bg-purple-900/70 border-purple-200 dark:border-purple-700 hover:border-purple-300 dark:hover:border-purple-600'
    default:
      return 'bg-gray-50 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
  }
}

const getStatusColor = (status: WorkflowNodeData['status']) => {
  switch (status) {
    case 'active':
      return 'bg-green-500'
    case 'inactive':
      return 'bg-gray-400'
    case 'error':
      return 'bg-red-500'
    case 'running':
      return 'bg-blue-500 animate-pulse'
    default:
      return 'bg-gray-400'
  }
}

export const WorkflowNode: React.FC<WorkflowNodeProps> = ({
  node,
  isSelected = false,
  onSelect,
  onDrag,
  onConnect
}) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click only
      setIsDragging(true)
      setDragStart({
        x: e.clientX - node.position.x,
        y: e.clientY - node.position.y
      })
      onSelect?.(node.id)
    }
  }

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    if (isDragging && onDrag) {
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      }
      onDrag(node.id, newPosition)
    }
  }, [isDragging, dragStart, node.id, onDrag])

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: node.position.x,
        top: node.position.y,
        zIndex: isSelected ? 10 : 1
      }}
      onMouseDown={handleMouseDown}
    >
      <Card 
        className={`
          w-64 transition-all duration-200 select-none
          ${getNodeColor(node.type)}
          ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow-md'}
          ${isDragging ? 'scale-105 shadow-xl' : ''}
        `}
      >
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(node.status)}`} />
              <Badge variant="outline" className="text-xs">
                {node.type}
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreVertical className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <CardTitle className="text-sm font-medium">{node.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {node.description && (
            <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">{node.description}</p>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {node.icon}
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {node.status === 'running' ? 'Running...' : 
                 node.status === 'active' ? 'Active' : 
                 node.status === 'error' ? 'Error' : 'Inactive'}
              </span>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {node.status === 'running' ? 
                  <Pause className="h-3 w-3" /> : 
                  <Play className="h-3 w-3" />
                }
              </Button>
            </div>
          </div>
        </CardContent>
        
        {/* Connection Points */}
        {node.inputs && node.inputs > 0 && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <Circle className="w-3 h-3 fill-gray-400 dark:fill-gray-500 text-gray-400 dark:text-gray-500 hover:fill-blue-500 hover:text-blue-500 dark:hover:fill-blue-400 dark:hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
        )}
        
        {node.outputs && node.outputs > 0 && (
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
            <Circle className="w-3 h-3 fill-gray-400 dark:fill-gray-500 text-gray-400 dark:text-gray-500 hover:fill-blue-500 hover:text-blue-500 dark:hover:fill-blue-400 dark:hover:text-blue-400 cursor-pointer transition-colors" />
          </div>
        )}
      </Card>
    </div>
  )
}