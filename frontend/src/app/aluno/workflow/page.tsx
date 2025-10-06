'use client'

import React from 'react'
import { AppLayout } from '@/components/app-layout'
import { WorkflowCanvas } from '@/components/workflow-canvas'
import { WorkflowNodeData } from '@/components/workflow-node'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Play, 
  Save, 
  Download, 
  Upload,
  Database,
  Mail,
  Webhook,
  Timer,
  Filter,
  Code,
  MessageSquare,
  FileText
} from 'lucide-react'

interface Connection {
  id: string
  fromNodeId: string
  toNodeId: string
  fromPoint: { x: number; y: number }
  toPoint: { x: number; y: number }
}

const nodeTemplates = [
  {
    type: 'trigger' as const,
    title: 'Webhook',
    icon: <Webhook className="w-4 h-4" />,
    description: 'Receives data via HTTP'
  },
  {
    type: 'trigger' as const,
    title: 'Timer',
    icon: <Timer className="w-4 h-4" />,
    description: 'Executes at intervals'
  },
  {
    type: 'action' as const,
    title: 'Send Email',
    icon: <Mail className="w-4 h-4" />,
    description: 'Sends email notifications'
  },
  {
    type: 'action' as const,
    title: 'Save to Database',
    icon: <Database className="w-4 h-4" />,
    description: 'Stores data in database'
  },
  {
    type: 'condition' as const,
    title: 'Filter',
    icon: <Filter className="w-4 h-4" />,
    description: 'Filters data based on conditions'
  },
  {
    type: 'action' as const,
    title: 'Execute Code',
    icon: <Code className="w-4 h-4" />,
    description: 'Executes custom code'
  }
]

export default function WorkflowPage() {
  const [nodes, setNodes] = React.useState<WorkflowNodeData[]>([
    {
      id: '1',
      title: 'Input Webhook',
      type: 'trigger',
      status: 'active',
      description: 'Receives sales data',
      icon: <Webhook className="w-4 h-4" />,
      position: { x: 100, y: 100 },
      inputs: 0,
      outputs: 1
    },
    {
      id: '2',
      title: 'Process Data',
      type: 'action',
      status: 'active',
      description: 'Validates and formats data',
      icon: <Code className="w-4 h-4" />,
      position: { x: 450, y: 100 },
      inputs: 1,
      outputs: 2
    },
    {
      id: '3',
      title: 'Save to Database',
      type: 'action',
      status: 'active',
      description: 'Stores in database',
      icon: <Database className="w-4 h-4" />,
      position: { x: 800, y: 50 },
      inputs: 1,
      outputs: 0
    },
    {
      id: '4',
      title: 'Send Notification',
      type: 'action',
      status: 'active',
      description: 'Notifies via email',
      icon: <Mail className="w-4 h-4" />,
      position: { x: 800, y: 200 },
      inputs: 1,
      outputs: 0
    }
  ])

  const [connections, setConnections] = React.useState<Connection[]>([
    {
      id: 'conn1',
      fromNodeId: '1',
      toNodeId: '2',
      fromPoint: { x: 0, y: 0 },
      toPoint: { x: 0, y: 0 }
    },
    {
      id: 'conn2',
      fromNodeId: '2',
      toNodeId: '3',
      fromPoint: { x: 0, y: 0 },
      toPoint: { x: 0, y: 0 }
    },
    {
      id: 'conn3',
      fromNodeId: '2',
      toNodeId: '4',
      fromPoint: { x: 0, y: 0 },
      toPoint: { x: 0, y: 0 }
    }
  ])

  const [isRunning, setIsRunning] = React.useState(false)

  const handleNodeUpdate = (nodeId: string, updates: Partial<WorkflowNodeData>) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, ...updates } : node
    ))
  }

  const handleConnectionCreate = (fromNodeId: string, toNodeId: string) => {
    const newConnection: Connection = {
      id: `conn_${Date.now()}`,
      fromNodeId,
      toNodeId,
      fromPoint: { x: 0, y: 0 },
      toPoint: { x: 0, y: 0 }
    }
    setConnections(prev => [...prev, newConnection])
  }

  const handleConnectionDelete = (connectionId: string) => {
    setConnections(prev => prev.filter(conn => conn.id !== connectionId))
  }

  const addNewNode = (template: typeof nodeTemplates[0]) => {
    const newNode: WorkflowNodeData = {
      id: `node_${Date.now()}`,
      title: template.title,
      type: template.type,
      status: 'inactive',
      description: template.description,
      icon: template.icon,
      position: { x: 200 + Math.random() * 300, y: 200 + Math.random() * 200 },
      inputs: template.type === 'trigger' ? 0 : 1,
      outputs: 1
    }
    setNodes(prev => [...prev, newNode])
  }

  const runWorkflow = () => {
    setIsRunning(true)
    // Simular execução do workflow
    nodes.forEach((node, index) => {
      setTimeout(() => {
        handleNodeUpdate(node.id, { status: 'running' })
        setTimeout(() => {
          handleNodeUpdate(node.id, { status: 'active' })
          if (index === nodes.length - 1) {
            setIsRunning(false)
          }
        }, 1000)
      }, index * 500)
    })
  }

  return (
    <AppLayout>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Workflow</h1>
                <p className="text-gray-600 dark:text-gray-300">Create and manage automation flows</p>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge variant={isRunning ? "default" : "secondary"}>
                  {isRunning ? 'Running' : 'Stopped'}
                </Badge>
                
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                
                <Button variant="outline" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                
                <Button 
                  onClick={runWorkflow} 
                  disabled={isRunning}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {isRunning ? 'Running...' : 'Execute'}
                </Button>
              </div>
            </div>
        </div>

        <div className="flex-1 flex">
          {/* Sidebar com templates */}
          <div className="w-80 bg-white border-r p-4 overflow-y-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Nodes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nodeTemplates.map((template, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => addNewNode(template)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        {template.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{template.title}</div>
                        <div className="text-xs text-gray-500">{template.description}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {template.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Total Nodes:</span>
                  <span className="font-medium">{nodes.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Connections:</span>
                  <span className="font-medium">{connections.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Active Nodes:</span>
                  <span className="font-medium text-green-600">
                    {nodes.filter(n => n.status === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Execution:</span>
                  <span className="font-medium text-gray-500">Never</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Canvas principal */}
          <div className="flex-1">
            <WorkflowCanvas
              nodes={nodes}
              connections={connections}
              onNodeUpdate={handleNodeUpdate}
              onConnectionCreate={handleConnectionCreate}
              onConnectionDelete={handleConnectionDelete}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}