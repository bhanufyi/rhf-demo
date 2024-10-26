import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Socials = {
	twitter: string;
	facebook: string;
};

type AbcFile = {
	name: string;
};
type FormValues = {
	username: string;
	email: string;
	channel: string;
	social: {
		twitter: string;
		facebook: string;
	};
	phoneNumbers: Socials[];
	phNumbers: {
		name: string;
		numbers: AbcFile[];
	}[];
};

export const YouTubeForm = () => {
	const {
		register,
		handleSubmit,
		setError,
		control,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			username: "",
			email: "",
			channel: "",
			social: {
				twitter: "",
				facebook: "",
			},
			phoneNumbers: [],
			phNumbers: [
				{
					name: "first phone number",
					numbers: [{ name: "first file" }],
				},
			],
		},
	});

	const { fields, append, remove } = useFieldArray({
		name: "phNumbers",
		control,
	});

	const ListFiles = ({ index }: { index: number }) => {
		const { fields, append, remove } = useFieldArray({
			name: `phNumbers.${index}.numbers`,
			control,
		});
		return (
			<div>
				<p>phone number files</p>
				{fields.map((field, index2) => {
					return (
						<div className="form-control" key={field.id}>
							<input
								type="text"
								{...register(
									`phNumbers.${index}.numbers.${index2}.name` as const,
									{
										validate: {
											minLength: (value) =>
												value.length > 3 ||
												"min length is 3",
										},
									}
								)}
							/>
							<p className="error">
								{
									errors.phNumbers?.[index]?.numbers?.[index2]
										?.name?.message
								}
							</p>
							{index2 > 0 && (
								<button
									type="button"
									onClick={() => remove(index2)}
								>
									remove file
								</button>
							)}
						</div>
					);
				})}
				<button
					type="button"
					onClick={() => {
						append({ name: "" });
					}}
				>
					add file
				</button>
			</div>
		);
	};
	const onSubmit = (data: FormValues) => {
		console.log("form submitted", data);
		setError(
			"username",
			{ message: "multiple errors" },
			{ shouldFocus: true }
		);
	};
	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="form-control">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						id="username"
						{...register("username", {
							required: {
								value: true,
								message: "username is required",
							},
						})}
					/>
					<p className="error">{errors.username?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						{...register("email", {
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: "invalid email address",
							},
							validate: {
								notAdmin: (fieldValue) => {
									return (
										fieldValue !== "admin@example.com" ||
										"enter a different email"
									);
								},
								notBlackListed: (fieldValue) => {
									return (
										!fieldValue.endsWith(
											"@baddomain.com"
										) || "email is blacklisted"
									);
								},
							},
						})}
					/>
					<p className="error">{errors.email?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="channel">Channel</label>
					<input type="text" id="channel" {...register("channel")} />
					<p className="error">{errors.channel?.message}</p>
				</div>
				<div className="form-control">
					<label htmlFor="twitter">twitter</label>
					<input
						type="text"
						id="twitter"
						{...register("social.twitter")}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="facebook">facebook</label>
					<input
						type="text"
						id="facebook"
						{...register("social.facebook")}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="primary-phone">primary twitter</label>
					<input
						type="text"
						id="primary-phone"
						{...register(`phoneNumbers.${0}.twitter`)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="secondary-phone">secondary facebook</label>
					<input
						type="text"
						id="secondary-phone"
						{...register(`phoneNumbers.${0}.facebook`)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="primary-phone">primary twitter 2</label>
					<input
						type="text"
						id="primary-phone"
						{...register(`phoneNumbers.${1}.twitter`)}
					/>
				</div>
				<div className="form-control">
					<label htmlFor="secondary-phone">
						secondary facebook 2
					</label>
					<input
						type="text"
						id="secondary-phone"
						{...register(`phoneNumbers.${1}.facebook`, {
							minLength: {
								value: 6,
								message: "min length is 6",
							},
						})}
					/>
					<p className="error">
						{errors.phoneNumbers?.[`${1}`]?.facebook?.message}
					</p>
				</div>

				<div>
					<label>List of phone numbers</label>
					<div>
						{fields.map((field, index) => {
							return (
								<div className="form-control" key={field.id}>
									<input
										type="text"
										{...register(
											`phNumbers.${index}.name` as const
										)}
									/>

									{index > 0 && (
										<button
											type="button"
											className=""
											onClick={() => remove(index)}
										>
											remove phone number
										</button>
									)}

									<ListFiles index={index} />
								</div>
							);
						})}
						<button
							type="button"
							className=""
							onClick={() => append({ name: "", numbers: [] })}
						>
							{" "}
							add phone number
						</button>
					</div>
				</div>
				<button type="submit">submit</button>
			</form>
			<DevTool control={control} />
		</div>
	);
};
