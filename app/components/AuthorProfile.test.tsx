import { render, screen } from '@testing-library/react'
import { AuthorProfile, type Author } from './AuthorProfile'

const mockAuthor: Author = {
  name: 'Jane Doe',
  bio: 'Software engineer and occasional writer.',
  avatarUrl: 'https://example.com/avatar.jpg',
}

describe('AuthorProfile', () => {
  it('renders the author name', () => {
    render(<AuthorProfile author={mockAuthor} />)
    expect(screen.getByText('Jane Doe')).toBeInTheDocument()
  })

  it('renders the author bio', () => {
    render(<AuthorProfile author={mockAuthor} />)
    expect(
      screen.getByText('Software engineer and occasional writer.')
    ).toBeInTheDocument()
  })

  it('renders the avatar image with correct src and alt', () => {
    render(<AuthorProfile author={mockAuthor} />)
    const avatar = screen.getByRole('img', { name: 'Jane Doe' })
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    expect(avatar).toHaveAttribute('alt', 'Jane Doe')
  })

  it('renders the avatar with the correct dimensions', () => {
    render(<AuthorProfile author={mockAuthor} />)
    const avatar = screen.getByRole('img', { name: 'Jane Doe' })
    expect(avatar).toHaveAttribute('width', '64')
    expect(avatar).toHaveAttribute('height', '64')
  })

  it('renders the top border separator container', () => {
    const { container } = render(<AuthorProfile author={mockAuthor} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('border-t')
  })

  it('uses author name as the accessible label for the avatar', () => {
    render(<AuthorProfile author={{ ...mockAuthor, name: 'John Smith' }} />)
    expect(screen.getByRole('img', { name: 'John Smith' })).toBeInTheDocument()
  })

  it('renders different author data correctly', () => {
    const anotherAuthor: Author = {
      name: 'Alice Kim',
      bio: 'Designer and creative thinker.',
      avatarUrl: '/images/alice.jpg',
    }
    render(<AuthorProfile author={anotherAuthor} />)
    expect(screen.getByText('Alice Kim')).toBeInTheDocument()
    expect(screen.getByText('Designer and creative thinker.')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Alice Kim' })).toHaveAttribute(
      'src',
      '/images/alice.jpg'
    )
  })
})
