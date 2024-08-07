import { KakaoMap } from './index'

interface ILocationMapProps {
  location: string
  lat: number
  lng: number
}

function LocationMap({ location, lat, lng }: ILocationMapProps) {
  return (
    <>
      <h2 className="text-gray-10 font-title-04">위치</h2>
      <p className="mt-8pxr text-gray-08 font-body-02">{location}</p>
      <div className="mt-24pxr w-full overflow-hidden rounded-[0.3125rem] border border-gray-04">
        <KakaoMap lat={lat} lng={lng} />
      </div>
    </>
  )
}

export default LocationMap
