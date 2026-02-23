import Image from 'next/image'

type Author = {
  name: string
  bio: string
  avatarUrl: string
}

export function AuthorProfile({ author }: { author: Author }) {
  return (
    <div className="flex items-center gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
      <Image
        src={author.avatarUrl}
        alt={author.name}
        width={64}
        height={64}
        className="rounded-full object-cover"
        onError={(e) => {
          e.currentTarget.src = '/images/avatar.png'
        }}
      />
      <div>
        <p className="font-bold text-neutral-900 dark:text-neutral-100">
          {author.name}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {author.bio}
        </p>
      </div>
    </div>
  )
}
