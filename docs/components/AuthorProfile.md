# AuthorProfile

A presentational component that displays an author's avatar, name, and bio below a blog post. Composed of two focused sub-components — `AuthorAvatar` and `AuthorInfo` — under a shared `AuthorProfile` parent.

---

## Component Overview

| Property | Value |
|---|---|
| **File** | `app/components/AuthorProfile.tsx` |
| **Type** | Client-renderable (no server-only APIs) |
| **Exports** | `AuthorProfile`, `Author` |

---

## Types

### `Author`

Represents the data shape consumed by the component.

```ts
export type Author = {
  name: string      // Displayed as the author's display name
  bio: string       // Short biography shown beneath the name
  avatarUrl: string // URL of the avatar image
}
```

---

## Props

### `AuthorProfile`

| Prop | Type | Required | Description |
|---|---|---|---|
| `author` | `Author` | Yes | Author data object containing `name`, `bio`, and `avatarUrl` |

---

## Usage

### Basic example

```tsx
import { AuthorProfile } from '@/app/components/AuthorProfile'

const author = {
  name: 'Jane Doe',
  bio: 'Software engineer and occasional writer.',
  avatarUrl: '/images/authors/jane.jpg',
}

export default function BlogPost() {
  return (
    <article>
      {/* ... post content ... */}
      <AuthorProfile author={author} />
    </article>
  )
}
```

### With static author data

```tsx
import { AuthorProfile, type Author } from '@/app/components/AuthorProfile'

const AUTHOR: Author = {
  name: 'Jane Doe',
  bio: 'Software engineer and occasional writer.',
  avatarUrl: 'https://example.com/avatar.jpg',
}

export default function Page() {
  return <AuthorProfile author={AUTHOR} />
}
```

---

## Notes

- **Layout**: Rendered as a horizontal flex row (`flex items-center gap-4`) with a top border separator (`border-t`), intended for placement at the bottom of a blog post.
- **Dark mode**: All colors adapt automatically via Tailwind dark-mode variants (`dark:border-neutral-700`, `dark:text-neutral-100`, `dark:text-neutral-400`).
- **Avatar rendering**: Uses a plain `<img>` tag (not `next/image`) with explicit `width={64}` and `height={64}` attributes and `rounded-full object-cover` classes for a circular crop.
- **Static data**: The component is fully controlled — it does not fetch data internally. Pass pre-fetched or statically defined `Author` data from the parent.
- **Accessibility**: The avatar `<img>` uses `author.name` as its `alt` attribute, providing meaningful alternative text for screen readers.

---

## Internal Sub-components

These are not exported but are used internally for separation of concerns.

| Component | Responsibility |
|---|---|
| `AuthorAvatar` | Renders the circular avatar image |
| `AuthorInfo` | Renders the author's name and bio text |
