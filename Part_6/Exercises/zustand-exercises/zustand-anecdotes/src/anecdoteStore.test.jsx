import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleted: vi.fn(),
  }
}))

import anecdoteService from './services/anecdotes'
import {useAnecdoteStore, useAnecdotes, useAnecdoteActions } from './anecdotesStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
  vi.clearAllMocks()
})

describe('useAnecdoteActions', () => {
  it('initialize loads anecdotes from service', async () => {
    const mockNotes = [{ id: 1, content: 'Test', votes: 0 }]
    anecdoteService.getAll.mockResolvedValue(mockNotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const { result: anecdoteResult } = renderHook(() => useAnecdotes())
    expect(anecdoteResult.current).toEqual(mockNotes)
  })
})

describe('useAnecdotes sort the data', () => {
  const anecdotes = [
    { id: 1, content: 'A', votes: 0 },
    { id: 2, content: 'B', votes: 5 },
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes })
  })

  it('returns all anecdotes', () => {
    const { result } = renderHook(() => useAnecdotes())
    expect(result.current).toHaveLength(2)
  })

  it('Order the anecdotes according to their votes', () => {
    const { result } = renderHook(() => useAnecdotes()) 
    expect(result.current).toEqual([anecdotes[1], anecdotes[0]])
  })

  it('the component receives the sorted data', () => {
    render(<AnecdoteList />)
    const items = screen.getAllByText(/^[A-Z]$/).map(el => el.textContent)
    expect(items).toEqual(['B', 'A'])
  })

  it('the componentAnecdoteList receives the filtered anecdotes', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Filter/>
        <AnecdoteList />
      </>
    )
    const filter = screen.getByRole('textbox')
    await user.type(filter, 'b')
    expect(screen.getByText('B')).toBeDefined()
    expect(screen.queryByText('A')).toBeNull()
  })

  it('The act of voting increases the vote count', async () => {
    const user = userEvent.setup()

    const anecdoteToVote = anecdotes.find(a => a.content === 'A')
    
    anecdoteService.update.mockResolvedValue({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    })

    render(<AnecdoteList />)
    
    expect(screen.queryByText('1')).toBeNull()
    const buttons = screen.getAllByText('vote')
    await user.click(buttons[1])
    expect(screen.getByText('has 1')).toBeDefined()
  })
})
