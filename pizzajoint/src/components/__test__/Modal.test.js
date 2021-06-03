import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Route, MemoryRouter } from 'react-router-dom';
import Home from '../Home';
import Order from '../Order';
import Modal from '../Modal';

const setShowModal = jest.fn();

const renderComponent = (stubbedPizzaState, modalBool) => {
    return render(
        <>
            <MemoryRouter initialEntries={["/order"]}>
                <Modal showModal={modalBool} setShowModal={setShowModal} />
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/order">
                    <Order pizza={stubbedPizzaState} setShowModal={setShowModal} />
                </Route>
            </MemoryRouter>
        </>
    )
}

test("Modal should be hidden on component load", () => {
    const { queryByText } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] }, false);

    expect(queryByText(/Start again/i)).not.toBeInTheDocument();
});

test("Modal should display after 5 seconds", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] }, true);

    jest.useFakeTimers();
    jest.runAllTimers();

    const modalStartBtnEl = getByTestId('modal-link-btn');
    expect(modalStartBtnEl).toBeInTheDocument();

    jest.clearAllTimers();
});

test("Clicking on Start again button should navigate to Home component", () => {
    const { getByTestId } = renderComponent({ base: "Classic", toppings: ['mushrooms', 'peppers'] }, true);

    jest.useFakeTimers();
    jest.runAllTimers();

    const modalStartBtnEl = getByTestId('modal-link-btn');
    const linkHref = modalStartBtnEl.href;
    expect(linkHref.substr(linkHref.length - 1)).toBe('/');

    fireEvent.click(modalStartBtnEl);

    const homeCreateBtnEl = getByTestId('home-create-btn');
    expect(homeCreateBtnEl).toBeInTheDocument();

    jest.clearAllTimers();
});