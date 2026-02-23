export type Author = {
  name: string
  bio: string
  avatarUrl: string
}

type AuthorProfileProps = {
  author: Author
}

type AuthorAvatarProps = {
  src: string
  alt: string
}

type AuthorInfoProps = {
  name: string
  bio: string
}

function AuthorAvatar({ src, alt }: AuthorAvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      width={64}
      height={64}
      className="rounded-full object-cover"
    />
  )
}

function AuthorInfo({ name, bio }: AuthorInfoProps) {
  return (
    <div>
      <p className="font-bold text-neutral-900 dark:text-neutral-100">
        {name}
      </p>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        {bio}
      </p>
    </div>
  )
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  return (
    <div className="flex items-center gap-4 mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-700">
      <AuthorAvatar src={author.avatarUrl} alt={author.name} />
      <AuthorInfo name={author.name} bio={author.bio} />
    </div>
  )
}
