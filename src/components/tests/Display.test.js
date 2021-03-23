import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Display from '../Display';

import {default as mockFetchShow} from '../../api/fetchShow'

jest.mock('../../api/fetchShow');

test("Renders with no props", ()=>{
    render(<Display/>);
})


test("Show component displays when button is pressed.", async ()=> {
    mockFetchShow.mockResolvedValueOnce({
            name: '',
            seasons: [
                {
                    episodes: [
                        {
                            airdate: '',
                            id: '',
                            name: '',
                            number: 1,
                            season: 1,
                            summary: '',
                            type: '',
                        }
                    ],
                    id: 0,
                    name: "Season 1"
                },
                {
                    episodes: [
                        {
                            airdate: '',
                            id: '',
                            name: '',
                            number: 1,
                            season: 1,
                            summary: '',
                            type: '',
                        }
                    ],
                    id: 1,
                    name: "Season 2"
                }
            ]
    })
    const { getByText } = render(<Display/>);

    const fetchShowButton = getByText(/Press to Get Show Data/i);
    userEvent.click(fetchShowButton);
    const showComp = await screen.findByTestId("show-container");
    expect(showComp).toBeInTheDocument();
});

test("Select options equal to test data's options", async () =>{
    mockFetchShow.mockResolvedValueOnce({
            name: '',
            seasons: [
                {
                    episodes: [
                        {
                            airdate: '',
                            id: '',
                            name: '',
                            number: 1,
                            season: 1,
                            summary: '',
                            type: '',
                        }
                    ],
                    id: 0,
                    name: "Season 1"
                },
                {
                    episodes: [
                        {
                            airdate: '',
                            id: '',
                            name: '',
                            number: 1,
                            season: 1,
                            summary: '',
                            type: '',
                        }
                    ],
                    id: 1,
                    name: "Season 2"
                }
            ]
        })
        const { getByText } = render(<Display/>);
        
        const fetchShowButton = getByText(/Press to Get Show Data/i);
        userEvent.click(fetchShowButton);
        
        const selectOptions = await screen.findAllByTestId("season-option")
        expect(selectOptions).toHaveLength(2);
    });
    
test("optional function is called when fetch button pressed", async ()=>{
    mockFetchShow.mockResolvedValueOnce({
        name: '',
        seasons: [
            {
                episodes: [
                    {
                        airdate: '',
                        id: '',
                        name: '',
                        number: 1,
                        season: 1,
                        summary: '',
                        type: '',
                    }
                ],
                id: 0,
                name: "Season 1"
            },
            {
                episodes: [
                    {
                        airdate: '',
                        id: '',
                        name: '',
                        number: 1,
                        season: 1,
                        summary: '',
                        type: '',
                    }
                ],
                id: 1,
                name: "Season 2"
            }
        ]
    })
    const props = {
        displayFunc: jest.fn(),
    }
    const { getByText } = render(<Display {...props}/>);

    const fetchShowButton = getByText(/Press to Get Show Data/i);
    userEvent.click(fetchShowButton);
    await screen.findByTestId("show-container");
    expect(props.displayFunc).toHaveBeenCalled();
});

///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.