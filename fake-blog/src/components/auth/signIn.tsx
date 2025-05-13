import React, {useState, type FormEvent, type ChangeEvent} from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import axios from "../axios";

interface FormData {
    email: string;
    password: string;
}

const SignInComponent: React.FC = () => {
    const signIn = useSignIn();
    const [formData, setFormData] = useState<FormData>({email: "", password: ""})

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('/api/v1/auth/login', formData)
            .then((res) => {
                if(res.status == 200){
                    const success = signIn({
                        auth: {
                            token: res.data.token,
                            type: 'Bearer',
                        }
                    });

                    if(success){
                        console.log("Success: " + res.data.data.user.name);
                    }
                }
            });
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value })
    };

    return  (
    // <Form>
    //     <Form.Group className="mb-3" controlId="formGroupEmail">
    //         <Form.Label>Email address</Form.Label>
    //         <Form.Control type="email" placeholder="Enter email"></Form.Control>
    //     </Form.Group>
    //     <Form.Group className="mb-3" controlId="formGroupPassword">
    //         <Form.Label>Password</Form.Label>
    //         <Form.Control type="password" placeholder="Password"></Form.Control>
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //         Submit
    //     </Button>
    // </Form>
        <form onSubmit={onSubmit}>
            <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            />
            <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            />
            <button type="submit">Submit</button>
        </form> 
  );
}

export default SignInComponent;