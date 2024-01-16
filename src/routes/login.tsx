import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GothubButton from "../components/github-btn";


export default function Login() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>)=> {
        const { target: {name, value} } = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || email === "" || password === "") return;
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(e) {
            //setError
            if(e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setLoading(false);
        }

        console.log(name, email, password);
    }

    return <Wrapper>
        <Title>Login X</Title>
        <Form onSubmit={onSubmit}>
            <Input name="email" value={email} placeholder="Email" type="email" required  onChange={onChange}/>
            <Input name="password" value={password} placeholder="Password" type="password" required  onChange={onChange}/>
            <Input name="submit" value={isLoading ? "Loading..." : "Login" } placeholder="Name" type="submit" required />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null }
        <Switcher>
            Dont't have an account? <Link to="/create-account">Create one &rarr;</Link>
        </Switcher>
        <GothubButton />
    </Wrapper>
}