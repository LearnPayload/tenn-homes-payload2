"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MapStyle } from "@/lib/map-styles"
import { Palette } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MapStyleSwitcherProps {
  currentStyle: MapStyle
  onStyleChange: (style: MapStyle) => void
}

const styleLabels: Record<MapStyle, string> = {
  default: "Default",
  dark: "Dark Mode",
  light: "Light & Clean",
  retro: "Retro",
  silver: "Silver/Monochrome",
  minimal: "Minimal",
  "real-estate": "Real Estate Focus",
}

export const MapStyleSwitcher = ({ currentStyle, onStyleChange }: MapStyleSwitcherProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          {styleLabels[currentStyle]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(styleLabels).map(([style, label]) => (
          <DropdownMenuItem
            key={style}
            onClick={() => onStyleChange(style as MapStyle)}
            className={currentStyle === style ? "bg-accent" : ""}
          >
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}