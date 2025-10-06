"use client"

import { AppLayout } from '@/components/app-layout'
import { AIChat } from '@/components/ai-chat'
import { Card } from '@/components/ui/card'

export default function ChatPage() {
  return (
    <AppLayout>
      <div className="h-full flex items-start justify-center pt-1 pb-6 px-6">
        {/* Chat Container - Card centralizado */}
        <Card className="w-full max-w-4xl h-[calc(100vh-4rem)] flex flex-col shadow-lg">
          <AIChat className="flex-1" />
        </Card>
      </div>
    </AppLayout>
  )
}