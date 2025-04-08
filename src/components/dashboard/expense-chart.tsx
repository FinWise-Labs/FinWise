"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import chart from "../../../public/Pie-Chart.jpg";

export default function ExpenseChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // This is a placeholder for chart rendering
    // In a real implementation, you would use a library like Chart.js
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sample data for pie chart
    const data = [
      { label: "Housing", value: 35, color: "#3b82f6" },
      { label: "Food", value: 20, color: "#10b981" },
      { label: "Transportation", value: 15, color: "#f59e0b" },
      { label: "Entertainment", value: 10, color: "#8b5cf6" },
      { label: "Utilities", value: 12, color: "#ef4444" },
      { label: "Other", value: 8, color: "#6b7280" },
    ];

    // Draw pie chart
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;
    const radius = Math.min(canvas.width, canvas.height) / 2 - 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    data.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = item.color;
      ctx.fill();

      startAngle += sliceAngle;
    });

    // Draw legend
    const legendX = 20;
    let legendY = canvas.height - data.length * 25;

    data.forEach((item) => {
      ctx.fillStyle = item.color;
      ctx.fillRect(legendX, legendY, 15, 15);

      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(`${item.label}: ${item.value}%`, legendX + 25, legendY + 12);

      legendY += 25;
    });
  }, []);

  return (
    <div className="relative flex justify-center items-center">
  {/* <canvas ref={canvasRef} width={500} height={250} className="w-full h-full" /> */}
  <Image
    src={chart}
    width={400}
    height={400}
    alt="Financial Dashboard Preview"
    className=""
  />
</div>

  );
}
