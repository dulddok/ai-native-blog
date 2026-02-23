'use client'

import { useEffect, useState } from 'react'

type LikeButtonProps = {
  slug: string
}

export function LikeButton({ slug }: LikeButtonProps) {
  const [likes, setLikes] = useState<number>(0)
  const [liked, setLiked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const storageKey = `liked:${slug}`

  useEffect(() => {
    // Load current like count from API
    fetch(`/api/likes/${slug}`)
      .then((res) => res.json())
      .then((data) => setLikes(data.likes))
      .catch(() => {})

    // Check if user already liked this post
    setLiked(localStorage.getItem(storageKey) === 'true')
  }, [slug, storageKey])

  async function handleClick() {
    if (loading) return
    setLoading(true)

    try {
      if (liked) {
        const res = await fetch(`/api/likes/${slug}`, { method: 'DELETE' })
        const data = await res.json()
        setLikes(data.likes)
        setLiked(false)
        localStorage.removeItem(storageKey)
      } else {
        const res = await fetch(`/api/likes/${slug}`, { method: 'POST' })
        const data = await res.json()
        setLikes(data.likes)
        setLiked(true)
        localStorage.setItem(storageKey, 'true')
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2 mt-8">
      <button
        onClick={handleClick}
        disabled={loading}
        aria-label={liked ? '좋아요 취소' : '좋아요'}
        className={[
          'flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-400',
          liked
            ? 'bg-red-50 border-red-300 text-red-600 dark:bg-red-950 dark:border-red-700 dark:text-red-400'
            : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:border-red-300 hover:text-red-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-red-700 dark:hover:text-red-400',
          loading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <span
          className={`text-lg transition-transform duration-150 ${liked ? 'scale-125' : 'scale-100'}`}
          aria-hidden="true"
        >
          {liked ? '❤️' : '🤍'}
        </span>
        <span>{likes}</span>
      </button>
    </div>
  )
}
