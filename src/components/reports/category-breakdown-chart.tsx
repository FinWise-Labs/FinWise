"use client"

import { useEffect, useRef } from "react"

export default function CategoryBreakdownChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Sample data for pie chart
    const data = [
      { label: "Housing", value: 42, color: "#3b82f6" },
      { label: "Food", value: 16, color: "#10b981" },
      { label: "Utilities", value: 11, color: "#f59e0b" },
      { label: "Transportation", value: 9, color: "#8b5cf6" },
      { label: "Entertainment", value: 8, color: "#ef4444" },
      { label: "Shopping", value: 7, color: "#ec4899" },
      { label: "Other", value: 7, color: "#6b7280" },
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

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}

