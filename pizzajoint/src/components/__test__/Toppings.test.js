import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route, MemoryRouter } from 'react-router-dom';
import Toppings from '../Toppings';
import Order from '../Order';

const setShowModal = jest.fn();
const addTopping = jest.fn();

const renderComponent = (stubbedPizzaState) => {
    return render(
        <MemoryRouter initialEntries={["/toppings"]}>
            <Route path="/toppings">
                <Toppings addTopping={addTopping} pizza={stubbedPizzaState} />
            </Route>
            <Route path="/order">
                <Order pizza={stubbedPizzaState} setShowModal={setShowModal} />
            </Route>
        </MemoryRouter>
    )
}

test("Order button should be hidden when component loads and no pizza toppings type is chosen", () => {
    const { queryByText } = renderComponent({ base: "Classic", toppings: [] });

    expect(queryByText(/Order/i)).not.toBeInTheDocument();
});

test("clicking on a list item should call the addTopping function", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: [] });

    const toppingsListItem = getByTestId('toppings-list').firstChild;

    fireEvent.click(toppingsListItem);

    expect(addTopping).toHaveBeenCalledTimes(1);
});

test("Order button should be visible if at least one pizza topping is chosen", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] });

    expect(getByTestId('toppings-order-btn')).toBeInTheDocument();
});

test("Each List items should have the className 'active' if it selected", () => {
    const { getByTestId, queryByText } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] });

    expect(getByTestId('toppings-list')).toBeInTheDocument();
    expect(queryByText(/Mushrooms/i)).toHaveClass('active');
    expect(queryByText(/Peppers/i)).toHaveClass('active');
});

test("Clicking on Order button should navigate to Order component", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] });
    const toppingsOrderBtnEl = getByTestId('toppings-order-btn');

    fireEvent.click(toppingsOrderBtnEl);

    const toppingsHeadingEl = getByTestId('order-heading');

    expect(toppingsHeadingEl).toHaveTextContent('Thank you for your order');
});