import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
	TextField,
	Button,
	Stack,
	FormControlLabel,
	Switch,
} from "@mui/material";
import { DevTool } from "@hookform/devtools";

type FormValues = {
	email: string;
	password: string;
	expanded: boolean;
	org: boolean;
	everyone: boolean;
};

let renderCount = 0;

export const MuiForm = () => {
	const {
		handleSubmit,
		register,
		watch,
		setValue,
		formState: { errors, isSubmitting },
		control,
	} = useForm<FormValues>({
		defaultValues: {
			email: "",
			password: "",
			expanded: false,
			org: false,
			everyone: false,
		},
		mode: "all",
	});

	const everyone = watch("everyone");

	React.useEffect(() => {
		console.log("everyone", everyone);
		if (everyone) {
			setValue("org", true);
		}
	}, [setValue, everyone]);

	const onSubmit = async (data: FormValues) => {
		await new Promise((resolve) => setTimeout(resolve, 2000));
		alert(JSON.stringify(data, null, 2));
	};

	renderCount++;

	return (
		<>
			<h1>Login ({renderCount / 2})</h1>
			<form noValidate>
				<Stack spacing={2} width={400}>
					<TextField
						label="Email"
						type="email"
						{...register("email", {
							required: true,
							min: {
								value: 2,
								message: "Min length is 2",
							},
						})}
						error={!!errors.email}
						helperText={errors.email?.message}
					/>
					<TextField
						label="Password"
						type="password"
						{...register("password", {
							required: "Password is required",
						})}
						error={!!errors.password}
						helperText={errors.password?.message}
					/>
					<Controller
						name="expanded"
						control={control}
						render={({ field }) => {
							return (
								<FormControlLabel
									label="Expanded"
									disabled={false}
									control={<Switch {...field} />}
								/>
							);
						}}
					/>
					<Controller
						name="org"
						control={control}
						render={({ field }) => {
							return (
								<Switch
									checked={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							);
						}}
					/>
					<Controller
						name="everyone"
						control={control}
						render={({ field }) => {
							return (
								<Switch
									checked={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							);
						}}
					/>
					<Button
						onClick={() => {
							handleSubmit(onSubmit)();
						}}
						variant="contained"
						color="primary"
					>
						Login
					</Button>
				</Stack>
			</form>
			<DevTool control={control} />
		</>
	);
};
