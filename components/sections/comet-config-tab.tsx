"use client"

import React from "react"
import { useStore } from "@/store/store"

export default function CometConfigTab() {
  const state = useStore((state) => state.design)

  console.log(state)
  return <div>CometConfigTab</div>
}
