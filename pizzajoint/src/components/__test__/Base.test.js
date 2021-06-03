import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route, MemoryRouter } from 'react-router-dom';
import Base from '../Base';
import Toppings from '../Toppings';

const addBase = jest.fn();
const addTopping = jest.fn();

const renderComponent = (stubbedPizzaState) => {
    return render(
        <MemoryRouter initialEntries={["/base"]}>
            <Route path="/base">
                <Base addBase={addBase} pizza={stubbedPizzaState} />
            </Route>
            <Route path="/toppings">
                <Toppings addTopping={addTopping} pizza={stubbedPizzaState} />
            </Route>
        </MemoryRouter>
    )
}

test("Next button should be hidden when component loads and no pizza base type is chosen", () => {
    const { queryByText } = renderComponent({ base: "", toppings: [] });

    expect(queryByText(/Next/i)).not.toBeInTheDocument();
});

test("clicking on a list item should call the addBase function", () => {
    const { getByTestId } = renderComponent({ base: "", toppings: [] });

    const baseListItem = getByTestId('base-list').firstChild;

    fireEvent.click(baseListItem);

    expect(addBase).toHaveBeenCalledTimes(1);
});

test("Next button should be visible if a pizza base type is chosen", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: [] });

    expect(getByTestId('base-next-btn')).toBeInTheDocument();
});

test("List item should have the className 'active' if a pizza base type is chosen", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: [] });

    expect(getByTestId('base-list')).toBeInTheDocument();

    const baseListItemSpan = getByTestId('base-list').firstChild.firstChild;

    expect(baseListItemSpan).toHaveClass('active');
});

test("Clicking on Next button should navigate to Toppings component", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: [] });
    const baseNextBtnEl = getByTestId('base-next-btn');

    fireEvent.click(baseNextBtnEl);

    const toppingsHeadingEl = getByTestId('toppings-heading');

    expect(toppingsHeadingEl.textContent).toBe('Step 2: Choose Toppings');
});