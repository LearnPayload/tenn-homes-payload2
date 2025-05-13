export const PropertyFeatures = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold leading-none mb-4">Features</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h4 className="text-base font-semibold mb-3">Interior Features</h4>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>
                <span>CentralAir Conditioning</span>
              </li>
              <li>
                <span>Hardwood Floors</span>
              </li>
              <li>
                <span>Attached Garage</span>
              </li>
              <li>
                <span>Updated Kitchen</span>
              </li>
              <li>
                <span>Open Floor Plan</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-semibold mb-3">Exterior Features</h4>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>
                <span>Paved Driveway</span>
              </li>
              <li>
                <span>Private Backyard</span>
              </li>
              <li>
                <span>Fenced Yard</span>
              </li>
              <li>
                <span>Outdoor Seating</span>
              </li>
              <li>
                <span>Covered Porch</span>
              </li>
              <li>
                <span>Outdoor Lighting</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
