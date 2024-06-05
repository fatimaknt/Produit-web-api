"use client";
import { MouseEvent, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { Edu_QLD_Beginner } from "next/font/google";

const RegisterForm = () => {
    const [isLoading, setIsLoding]= useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            Username:"",
            Password: "",
            Email: "",
        }
    });

    //Partie communication Web API 
    const onSubmit = async (data: any) => {
        console.log(data,"first kede")
        setIsLoding(true);
        try {
            const response = await fetch('https://localhost:44370/api/Registration/Registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            console.log("bien arrruei",response)

            if (!response.ok) {
                throw new Error('Erreur lors de la requête: ' + response.statusText);
            }
            else{
                console.log("Inscription reussi")
                alert("Inscription reussi")
            }
            const responseData = await response.json();
            console.log('Inscription réussie', responseData); // Vous pouvez également afficher les données renvoyées par le serveur
        } catch (error) {
            console.error('Erreur lors de la communication avec le serveur:', error);
        }
        setIsLoding(false);
    };
    return (
        <>
            <Heading title="Sign up for E-Shop" center />
            <div className="mb-4"></div>
            <Button outLine label="Sign up with Google" icon={AiOutlineGoogle} onClick={() =>{}} />
            <hr className="bg-slate-300 w-full h-px mb-4" />
            <Input id="Username" label="Username" disabled={isLoading} register={register} errors={errors} required />
            <div className="mb-4"></div>
            <Input id="Password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password" />
            <div className="mb-4"></div>
            <Input id="Email" label="Email" disabled={isLoading} register={register} errors={errors} required />
            <div className="mb-4"></div>
            <Button label={isLoading ? "Loading" : "Sign up"} onClick={handleSubmit(onSubmit)} outLine={false} />
            <div className="mb-4"></div>
            <p className="text-center">Already have an account? <Link className="underline" href="/login">Login</Link></p>
        </>
    );
}

export default RegisterForm;