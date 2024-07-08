'use client'

import AnimatedProgress from './AnimatedProgress'

interface PeopleCounterProps {
  current: number
  min: number
  max: number
}

/**
 * 참여중인 사람들 수를 나타내는 컴포넌트 (나중에 색상변경, 크기조정필요)
 * @param current 현재인원
 * @param min 최소인원
 * @param max 최대인원
 */

function PeopleCounter({ current, min, max }: PeopleCounterProps) {
  return (
    <div className="flex h-fit justify-center">
      <div>
        <div className="flex w-432pxr flex-col gap-8pxr">
          <AnimatedProgress
            min={min}
            current={current}
            max={max}
            key="프로그레스바"
          />
          <div className="flex justify-between">
            <p className="text-12pxr text-neutral-500">최소인원 {min}명</p>
            <p className="text-12pxr text-neutral-500">최대인원 {max}명</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeopleCounter
