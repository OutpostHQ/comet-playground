"use client"

import React from "react"
import { useDesignStore } from "@/store/store"

export default function CometConfigTab() {
  const state = useDesignStore((state) => state.design)

  console.log(state)
  return <div>CometConfigTab</div>
}
