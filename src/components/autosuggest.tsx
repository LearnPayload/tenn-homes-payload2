"use client"

import { useState, useEffect, useRef } from "react"
import { useFloating, autoUpdate, offset, flip, shift, size } from "@floating-ui/react"
import { Input } from "./ui/input"
import { cn } from "@/lib/utils"
import { Building2Icon, HomeIcon, MailboxIcon, PinIcon } from "lucide-react"
import { LocationSuggestion } from "@/types"

interface AutosuggestProps extends Omit<React.ComponentProps<"input">, "onChange" | "onSelect"> {
  onSelect?: (suggestion: LocationSuggestion) => void
  onChange?: (value: string) => void
  placeholder?: string
  debounceMs?: number
}

const fetchSuggestions = async (query: string): Promise<LocationSuggestion[]> => {
  if (query.length < 2) return []

  const response = await fetch(`/api/autosuggest?query=${encodeURIComponent(query)}`)
  if (!response.ok) {
    return []
  }
  const data: LocationSuggestion[] = await response.json()
  return data
}

export const Autosuggest = ({
  className,
  onSelect,
  onChange,
  placeholder = "Search by address, city, or zip code",
  debounceMs = 300,
  defaultValue = "",
  ...props
}: AutosuggestProps) => {
  const [query, setQuery] = useState<string>(String(defaultValue))
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          })
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  })

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    if (query.length < 2) {
      setSuggestions([])
      setIsOpen(false)
      return
    }

    setIsLoading(true)
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await fetchSuggestions(query)
        setSuggestions(results)
        setSelectedIndex(-1)
      } catch (error) {
        console.error("Error fetching suggestions:", error)
        setSuggestions([])
        setIsOpen(false)
      } finally {
        setIsLoading(false)
      }
    }, debounceMs)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, debounceMs])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length >= 2)
    onChange?.(value)
  }

  const handleSelectSuggestion = (suggestion: LocationSuggestion) => {
    setQuery(suggestion.display)
    setIsOpen(false)
    setSelectedIndex(-1)
    onSelect?.(suggestion)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0) {
          handleSelectSuggestion(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setSelectedIndex(-1)
        break
    }
  }

  const getSuggestionIcon = (type: LocationSuggestion["type"]) => {
    switch (type) {
      case "address":
        return <HomeIcon size={12} />
      case "city":
        return <Building2Icon size={12} />
      case "zip":
        return <MailboxIcon size={12} />
      default:
        return <PinIcon size={12} />
    }
  }

  return (
    <div className="relative">
      <Input
        ref={refs.setReference}
        className={className}
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        {...props}
      />

      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="z-50 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading ? (
            <div className="px-3 py-2 text-sm text-gray-500">Searching...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                className={cn(
                  "w-full text-left px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2",
                  index === selectedIndex && "bg-gray-100",
                )}
                onClick={() => handleSelectSuggestion(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-base">{getSuggestionIcon(suggestion.type)}</span>
                <span>{suggestion.display}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}
