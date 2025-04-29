import { notFound } from 'next/navigation'
import { getPayload } from '../../../../lib/get-payload'

interface PropertyDetailPageProps {
  params: {
    id: string
  }
}

export default async function PropertyDetailPage({ params }: PropertyDetailPageProps) {
  const payload = await getPayload()
  const property = await payload.findByID({
    collection: 'properties',
    id: params.id,
    depth: 2, // This will populate relationships
  })

  if (!property) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{property.title}</h1>

      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Price</p>
            <p className="text-2xl font-bold">${property.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Status</p>
            <p className="text-lg font-medium">
              {property.listingStatus?.replace('-', ' ').toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <div className="prose max-w-none">
          {property.description.root.children.map((child: any, i) => (
            <p key={i}>{child.children[0].text}</p>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Address</p>
            <p className="text-lg">{property.address.street}</p>
            <p className="text-lg">
              {property.address.zipCode && typeof property.address.zipCode !== 'number' && (
                <>
                  {property.address.zipCode.city}, {property.address.zipCode.state_abbr}{' '}
                  {property.address.zipCode.code}
                </>
              )}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Coordinates</p>
            <p className="text-lg">
              Lat: {property.coordinates.latitude}, Long: {property.coordinates.longitude}
            </p>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Property Details</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-gray-600">Bedrooms</p>
            <p className="text-lg font-medium">{property.details.bedrooms}</p>
          </div>
          <div>
            <p className="text-gray-600">Bathrooms</p>
            <p className="text-lg font-medium">{property.details.bathrooms}</p>
          </div>
          <div>
            <p className="text-gray-600">Square Feet</p>
            <p className="text-lg font-medium">{property.details.squareFeet.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Property Type</p>
            <p className="text-lg font-medium">
              {property.details.propertyType.replace('-', ' ').toUpperCase()}
            </p>
          </div>
          {property.details.lotSize && (
            <div>
              <p className="text-gray-600">Lot Size</p>
              <p className="text-lg font-medium">{property.details.lotSize}</p>
            </div>
          )}
          {property.details.yearBuilt && (
            <div>
              <p className="text-gray-600">Year Built</p>
              <p className="text-lg font-medium">{property.details.yearBuilt}</p>
            </div>
          )}
          {property.details.heating && (
            <div>
              <p className="text-gray-600">Heating</p>
              <p className="text-lg font-medium">
                {property.details.heating.replace('-', ' ').toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interior Features */}
          <div>
            <h3 className="text-lg font-medium mb-2">Interior Features</h3>
            <ul className="list-disc list-inside">
              {property.interiorFeatures?.map((feature) => (
                <li
                  key={typeof feature === 'number' ? feature : feature.id}
                  className="text-gray-700"
                >
                  {typeof feature === 'number' ? feature : feature.name}
                </li>
              ))}
            </ul>
          </div>
          {/* Exterior Features */}
          <div>
            <h3 className="text-lg font-medium mb-2">Exterior Features</h3>
            <ul className="list-disc list-inside">
              {property.exteriorFeatures?.map((feature) => (
                <li
                  key={typeof feature === 'number' ? feature : feature.id}
                  className="text-gray-700"
                >
                  {typeof feature === 'number' ? feature : feature.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
