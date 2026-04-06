// app/actions.ts
'use server'
import { cookies } from 'next/headers'

export async function setThemeAction(theme: string) {
    const cookieStore = await cookies();
    cookieStore.set('theme', theme, {
        path: '/',
        maxAge: 31536000, // 1 year
        sameSite: 'lax',
    });
}