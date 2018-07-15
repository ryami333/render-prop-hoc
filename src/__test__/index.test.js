// @flow

import React from "react";
import renderPropsHOC from "..";
import { render } from "react-testing-library";

describe("renderPropsHOC", () => {
	const FOO: string & "FOO" = "FOO";
	const BAR: string & "BAR" = "BAR";

	type DemoProps = {
		foo: string,
		bar: string
	};

	function FooConsumer({ children }: { children: string => React$Node }) {
		return children(FOO);
	}

	// function BarConsumer({ children }: { children: string => React$Node }) {
	// 	return children(BAR);
	// }

	function Demo({ foo, bar }: DemoProps) {
		return `${foo},${bar}`;
	}

	it("passes props to child", () => {
		const mapProps = foo => ({ foo });
		const ConnectedDemo = renderPropsHOC(FooConsumer, mapProps)(Demo);
		const { queryByText } = render(<ConnectedDemo bar={BAR} />);

		expect(queryByText(`${FOO},${BAR}`)).toBeTruthy();
	});
});
