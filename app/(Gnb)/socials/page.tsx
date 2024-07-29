'use client'

/* eslint-disable @typescript-eslint/no-use-before-define */
import mockSocialProps from '@/components/Gnb/moc'
import { GatheringCardList, Pagination, SortButtons } from '@/components/index'
import { Social } from '@/components/MypageCards/MypageCard'
import Image, { StaticImageData } from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import curlyArrowImage from '@/public/images/svgs/curlyArrow.svg'
import doodleImage from '@/public/images/svgs/doodle.svg'
import handsImage from '@/public/images/pngs/hands.png'
import calendarImage from '@/public/images/pngs/calendar.png'

function SocialsListPage() {
  const searchParams = useSearchParams()
  const [socialsData, setSocialsData] = useState<Social[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [sort, setSort] = useState('최신순')

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const slicedSocialsData = socialsData.slice(
    (currentPage - 1) * 24,
    currentPage * 24,
  )

  const handleClickPopularity = () => {
    setSort('인기순')
  }
  const handleClickLatest = () => {
    setSort('최신순')
  }

  const titleText =
    searchParams.get('type') === 'closed' ? '모집 마감' : '모집 중'

  const description =
    searchParams.get('type') === 'closed'
      ? '모집 완료! 앞으로의 만남을 기다려요'
      : '공통 관심사를 가진 사람들과의 모임, 지금 모집중!'

  const bannerImage =
    searchParams.get('type') === 'closed' ? calendarImage : handsImage

  useEffect(() => {
    if (sort === '인기순') {
      socialsData.sort((a, b) => {
        return (
          b.participantCount.currentPeople - a.participantCount.currentPeople
        )
      })
    } else if (sort === '최신순') {
      socialsData.sort((a, b) => {
        return (
          new Date(b.gatheringDate).getTime() -
          new Date(a.gatheringDate).getTime()
        )
      })
    }
  }, [sort, socialsData])

  useEffect(() => {
    const fetchSocialsData = [
      ...mockSocialProps,
      ...mockSocialProps,
      ...mockSocialProps,
      ...mockSocialProps,
      ...mockSocialProps,
      ...mockSocialProps,
    ]

    setSocialsData(fetchSocialsData)
  }, [])

  return (
    <div className="flex w-full flex-col items-center gap-80pxr px-20pxr pb-160pxr pt-40pxr">
      <div className="flex w-full max-w-1180pxr flex-col">
        <Banner
          titleText={titleText}
          description={description}
          bannerImage={bannerImage}
        />
        <h1 className="mt-80pxr text-gray-10 font-headline-03 mb:mt-60pxr max862Min480:mt-60pxr">
          {titleText}
        </h1>
        <div className="mt-40pxr flex justify-end">
          <SortButtons
            sort={sort}
            onClickLatest={handleClickLatest}
            onClickPopularity={handleClickPopularity}
          />
        </div>
        <div className="mt-24pxr w-full">
          <GatheringCardList data={slicedSocialsData} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={socialsData.length / 24}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default SocialsListPage

function Banner({
  titleText,
  description,
  bannerImage,
}: {
  titleText: string
  description: string
  bannerImage: StaticImageData
}) {
  const searchParams = useSearchParams()

  return (
    <div className="relative flex h-200pxr w-full max-w-1180pxr overflow-hidden rounded-[0.625rem] border border-gray-04 bg-gray-01 mb:bg-primary max862Min480:bg-primary">
      <div className="absolute bottom-0pxr left-0pxr right-0pxr top-0pxr hidden h-200pxr w-440pxr opacity-[0.2] mb:block max862Min480:block">
        <Image src={doodleImage} width={409} height={200} alt="doodle image" />
      </div>
      <Image
        className="absolute left-80pxr top-31pxr mb:hidden max862Min480:hidden"
        src={curlyArrowImage}
        width={60.224}
        height={63.025}
        alt="curly arrow image"
      />
      <div className="z-10 ml-100pxr mt-62pxr mb:ml-24pxr mb:mr-24pxr mb:mt-52pxr max862Min480:ml-24pxr max862Min480:mr-24pxr max862Min480:mt-52pxr">
        <h2 className="text-60pxr font-extrabold leading-[120%] text-black mb:text-50pxr max862Min480:text-50pxr">
          {titleText}
        </h2>
        <p className="mt-10pxr text-20pxr font-medium leading-[120%] text-black mb:text-16pxr max862Min480:mt-16pxr max862Min480:text-16pxr">
          {description}
        </p>
      </div>
      <Image
        className={`absolute right-66pxr top-1/2 -translate-y-1/2 mb:hidden tb:right-46pxr max862Min480:hidden ${searchParams.get('type') === 'recruiting' ? '!right-83pxr tb:!right-63pxr' : ''}`}
        src={bannerImage}
        width={311}
        height={311}
        quality={100}
        alt="hand image"
      />
    </div>
  )
}
