"use client"

import { useEffect, useRef } from "react"

export default function IncomeVsExpenseChart() {
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
      { month: "Oct", income: 4200, expense: 2800 },
      { month: "Nov", income: 4200, expense: 2650 },
      { month: "Dec", income: 4500, expense: 3100 },
      { month: "Jan", income: 4200, expense: 2900 },
      { month: "Feb", income: 4200, expense: 2750 },
      { month: "Mar", income: 4675, expense: 2840 },
    ]

    const barWidth = 30
    const spacing = 40
    const startX = 50
    const bottomY = canvas.height - 50
    const maxValue = Math.max(...data.map((item) => Math.max(item.income, item.expense)))
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
      const x = startX + index * (barWidth * 2 + spacing)

      // Income bar
      const incomeHeight = item.income * scale
      const incomeY = bottomY - incomeHeight
      ctx.fillStyle = "#10b981"
      ctx.fillRect(x, incomeY, barWidth, incomeHeight)

      // Expense bar
      const expenseHeight = item.expense * scale
      const expenseY = bottomY - expenseHeight
      ctx.fillStyle = "#ef4444"
      ctx.fillRect(x + barWidth, expenseY, barWidth, expenseHeight)

      // Draw month label
      ctx.fillStyle = "#000"
      ctx.font = "12px Arial"
      ctx.textAlign = "center"
      ctx.fillText(item.month, x + barWidth, bottomY + 20)
    })

    // Draw legend
    ctx.fillStyle = "#10b981"
    ctx.fillRect(canvas.width - 100, 30, 15, 15)
    ctx.fillStyle = "#000"
    ctx.textAlign = "left"
    ctx.fillText("Income", canvas.width - 80, 42)

    ctx.fillStyle = "#ef4444"
    ctx.fillRect(canvas.width - 100, 55, 15, 15)
    ctx.fillStyle = "#000"
    ctx.fillText("Expense", canvas.width - 80, 67)
  }, [])

  return (
    <div className="w-full h-64 relative">
      <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" />
    </div>
  )
}

