"use client";
import { MouseEvent, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
    const [isLoading, setIsLoding]= useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues:{
            Email: "",
            Password: "",
        }
    });


    const Onsubmit: SubmitHandler<FieldValues>=(data) =>{
        setIsLoding(true)
        console.log(data);
        
    }
    return (
        <>
            <Heading title="Sign in to E-Shop" center />
            <div className="mb-4"></div>
            <Button outLine label="Continue with Google" icon={AiOutlineGoogle} onClick={() =>{}} />
            <hr className="bg-slate-300 w-full h-px mb-4" />
            <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required 
             />
            <div className="mb-4"></div> {/* Ajout de l'espace entre les champs Name et Email */}
            <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required 
             />
            <div className="mb-4"></div> {/* Ajout de l'espace entre les champs Email et Password */}
            <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"
              />
            <div className="mb-4"></div> {/* Ajout de l'espace entre le champ Password et le bouton Submit */}
            <Button label={isLoading ? "Loading" : "login"} onClick={handleSubmit(Onsubmit)} outLine={false} />
            <div className="mb-4"></div>
            <p className="text-center">Do not have an account? <Link href="/register">Sign up</Link></p>
        </>
     );
}
 
export default LoginForm;