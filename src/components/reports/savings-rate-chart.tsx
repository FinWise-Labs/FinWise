"use client"

import { useEffect, useRef } from "react"

export default function SavingsRateChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for line chart
    const data = [
      { month: "Oct", rate: 32.1 },
      { month: "Nov", rate: 34.5 },
      { month: "Dec", rate: 30.2 },
      { month: "Jan", rate: 31.8 },
      { month: "Feb", rate: 32.2 },
      { month: "Mar", rate: 39.3 },
    ]

    const startX = 50
    const endX = canvas.width - 50
    const bottomY = canvas.height - 50
    const topY = 30
    const xStep = (endX - startX) / (data.length - 1)

    const maxValue = 50 // Max savings rate to show (50%)
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
      const y = bottomY - i * 10 * scale
      ctx.moveTo(startX, y)
      ctx.lineTo(endX, y)

      // Draw y-axis labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "right"
      ctx.fillText(`${i * 10}%`, startX - 10, y + 3)
    }
    ctx.strokeStyle = "#e5e7eb"
    ctx.stroke()

    // Draw line
    ctx.beginPath()
    data.forEach((item, index) => {
      const x = startX + index * xStep
      const y = bottomY - item.rate * scale

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }

      // Draw x-axis labels
      ctx.fillStyle = "#6b7280"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x, bottomY + 15)
    })
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw points
    data.forEach((item, index) => {
      const x = startX + index * xStep
      const y = bottomY - item.rate * scale

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()
      ctx.strokeStyle = "#fff"
      ctx.lineWidth = 1
      ctx.stroke()

      // Draw rate values above points
      ctx.fillStyle = "#000"
      ctx.textAlign = "center"
      ctx.fillText(`${item.rate}%`, x, y - 10)
    })
  }, [])

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}

