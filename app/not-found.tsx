import Image from 'next/image'
export default function NotFound()
{
    return(
        <>
        <div>
            <Image src={"/Monster 404 Error-pana.svg"}  alt={"Error 404: Page not found."} width="400" height="400" className='image'/>
        </div>
        <div>
            <a href="https://storyset.com/web">Web illustrations by Storyset</a>
        </div>
        </>
    )
}