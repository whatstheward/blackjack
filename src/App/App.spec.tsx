import {fireEvent, render, waitFor} from '@testing-library/react';
import { store } from './RTK/store'
import { Provider } from 'react-redux';
import App from './App';

const renderComponent = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}


describe('Player Comoponent', () => {
    it('should render', async () => {
        const { findByText, getByText } = render(renderComponent())
        await waitFor(()=>{
            expect(getByText('Deal')).toBeInTheDocument()
        })
        const dealBtn = await findByText('Deal')
        fireEvent.click(dealBtn)
        const state = store.getState().game
        await waitFor(()=>{
            expect(state.deck_id).not.toBe("")
            expect(state.playing).toBeTruthy()
        })
    })
})