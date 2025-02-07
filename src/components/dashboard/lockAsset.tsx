import React, { useState, useEffect } from "react"
import { LockMyAsset } from "@/types";

import { publicClient } from "@/blockchain-services/useFvkry";
import { contractABI, contractAddress } from "@/blockchain-services/core";
import { isAddress } from "viem";
//import { createETHSubVault } from "@/blockchain-services/useFvkry";

export default function LockAsset({vault}:{vault:string}) {
    //listen to add events
   useEffect(() => {
        //AssetLocked
        const unwatchAssetLocked = publicClient.watchContractEvent({
            address: contractAddress as `0x${string}`,
            abi: contractABI,
            eventName: 'AssetLocked',
            onError: error => console.log(`error - ${error}`),
            onLogs: logs => console.log(`logs - ${logs}`)
        });

        return () => {
            unwatchAssetLocked();
        }
   },[])

   //select vault
   const setVault = (): number => {
        let lockVault = 0;

        if (vault === 'days') lockVault = 1;
        if (vault === 'weeks') lockVault = 2;
        if (vault === 'months') lockVault = 3;
        if (vault === 'years') lockVault = 4;
        
        return lockVault;
   }

    //form
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<LockMyAsset>({
        title: '',
        address: '0x',
        amount: '',
        duration: '',
        assettype: false, // false for ETH, true for TKN
    })

    const TITLE_WORD_LIMIT = 10;

    const countWords = (text: string): number => {
        return text.trim() ? text.trim().split(/\s+/).length : 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (name === 'title') {
            const words = countWords(value);
            if (words <= TITLE_WORD_LIMIT || value.length < formValues.title.length) {
                setFormValues(prev => ({ ...prev, [name]: value }));
            }
        } else if (type === 'checkbox') {
            setFormValues(prev => ({ 
                ...prev, 
                [name]: (e.target as HTMLInputElement).checked 
            }));
        } else {
            setFormValues(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsLoading(true)
        try {
            //validate input data
            if (isNaN(Number(formValues.amount)) || Number(formValues.amount) <= 0) {
                throw new Error('Amount must be a number and greater than 0')
            }
            if (isNaN(Number(formValues.duration)) || Number(formValues.duration) <= 0) {
                throw new Error('Duration must be a number and greater than 0')
            }
            if (!isAddress(formValues.address) && formValues.assettype) 
                throw new Error('Token Address Should Be Valid!')

            alert(`${formValues.title} -- ${formValues.amount} -- ${formValues.duration} -- ${formValues.address} -- ${setVault()}`)
            //await createETHSubVault(formValues.amount,)

        } catch (error:any) {
            console.error("Failed to create campaign:", error.message);
        } finally {
            setIsLoading(false)
            setFormValues({
                title: '',
                address: '',
                amount: '',
                duration: '',
                assettype: false,
            })
        }
    }

    const remainingTitleWords = TITLE_WORD_LIMIT - countWords(formValues.title);

  return (
    <div className="flex justify-center items-center">
        <div className="md:w-1/2 m-2 p-2 flex flex-col justify-center items-center rounded-lg">
            <h2 className="text-center text-lg font-semibold">Create A {vault.toUpperCase()} Sub Vault</h2>
            <form onSubmit={handleSubmit} className="w-full p-1">
                <div className="mb-2 p-2 grid place-items-center">
                    <label className="flex cursor-pointer gap-2">
                        <span className={`label-text font-semibold ${!formValues.assettype && 'text-amber-600'}`}>ETH</span>
                        <input 
                            type="checkbox" 
                            id="assettype" 
                            name="assettype" 
                            checked={formValues.assettype} 
                            onChange={handleChange}
                            className="toggle theme-controller" 
                        />
                        <span className={`label-text font-semibold ${formValues.assettype && 'text-amber-600'}`}>TKN</span>
                    </label>
                </div>
                <div className="mb-2">
                    <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                        Title
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                            placeholder="Tag your lock" 
                            required
                        />
                    </label>
                    <div className={`text-sm ${remainingTitleWords < 3 ? 'text-red-500' : 'text-gray-500'} text-right`}>
                        {remainingTitleWords} words remaining
                    </div>
                </div>
                <label className={`${!formValues.assettype && 'hidden'} input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600`}>
                    Token
                    <input 
                        type="text" 
                        id="address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                        className="dark:text-white text-gray-700 md:w-5/6 p-2" 
                        placeholder="Address"
                        disabled = {!formValues.assettype}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                    Amount
                    <input 
                        type="text" 
                        id="amount"
                        name="amount"
                        value={formValues.amount}
                        onChange={handleChange}
                        className="dark:text-white text-gray-700 md:w-5/6 p-2" 
                        placeholder={`In ${formValues.assettype ? 'TKN' : 'ETH'}`}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                    Duration
                    <input 
                        type="text" 
                        id="duration"
                        name="duration"
                        value={formValues.duration}
                        onChange={handleChange}
                        className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                        placeholder={`In ${vault.toUpperCase()}`} 
                        required
                    />
                </label>
                <div className="p-1 flex justify-center mt-2">
                    <button 
                        type="submit" 
                        className="btn bg-amber-500 w-1/2 text-white text-base border border-amber-500 hover:bg-amber-600"
                    >
                        {
                            isLoading ? (<span className="loading loading-ring loading-xs"></span>) : 'create'
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}