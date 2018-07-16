// @flow

import { compose } from "recompose";
import React from "react";
import renderPropsHOC from "..";
import { render, cleanup } from "react-testing-library";

describe("renderPropsHOC", () => {
	const FOO: string & "FOO" = "FOO";
	const BAR: string & "BAR" = "BAR";
	const BAZ: string & "BAZ" = "BAZ";

	type DemoProps = {
		foo: string,
		bar: string,
		baz: string
	};

	function FooConsumer({ children }: { children: string => React$Node }) {
		return children(FOO);
	}

	function BarConsumer({ children }: { children: string => React$Node }) {
		return children(BAR);
	}

	function Demo({ foo, bar, baz }: DemoProps) {
		return `${foo},${bar},${baz}`;
	}

	const mapFooProps = foo => ({ foo });
	const mapBarProps = bar => ({ bar });

	beforeEach(() => {
		cleanup();
	});

	describe("single", () => {
		const ConnectedDemo = renderPropsHOC(FooConsumer, mapFooProps)(Demo);

		it("passes props to child", () => {
			const { queryByText } = render(
				<ConnectedDemo bar={BAR} baz={BAZ} />
			);

			expect(queryByText(`${FOO},${BAR},${BAZ}`)).toBeTruthy();
		});

		/* eslint-disable no-unused-expressions */

		it("doesnt throw an error if render prop not given", () => {
			<ConnectedDemo bar={BAR} baz={BAZ} />;
		});

		it("throws an error if remaining props are not given", () => {
			// $ExpectError
			<ConnectedDemo bar={BAR} />;
			// $ExpectError
			<ConnectedDemo baz={BAZ} />;
		});
	});

	describe("stacked", () => {
		const ConnectedDemo = compose(
			renderPropsHOC(BarConsumer, mapBarProps),
			renderPropsHOC(FooConsumer, mapFooProps)
		)(Demo);

		it("passes both props to child", () => {
			const { queryByText } = render(<ConnectedDemo baz={BAZ} />);

			expect(queryByText(`${FOO},${BAR},${BAZ}`)).toBeTruthy();
		});

		/* eslint-disable no-unused-expressions */

		it("doesnt throw an error if render props not given", () => {
			<ConnectedDemo baz={BAZ} />;
		});

		it("throws an error if remaining props are not given", () => {
			// $ExpectError
			<ConnectedDemo bar={BAR} />;
			// $ExpectError
			<ConnectedDemo baz={BAZ} />;
		});
	});
});
