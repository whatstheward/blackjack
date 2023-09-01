import {fireEvent, render, waitFor} from '@testing-library/react';
import { store } from '../../RTK/store'
import { Provider } from 'react-redux';
import Player from './';
import { fetchCards } from 'src/api';
import { useAppDispatch } from 'src/App/hooks';

const renderComponent = () => {
    return (
        <Provider store={store}>
            <Player />
        </Provider>
    )
}


describe('Player Comoponent', () => {
    it('should render', () => {
        const { getByText } = render(renderComponent())
        expect(getByText('Player')).toBeInTheDocument()
    })
    it('should start with buttons disabled', async () => {
        const {getByText} = render(renderComponent())
        expect(getByText('Hit Me!')).toBeInTheDocument()
        expect(getByText('Hit Me!')).toHaveAttribute('disabled')
        expect(getByText("I'll stay")).toBeInTheDocument()
        expect(getByText("I'll stay")).toHaveAttribute('disabled')
    })
})