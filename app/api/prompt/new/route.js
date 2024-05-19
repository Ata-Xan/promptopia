import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'
export const POST = async (req) => {
    const { prompt, userId, tag } = await req.json()
    try {
        await connectToDB()
        const newPrompt = new Prompt({ prompt, creator: userId, tag })
        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), { status: 201 })


    } catch (error) {
        return new Response(JSON.stringify({ message: 'Prompt creation failed', error }), { status: 500 })

        // res.status(400).json({ message: 'Prompt creation failed', error })
    }
}