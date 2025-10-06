'use client'

import React from 'react'
import { WorkflowNode, WorkflowNodeData } from './workflow-node'

interface Connection {
  id: string
  fromNodeId: string
  toNodeId: string
  fromPoint: { x: number; y: number }
  toPoint: { x: number; y: number }
}

interface WorkflowCanvasProps {
  nodes: WorkflowNodeData[]
  connections: Connection[]
  onNodeUpdate: (nodeId: string, updates: Partial<WorkflowNodeData>) => void
  onConnectionCreate: (fromNodeId: string, toNodeId: string) => void
  onConnectionDelete: (connectionId: string) => void
  className?: string
}

export const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  connections,
  onNodeUpdate,
  onConnectionCreate,
  onConnectionDelete,
  className = ''
}) => {
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null)
  const [canvasOffset, setCanvasOffset] = React.useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = React.useState(false)
  const [panStart, setPanStart] = React.useState({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = React.useState(1)
  const canvasRef = React.useRef<HTMLDivElement>(null)

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId)
  }

  const handleNodeDrag = (nodeId: string, position: { x: number; y: number }) => {
    onNodeUpdate(nodeId, { position })
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodeId(null)
      setIsPanning(true)
      setPanStart({
        x: e.clientX - canvasOffset.x,
        y: e.clientY - canvasOffset.y
      })
    }
  }

  const handleCanvasMouseMove = React.useCallback((e: MouseEvent) => {
    if (isPanning) {
      setCanvasOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      })
    }
  }, [isPanning, panStart])

  const handleCanvasMouseUp = React.useCallback(() => {
    setIsPanning(false)
  }, [])

  React.useEffect(() => {
    if (isPanning) {
      document.addEventListener('mousemove', handleCanvasMouseMove)
      document.addEventListener('mouseup', handleCanvasMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleCanvasMouseMove)
        document.removeEventListener('mouseup', handleCanvasMouseUp)
      }
    }
  }, [isPanning, handleCanvasMouseMove, handleCanvasMouseUp])

  // Function to handle zoom via mouse scroll
  const handleWheel = React.useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    // Calculate new zoom level
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(0.1, Math.min(3, zoomLevel * zoomFactor))

    // Calculate new offset to keep zoom centered on mouse
    const zoomRatio = newZoom / zoomLevel
    const newOffsetX = mouseX - (mouseX - canvasOffset.x) * zoomRatio
    const newOffsetY = mouseY - (mouseY - canvasOffset.y) * zoomRatio

    setZoomLevel(newZoom)
    setCanvasOffset({ x: newOffsetX, y: newOffsetY })
  }, [zoomLevel, canvasOffset])

  // Add event listener for scroll
  React.useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        canvas.removeEventListener('wheel', handleWheel)
      }
    }
  }, [handleWheel])

  // Function to draw SVG connections
  const renderConnections = () => {
    return connections.map((connection) => {
      const fromNode = nodes.find(n => n.id === connection.fromNodeId)
      const toNode = nodes.find(n => n.id === connection.toNodeId)
      
      if (!fromNode || !toNode) return null

      const startX = (fromNode.position.x + 256) * zoomLevel + canvasOffset.x // 256 is the card width
      const startY = (fromNode.position.y + 80) * zoomLevel + canvasOffset.y // Middle of the card
      const endX = toNode.position.x * zoomLevel + canvasOffset.x
      const endY = (toNode.position.y + 80) * zoomLevel + canvasOffset.y

      // Calculate control points for a smooth curve
      const controlPointOffset = Math.abs(endX - startX) * 0.5
      const controlPoint1X = startX + controlPointOffset
      const controlPoint1Y = startY
      const controlPoint2X = endX - controlPointOffset
      const controlPoint2Y = endY

      const pathData = `M ${startX} ${startY} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${endX} ${endY}`

      return (
        <g key={connection.id}>
          <path
            d={pathData}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            className="hover:stroke-blue-600 dark:stroke-blue-400 dark:hover:stroke-blue-300 cursor-pointer transition-colors"
            onClick={() => onConnectionDelete(connection.id)}
          />
          {/* Arrow at the end of the line */}
          <polygon
            points={`${endX-8},${endY-4} ${endX},${endY} ${endX-8},${endY+4}`}
            fill="#3b82f6"
            className="hover:fill-blue-600 dark:fill-blue-400 dark:hover:fill-blue-300 transition-colors"
          />
        </g>
      )
    })
  }

  return (
    <div
      ref={canvasRef}
      className={`relative w-full h-full overflow-hidden bg-gray-50 dark:bg-gray-900 ${className}`}
      onMouseDown={handleCanvasMouseDown}
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
    >
      {/* Background grid */}
      <div 
        className="absolute inset-0 opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translate(${canvasOffset.x % 20}px, ${canvasOffset.y % 20}px)`
        }}
      />
      
      {/* Background grid for dark mode */}
      <div 
        className="absolute inset-0 opacity-0 dark:opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4b5563 1px, transparent 1px),
            linear-gradient(to bottom, #4b5563 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          transform: `translate(${canvasOffset.x % 20}px, ${canvasOffset.y % 20}px)`
        }}
      />

      {/* SVG for connections */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
      >
        <g className="pointer-events-auto">
          {renderConnections()}
        </g>
      </svg>

      {/* Nodes container */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: '0 0'
        }}
      >
        {nodes.map((node) => (
          <WorkflowNode
            node={node} key={node.id}
            {...node}
            isSelected={selectedNodeId === node.id}
            onSelect={handleNodeSelect}
            onDrag={handleNodeDrag}
            onConnect={onConnectionCreate}          />
        ))}
      </div>

      {/* Canvas information */}
      <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
        <div>Nodes: {nodes.length}</div>
        <div>Connections: {connections.length}</div>
        <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
      </div>

      {/* Canvas controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {/* Zoom In */}
        <button
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm transition-colors text-gray-700 dark:text-gray-300"
          onClick={() => setZoomLevel(prev => Math.min(3, prev * 1.2))}
          title="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        {/* Zoom Out */}
        <button
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm transition-colors text-gray-700 dark:text-gray-300"
          onClick={() => setZoomLevel(prev => Math.max(0.1, prev * 0.8))}
          title="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
        </button>

        {/* Reset View */}
        <button
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm transition-colors text-gray-700 dark:text-gray-300"
          onClick={() => {
            setCanvasOffset({ x: 0, y: 0 })
            setZoomLevel(1)
          }}
          title="Reset view"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        {/* Fit to Screen */}
        <button
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-2 shadow-sm transition-colors text-gray-700 dark:text-gray-300"
          onClick={() => {
            if (nodes.length === 0) return
            
            // Calculate node bounds
            const bounds = nodes.reduce((acc, node) => ({
              minX: Math.min(acc.minX, node.position.x),
              minY: Math.min(acc.minY, node.position.y),
              maxX: Math.max(acc.maxX, node.position.x + 256), // node width
              maxY: Math.max(acc.maxY, node.position.y + 160)  // node height
            }), { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity })

            const canvas = canvasRef.current
            if (!canvas) return

            const canvasRect = canvas.getBoundingClientRect()
            const padding = 50
            
            const contentWidth = bounds.maxX - bounds.minX
            const contentHeight = bounds.maxY - bounds.minY
            const availableWidth = canvasRect.width - padding * 2
            const availableHeight = canvasRect.height - padding * 2
            
            const scaleX = availableWidth / contentWidth
            const scaleY = availableHeight / contentHeight
            const newZoom = Math.min(scaleX, scaleY, 1) // não fazer zoom maior que 100%
            
            const centerX = (bounds.minX + bounds.maxX) / 2
            const centerY = (bounds.minY + bounds.maxY) / 2
            const canvasCenterX = canvasRect.width / 2
            const canvasCenterY = canvasRect.height / 2
            
            setZoomLevel(newZoom)
            setCanvasOffset({
              x: canvasCenterX - centerX * newZoom,
              y: canvasCenterY - centerY * newZoom
            })
          }}
          title="Ajustar à tela"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  )
}