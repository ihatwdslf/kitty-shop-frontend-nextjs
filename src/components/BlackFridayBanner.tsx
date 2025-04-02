"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import RotatingText from "@/components/RotatingText/RotatingText";

// Define the sale end date - eg: new Date('2024-12-31T23:59:59');
const saleEndDate = new Date(
  Date.now() + 9 * 60 * 60 * 1000 + 45 * 60 * 1000 + 24 * 1000
) // Setting 9h 45m 24s from now for demo purposes

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
  isExpired: boolean
}

export default function BlackFridayBanner() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = saleEndDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      })
    }

    // Calculate immediately and then every second
    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  if (timeLeft.isExpired) return null

  return (
    <div className="container p-10">
      <div className="flex gap-2 md:items-center">
        <div className="flex grow gap-3 md:items-center">
          <div className="flex gap-15 grow flex-col justify-between gap-3 md:flex-row md:items-center">
            <div className="space-y-0.5">
              <p className="text-xl font-medium flex gap-1 items-center">
                Ми пропонуємо вам
                <RotatingText
                    texts={['асортимент натуральних косметичних засобів', 'Bits', 'Is', 'Cool!']}
                    mainClassName="px-2 sm:px-2 md:px-3 bg-rose-400 overflow-hidden justify-center rounded-lg p-1"
                    staggerFrom={"last"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
              </p>
              <p className="text-muted-foreground text-lg">
                It kicks off today and is available for just 24
                hours—don&lsquo;t miss out!
              </p>
            </div>
            <div className="flex gap-3 max-md:flex-wrap">
              <div className="divide-primary-foreground flex items-center divide-x rounded-md text-3xl tabular-nums">
                {timeLeft.days > 0 && (
                  <span className="flex h-8 items-center justify-center p-2">
                    {timeLeft.days}
                    <span>d</span>
                  </span>
                )}
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.hours.toString().padStart(2, "0")}
                  <span>h</span>
                </span>
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.minutes.toString().padStart(2, "0")}
                  <span>m</span>
                </span>
                <span className="flex h-8 items-center justify-center p-2">
                  {timeLeft.seconds.toString().padStart(2, "0")}
                  <span>s</span>
                </span>
              </div>
              <Button size="sm" className="text-sm bg-rose-400 text-white hover:bg-rose-500 cursor-pointer">
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
