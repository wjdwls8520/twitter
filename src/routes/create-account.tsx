import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { styled } from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0;
`;

const Title = styled.h1`
    font-size:42px;
`;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

const Input = styled.input`
    padding: 10px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size:16px;
    &[type="submit"] {
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

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
        } finally {
            setLoading(false)
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
        {error !== "" ? <Error>error</Error> : null }
    </Wrapper>
}