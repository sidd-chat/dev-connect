import React from 'react'
import { useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import axios from 'axios';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(12),
})


const Login = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(user) {
    try {
      const response = await axios.post('http://localhost:5000/login', user);

      localStorage.setItem('token', response.data.token);
      console.log("Login successful:", response.data);

      navigate('/', {replace: true});
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  }

  return (
    <div className='w-full h-screen flex flex-col items-center'>

      <h1 className='text-white mt-10 text-3xl'>DevConnect</h1>
      <h2 className='text-white mt-2 text-md uppercase'>
        The <span className='underline'>Only</span> Social Media For Developers
      </h2>

      <div className='flex bg-black mt-7 rounded-lg'>
        <img src='https://placehold.co/350x400/000000/FF1' className='h-50% w-40% m-5 rounded-lg border-2'/>
        <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-110 rounded-xl mx-auto my-20 bg-black flex flex-col p-15 shadow-md'>

          <FormField
            control={form.control}
            name='email'
            render={({field}) => (
              <FormItem className='mb-5'>
                <FormControl className='border-2 border-dashed text-white'>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormControl className='border-2 border-dashed text-white'>
                  <Input placeholder='Password' {...field}/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <Button
              type="submit"
              className='w-20 mx-auto uppercase bg-white text-black mt-8 cursor-pointer hover:bg-neutral-700 hover:text-white'>
                Submit
            </Button>
          </form>
        </Form>
      </div>

    </div>
  )
}

export default Login