"use client"
interface Props {
    inputs: {
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        city: string,
        password: string,

    },
    handleChangeInputs: (e: React.ChangeEvent<HTMLInputElement>) => void,
    isSignIn: boolean
}

function AuthModalInputs({ inputs, handleChangeInputs, isSignIn }: Props) {
    return (
        <div>
            {!isSignIn ? (
                <div className="my-3 flex justify-between text-sm">
                    <input type="text" onChange={handleChangeInputs} value={inputs.firstName} placeholder='First Name' name="firstName" className="border rounded p-2 py-3 w-[49%]" />
                    <input type="text" onChange={handleChangeInputs} value={inputs.lastName} placeholder='Last Name' name="lastName" className="border rounded p-2 py-3 w-[49%]" />
                </div>
            ) : null}
            <div className="my-3 flex justify-between text-sm">
                <input type="text" onChange={handleChangeInputs} value={inputs.email} placeholder='Email' name="email" className="border rounded p-2 py-3 w-full" />
            </div>
            {!isSignIn ? (
                <div className="my-3 flex justify-between text-sm">
                    <input type="text" onChange={handleChangeInputs} value={inputs.phone} placeholder='Phone' name="phone" className="border rounded p-2 py-3 w-[49%]" />
                    <input type="text" onChange={handleChangeInputs} value={inputs.city} placeholder='City' name="city" className="border rounded p-2 py-3 w-[49%]" />
                </div>
            ) : null}
            <div className="my-3 flex justify-between text-sm">
                <input type="password" onChange={handleChangeInputs} value={inputs.password} placeholder='Password' name="password" className="border rounded p-2 py-3 w-full" />
            </div>

        </div>
    )
}

export default AuthModalInputs