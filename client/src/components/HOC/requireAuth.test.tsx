import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import requireAuth from './requireAuth'

const mockStore = configureStore([])

const DummyComponent = () => <div>Protected</div>
const Protected = requireAuth(DummyComponent)

describe('requireAuth HOC', () => {
  it('renders the component if logged in', () => {
    const store = mockStore({
      auth: {
        loggedIn: true,
        token: 'token',
        user: {},
        loading: false,
        error: null,
      },
    })

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Protected />
        </MemoryRouter>
      </Provider>
    )

    expect(getByText('Protected')).toBeInTheDocument()
  })

  it('redirects if not logged in', () => {
    const store = mockStore({
      auth: {
        loggedIn: false,
        token: null,
        user: null,
        loading: false,
        error: null,
      },
    })

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Protected />
        </MemoryRouter>
      </Provider>
    )

    // Checks for navigation — no "Protected" text
    expect(container.innerHTML).not.toContain('Protected')
  })
})
