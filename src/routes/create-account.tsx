import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-components";
import GothubButton from "../components/github-btn";


export default function CreateAccount() {
    const navigate = useNavigate();

    const [isLoading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const onChange = (e : React.ChangeEvent<HTMLInputElement>)=> {
        const { target: {name, value} } = e;
        if(name === "name") {
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    };
    const onSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if(isLoading || name === "" || email === "" || password === "") return;
        try {
            setLoading(true);
            const credentias = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentias.user);
            await updateProfile(credentias.user, {
                displayName: name,
            });
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
        <Title>Join X</Title>
        <Form onSubmit={onSubmit}>
            <Input name="name" value={name} placeholder="Name" type="text" required  onChange={onChange}/>
            <Input name="email" value={email} placeholder="Email" type="email" required  onChange={onChange}/>
            <Input name="password" value={password} placeholder="Password" type="password" required  onChange={onChange}/>
            <Input name="submit" value={isLoading ? "Loading..." : "Create Account" } placeholder="Name" type="submit" required />
        </Form>
        {error !== "" ? <Error>{error}</Error> : null }
        <Switcher>
            Already have an account? <Link to="/login">Login &rarr;</Link>
        </Switcher>
        <GothubButton />
    </Wrapper>
}