"use client"

import { useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ExpenseChart() {
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const lineChartRef = useRef<HTMLCanvasElement>(null)

  // Draw pie chart for category breakdown
  useEffect(() => {
    const canvas = pieChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for pie chart
    const data = [
      { label: "Housing", value: 35, color: "#3b82f6" },
      { label: "Food", value: 20, color: "#10b981" },
      { label: "Transportation", value: 15, color: "#f59e0b" },
      { label: "Entertainment", value: 10, color: "#8b5cf6" },
      { label: "Utilities", value: 12, color: "#ef4444" },
      { label: "Other", value: 8, color: "#6b7280" },
    ]

    // Draw pie chart
    const total = data.reduce((sum, item) => sum + item.value, 0)
    let startAngle = 0
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw legend
    const legendX = 20
    let legendY = canvas.height - data.length * 25

    data.forEach((item) => {
      ctx.fillStyle = item.color
      ctx.fillRect(legendX, legendY, 15, 15)

      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.fillText(`${item.label}: ${item.value}%`, legendX + 25, legendY + 12)

      legendY += 25
    })
  }, [])

  // Draw bar chart for monthly comparison
  useEffect(() => {
    const canvas = barChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for bar chart
    const data = [
      { month: "Jan", amount: 2800 },
      { month: "Feb", amount: 2650 },
      { month: "Mar", amount: 2900 },
      { month: "Apr", amount: 2750 },
      { month: "May", amount: 2500 },
      { month: "Jun", amount: 2400 },
    ]

    const barWidth = 40
    const spacing = 30
    const startX = 50
    const bottomY = canvas.height - 50
    const maxValue = Math.max(...data.map((item) => item.amount))
    const scale = (canvas.height - 100) / maxValue

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(30, 20)
    ctx.lineTo(30, bottomY)
    ctx.lineTo(canvas.width - 20, bottomY)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Draw bars
    data.forEach((item, index) => {
      const x = startX + index * (barWidth + spacing)
      const barHeight = item.amount * scale
      const y = bottomY - barHeight

      ctx.fillStyle = "#3b82f6"
      ctx.fillRect(x, y, barWidth, barHeight)

      // Draw month label
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x + barWidth / 2, bottomY + 20)

      // Draw amount on top of bar
      ctx.fillText("$" + item.amount, x + barWidth / 2, y - 10)
    })
  }, [])

  // Draw line chart for spending trend
  useEffect(() => {
    const canvas = lineChartRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for line chart
    const data = [
      { day: "1", amount: 120 },
      { day: "5", amount: 250 },
      { day: "10", amount: 180 },
      { day: "15", amount: 310 },
      { day: "20", amount: 90 },
      { day: "25", amount: 150 },
      { day: "30", amount: 200 },
    ]

    const startX = 50
    const endX = canvas.width - 50
    const bottomY = canvas.height - 50
    const topY = 30
    const xStep = (endX - startX) / (data.length - 1)

    const maxValue = Math.max(...data.map((item) => item.amount))
    const scale = (bottomY - topY) / maxValue

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(startX, topY)
    ctx.lineTo(startX, bottomY)
    ctx.lineTo(endX, bottomY)
    ctx.strokeStyle = "#d1d5db"
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    for (let i = 0; i <= 5; i++) {
      const y = bottomY - (i * (bottomY - topY)) / 5
      ctx.moveTo(startX, y)
      ctx.lineTo(endX, y)

      // Draw y-axis labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "right"
      ctx.fillText("$" + ((i * maxValue) / 5).toFixed(0), startX - 10, y + 3)
    }
    ctx.strokeStyle = "#e5e7eb"
    ctx.stroke()

    // Draw line
    ctx.beginPath()
    data.forEach((item, index) => {
      const x = startX + index * xStep
      const y = bottomY - item.amount * scale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw x-axis labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText("Day " + item.day, x, bottomY + 15)
    })
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    data.forEach((item, index) => {
      const x = startX + index * xStep
      const y = bottomY - item.amount * scale

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 1
      ctx.stroke()
    })
  }, [])

  return (
    <Tabs defaultValue="categories">
      <TabsList className="mb-4">
        <TabsTrigger value="categories">Categories</TabsTrigger>
        <TabsTrigger value="monthly">Monthly</TabsTrigger>
        <TabsTrigger value="trend">Daily Trend</TabsTrigger>
      </TabsList>

      <TabsContent value="categories">
        <div className="w-full h-64 relative">
          <canvas ref={pieChartRef} width={500} height={250} className="w-full h-full" />
        </div>
        <div className="mt-4 text-sm text-center text-gray-500">
          Expense breakdown by category for the current month
        </div>
      </TabsContent>

      <TabsContent value="monthly">
        <div className="w-full h-64 relative">
          <canvas ref={barChartRef} width={500} height={250} className="w-full h-full" />
        </div>
        <div className="mt-4 text-sm text-center text-gray-500">Monthly expense comparison for the last 6 months</div>
      </TabsContent>

      <TabsContent value="trend">
        <div className="w-full h-64 relative">
          <canvas ref={lineChartRef} width={500} height={250} className="w-full h-full" />
        </div>
        <div className="mt-4 text-sm text-center text-gray-500">Daily spending trend for the current month</div>
      </TabsContent>
    </Tabs>
  )
}

