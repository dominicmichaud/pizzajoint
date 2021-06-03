import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Route } from 'react-router-dom';
import Home from '../Home';
import Base from '../Base';

const addBase = jest.fn();

const renderComponent = (stubbedPizzaState) => {
    return render(
        <MemoryRouter initialEntries={["/"]}>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/base">
                <Base addBase={addBase} pizza={stubbedPizzaState} />
            </Route>
        </MemoryRouter>
    )
}

test("renders the main Create your Pizza button", () => {
    const { getByTestId } = renderComponent({ base: "", toppings: [] });
    const homeCreateBtnEl = getByTestId('home-create-btn');
    expect(homeCreateBtnEl.textContent)
        .toBe("Create Your Pizza");
});

test("router link To prop should be and redirect to /base", () => {
    const { getByTestId } = renderComponent({ base: "", toppings: [] });
    const homeLinkEl = getByTestId('home-link');
    const linkHref = homeLinkEl.href;

    expect(linkHref.includes('/base')).toBe(true);
});

test("Clicking on Create your Pizza button should navigate to Base component", () => {
    const { getByTestId } = renderComponent({ base: "", toppings: [] });
    const homeCreateBtnEl = getByTestId('home-create-btn');

    fireEvent.click(homeCreateBtnEl);

    const baseHeadingEl = getByTestId('base-heading');

    expect(baseHeadingEl.textContent).toBe('Step 1: Choose Your Base');
});
