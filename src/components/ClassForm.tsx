import React from "react";
import { useForm, Controller, ControllerRenderProps } from "react-hook-form";

type Props = {
	onBlur: () => void;
	value: string;
	onChange: (value: string) => void;
};
class MyInput extends React.Component<Props> {
	handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { onChange } = this.props;
		const value = event.target.value;

		onChange(value);
	};

	handleBlur = () => {
		const { onBlur } = this.props;
		onBlur(); // Invoke the onBlur function provided by react-hook-form
	};

	render() {
		const { value } = this.props;

		return (
			<input
				type="text"
				value={value}
				onBlur={this.handleBlur} // Invoke the handleBlur function when blurred
				onChange={this.handleChange}
			/>
		);
	}
}

const MyInputWrapper = ({
	field,
}: {
	field: ControllerRenderProps<FormData, "myInput">;
}) => (
	<MyInput
		ref={field.ref}
		value={field.value}
		onChange={field.onChange}
		onBlur={field.onBlur}
	/>
);
type FormData = {
	myInput: string;
};
function ClassForm() {
	const { control, handleSubmit, formState } = useForm<FormData>({
		defaultValues: {
			myInput: "",
		},
		mode: "all",
	});

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				name="myInput"
				control={control}
				rules={{
					required: true,
					validate: {
						check: (value) => {
							return value.length > 5
								? true
								: "Length must be > 5";
						},
					},
				}}
				render={({ field }) => <MyInputWrapper field={field} />}
			/>

			<input type="submit" value="Submit" />
			<p>Dirty: {formState.dirtyFields["myInput"] ? "true" : "false"}</p>
			<p>
				Touched: {formState.touchedFields["myInput"] ? "true" : "false"}
			</p>
			<p>Errors: {JSON.stringify(formState.errors)}</p>
		</form>
	);
}

export default ClassForm;
