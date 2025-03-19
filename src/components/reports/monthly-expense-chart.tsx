"use client"

import { useEffect, useRef } from "react"

export default function MonthlyExpenseChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for bar chart
    const data = [
      { month: "Oct", amount: 2800 },
      { month: "Nov", amount: 2650 },
      { month: "Dec", amount: 3100 },
      { month: "Jan", amount: 2900 },
      { month: "Feb", amount: 2750 },
      { month: "Mar", amount: 2840 },
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

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}

