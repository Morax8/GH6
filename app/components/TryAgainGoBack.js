'use client'
import { useRouter } from 'next/navigation';  

export default function TryAgainGoBack({links}){
    const router = useRouter();

    return <div className="flex gap-5 underline justify-center text-sm font-thin">
        <div 
        className='cursor-pointer'
        onClick={()=>{router.push(links[0])}}
        >
            Try Again
        </div>

        <div
        className='cursor-pointer'
        onClick={()=>{router.push(links[1])}}
        >
            
            Go Back
        </div>
    </div>
}