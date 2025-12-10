"use client"
import { type SetStateAction } from 'react'

export default function DataForm({ name, val, setVal }: { name: string, val: string
                                                         setVal: (value: SetStateAction<string>) => void } )
{
    const funcOnChnage = (val: React.ChangeEvent<HTMLInputElement>) => setVal(val.target.value)
    return(
        <div className='inputBox'>
            <label>
                {name}: <input name={name} value={val} onChange={funcOnChnage}></input>
            </label>
        </div>
    )
}