import React from 'react';
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route, MemoryRouter } from 'react-router-dom';
import Order from '../Order';

const setShowModal = jest.fn();

const renderComponent = (stubbedPizzaState) => {
    return render(
        <MemoryRouter initialEntries={["/order"]}>
            <Route path="/order">
                <Order pizza={stubbedPizzaState} setShowModal={setShowModal} />
            </Route>
        </MemoryRouter>
    )
}

test("Order page should show pizza base type", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] });

    const orderBaseTypeEl = getByTestId('order-base-type');

    expect(orderBaseTypeEl).toHaveTextContent('Classic');
});

test("Order page should contain each selected pizza toppings", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] });

    const orderToppingsListEl = getByTestId('order-toppings-list');

    expect(orderToppingsListEl).toHaveTextContent(['mushrooms', 'peppers'].join(', '));
});