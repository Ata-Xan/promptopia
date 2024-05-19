'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import  Form  from '@components/Form'
import { Router } from 'next/router'

const CreatePrompt = () => {
    const router = useRouter();
    const { session } = useSession()
    
    const [submitting, setSubmitting] = useState(false)
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    })

    const createPrompt = async (e) => {
        // the following means that the form will not be submitted in the traditional way and the page will not be reloaded
        e.preventDefault();
        setSubmitting(true);
        try {
            const response = await fetch('/api/prompt/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        prompt: post.prompt,
                        userId: session?.user.id,
                        tag: post.tag
                    }
                )
            })
            if (response.ok) {
                Router.push('/');

                    
            }
        }catch(error){
            console.error('An error occurred while creating the prompt:', error)
        }
        finally{
            setSubmitting(false)
        }
    }
    return (
        <Form type='create' post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />
    )
}
export default CreatePrompt