import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import requireAuth from './requireAuth'
import '@testing-library/jest-dom'

const mockStore = configureStore([])

const DummyComponent = () => <div>Private Content</div>
const ProtectedComponent = requireAuth(DummyComponent)

describe('requireAuth HOC', () => {
  it('renders the component if authenticated', () => {
    const store = mockStore({
      auth: { loggedIn: true, token: 'valid-token' },
    })

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedComponent />
        </MemoryRouter>
      </Provider>
    )

    expect(getByText('Private Content')).toBeInTheDocument()
  })
})
