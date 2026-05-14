import { create } from 'zustand'

const useCounterStore = create(set => ({
  counter: {
    good: 0,
    neutral: 0,
    bad:   0
  },
  actions: {
    incrementGood: () => set(state => ({ 
      counter: {
        ...state.counter, 
        good: state.counter.good + 1
      } 
    })),
    incrementNeutral: () => set(state => ({ 
      counter: {
        ...state.counter, 
        neutral: state.counter.neutral + 1
      } 
    })),
    incrementBad: () => set(state => ({ 
      counter: {
        ...state.counter, 
        bad: state.counter.bad + 1
      } 
    })),
  }  
}))

export const useCounter = () => useCounterStore(state => state.counter)
export const useCounterButtons = () => useCounterStore(state => state.actions)