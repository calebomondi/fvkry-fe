import React, { useState, useEffect } from "react"
import { LockMyAsset } from "@/types";

import { publicClient } from "@/blockchain-services/useFvkry";
import { contractABI, contractAddress } from "@/blockchain-services/core";
import apiService from "@/backendServices/apiservices";
//import { createETHSubVault } from "@/blockchain-services/useFvkry";

export default function LockAsset() {
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

    //form
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<LockMyAsset>({
        title: '',
        amount: '',
        symbol: '',
        duration: '',
        durationType: 'days',
        lockType: 'fixed',
        assetType: 'ethereum',
        goal: ''
    })

    const TITLE_WORD_LIMIT = 10;

    const countWords = (text: string): number => {
        return text.trim() ? text.trim().split(/\s+/).length : 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === 'title') {
            const words = countWords(value);
            if (words <= TITLE_WORD_LIMIT || value.length < formValues.title.length) {
                setFormValues(prev => ({ ...prev, [name]: value }));
            }
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
                throw new Error('Amount to lock must be a value and greater than 0')
            }
            if (isNaN(Number(formValues.duration)) || Number(formValues.duration) <= 0) {
                throw new Error('Lock period must be a value and greater than 0')
            }
            if (isNaN(Number(formValues.goal)) || Number(formValues.goal) < 0) {
                throw new Error('Locking Goal must be a value and greater than 0')
            }
            if (formValues.durationType === 'days' && Number(formValues.duration) > 6) {
                throw new Error('Days Cannot Exceed 7')
            }
            if (formValues.durationType === 'weeks' && Number(formValues.duration) > 3) {
                throw new Error('Weeks Cannot Exceed 4')
            }
            if (formValues.durationType === 'months' && Number(formValues.duration) > 11) {
                throw new Error('Months Cannot Exceed 11')
            }
            if (formValues.durationType === 'years' && Number(formValues.duration) > 5) {
                throw new Error('Years Cannot Exceed 5')
            }

            //1. lock asset

            //2. record in db
            const data2DB = {
                title: formValues.title,
                amount: formValues.amount,
                symbol: formValues.assetType === 'ethereum' ? 'ETH' : formValues.symbol,
                duration: formValues.duration,
                durationType: formValues.durationType,
                lockType: formValues.lockType,
                assetType: formValues.assetType,
                goal: formValues.goal.length === 0 ? '0' : formValues.goal
            }
            const response = apiService.lockAsset(data2DB);
            console.log(`resp: ${response}`)

            setFormValues({
                title: '',
                amount: '',
                symbol: '',
                duration: '',
                durationType: 'days',
                lockType: 'fixed',
                assetType: 'ethereum',
                goal: ''
            })

        } catch (error:any) {
            console.error("Failed to create campaign:", error.message);
        } finally {
            setIsLoading(false)
        }
    }

    const durationPlaceholders: Record<string, string> = {
        days: "1 - 6 days",
        weeks: "1 - 3 weeks",
        months: "1 - 11 months",
        years: "1 - 5 years",
    };

    const remainingTitleWords = TITLE_WORD_LIMIT - countWords(formValues.title);

  return (
    <div className="flex justify-center items-center">
        <div className="m-2 p-2 flex flex-col justify-center items-center rounded-lg">
            <h2 className="text-center text-lg font-semibold">Lock Asset</h2>
            <form onSubmit={handleSubmit} className="w-full p-1">
                <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2 space-x-0 items-center justify-center">
                    <label className="input input-bordered flex items-center justify-between gap-2 font-semibold text-amber-600">
                        Duration
                        <select onChange={handleChange} value={formValues.durationType} name="durationType" id="" className="bg-transparent outline-none border-none dark:text-white text-gray-700">
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="days">Day(s)</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="weeks">Week(s)</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="months">Month(s)</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="years">Year(s)</option>
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center justify-between gap-2 font-semibold text-amber-600">
                        Type
                        <select onChange={handleChange} value={formValues.lockType} name="lockType" id="" className="bg-transparent outline-none border-none dark:text-white text-gray-700">
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="fixed">Fixed Duration</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="goal">Goal Based</option>
                        </select>
                    </label>
                </div>
                <div className="p-2 grid place-items-center">
                    <label className="input input-bordered flex items-center justify-between gap-2 font-semibold text-amber-600">
                        Asset
                        <select onChange={handleChange} value={formValues.assetType} name="assetType" id="" className="bg-transparent outline-none border-none dark:text-white text-gray-700">
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="ethereum">Ethereum</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="token">Token</option>
                        </select>
                    </label>
                </div>
                <div className="mb-2">
                    <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                        Name
                        <input 
                            type="text" 
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                            className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                            placeholder="#Longtime saving" 
                            required
                        />
                    </label>
                    <div className={`text-sm ${remainingTitleWords < 3 ? 'text-red-500' : 'text-gray-500'} text-right`}>
                        {remainingTitleWords} words remaining
                    </div>
                </div>
                <label className={`${formValues.assetType === 'ethereum' && 'hidden'} input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600`}>
                    Token
                    <input 
                        type="text" 
                        id="symbol"
                        name="symbol"
                        value={formValues.symbol}
                        onChange={handleChange}
                        className="dark:text-white text-gray-700 md:w-5/6 p-2" 
                        placeholder="Symbol"
                        disabled = {formValues.assetType === 'ethereum'}
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
                        placeholder={`${formValues.assetType === 'token' ? '100 Token X' : '1 ETH'}`}
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                    Period
                    <input 
                        type="text" 
                        id="duration"
                        name="duration"
                        value={formValues.duration}
                        onChange={handleChange}
                        className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                        placeholder={durationPlaceholders[formValues.durationType]} 
                        required
                    />
                </label>
                <label className={`${formValues.lockType === 'fixed' && 'hidden'} input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600`}>
                    Goal
                    <input 
                        type="text" 
                        id="goal"
                        name="goal"
                        value={formValues.goal}
                        onChange={handleChange}
                        className="dark:text-white text-gray-700 md:w-5/6 p-2" 
                        placeholder="$2000"
                        disabled = {formValues.lockType === 'fixed'}
                        required
                    />
                </label>
                <div className="p-1 flex justify-center mt-2">
                    <button 
                        type="submit" 
                        className="btn bg-amber-500 w-1/2 text-white text-base border border-amber-500 hover:bg-amber-600"
                    >
                        {
                            isLoading ? (<span className="loading loading-ring loading-xs"></span>) : 'Lock'
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}