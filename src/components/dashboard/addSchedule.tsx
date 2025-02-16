import React, { useState } from "react"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"

export default function AddSchedule() {
    const { toast } = useToast()

    //form
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<{amount: string, duration: string, unLockType: string}>({
        amount: '',
        duration: '',
        unLockType: 'after'
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement  | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
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

            /*
            const tx = await createTokenVault({symbol: formValues.symbol, amountT: formValues.amount, vault: vault, lockPeriod: days , title: formValues.title})
              
            if(tx) {
                //toast
                toast({
                    title: `${formValues.title.toUpperCase()}`,
                    description: `Lock has been Created Successfully`,
                    action: (
                        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                    )
                });
                //clear form
                setFormValues({
                    title: '',
                    amount: '',
                    symbol: '',
                    duration: '',
                    durationType: 'days',
                    unLockType: 'fixed',
                    assetType: 'ethereum',
                    goal: ''
                })
                setIsLoading(false)
                //uplaod to db
                await apiService.AddSchedule(data2DB)
            }
                */

        } catch (error:any) {
            console.error("Failed to create campaign:", error.message);
            toast({
                variant: "destructive",
                title: "ERROR",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <div className="flex justify-center items-center">
        <div className="m-2 p-2 flex flex-col justify-center items-center rounded-lg">
            <h2 className="text-center text-lg font-semibold my-4">Set Unlock Schedule</h2>
            <form onSubmit={handleSubmit} className="w-full p-1">
                <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-2 space-x-0 items-center justify-center">
                    <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                        Unlock
                        <input 
                            type="text" 
                            id="amount"
                            name="amount"
                            value={formValues.amount}
                            onChange={handleChange}
                            className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                            placeholder="0.01" 
                            required
                        />
                    </label>
                    <label className="input input-bordered flex items-center justify-between gap-2 font-semibold text-amber-600">
                        <select onChange={handleChange} value={formValues.unLockType} name="unLockType" id="" className="bg-transparent outline-none border-none dark:text-white text-gray-700">
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="after">After</option>
                            <option className="dark:text-white text-gray-700 dark:bg-black/90" value="every">Every</option>
                        </select>
                    </label>
                    <label className="input input-bordered flex items-center justify-between gap-2 mb-1 font-semibold text-amber-600">
                        <input 
                            type="text" 
                            id="duration"
                            name="duration"
                            value={formValues.duration}
                            onChange={handleChange}
                            className="md:w-5/6 p-2 dark:text-white text-gray-700" 
                            placeholder="11" 
                            required
                        />
                        Days
                    </label>
                </div>
                <div className="p-1 flex justify-center mt-2">
                    <button 
                        type="submit" 
                        className="btn bg-amber-500 w-1/2 text-white text-base border border-amber-500 hover:bg-amber-600"
                    >
                        {
                            isLoading ? (<span className="loading loading-ring loading-xs"></span>) : 'SET'
                        }
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}