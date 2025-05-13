import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Property } from '@/models/property'

import { Property as PropertyType } from '@/payload-types'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

async function fetchProperty(id: string) {
  const res = await fetch(`http://localhost:3000/api/properties/${id}`, {
    headers: await headers(),
  })
  if (!res.ok) return undefined
  return res.json()
}

export default async function PropertiesPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const data = (await fetchProperty(id)) as PropertyType

  if (!data) {
    return notFound()
  }

  const property = new Property(data)
  console.log({ property })
  const fullAddress = property.formattedAddress

  return (
    <div className="w-screen p-12 flex justify-center bg-accent text-sm">
      <div className="w-full max-w-lg grid gap-4">
        <Card className="gap-2">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">{property.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>
              Full address: <code className="text-sm bg-accent">{fullAddress}</code>
            </p>

            <p>URL: {property.url}</p>

            <div className="flex flex-row gap-3">
              <h3 className="font-bold">Features</h3>
              <ul>
                {property.features?.map((feature) => {
                  if (typeof feature === 'number') return null
                  return (
                    <li key={feature.id}>
                      {feature.name} (
                      <span className="capitalize text-muted-foreground">{feature.category}</span>)
                    </li>
                  )
                })}
              </ul>
            </div>
          </CardContent>
        </Card>
        <pre className="font-mono text-xs bg-amber-950/10 p-6 rounded-2xl">
          {JSON.stringify(property, null, 2)}
        </pre>
      </div>
    </div>
  )
}
