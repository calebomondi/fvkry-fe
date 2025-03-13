import React, { useState,useEffect } from "react"
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { VaultData } from '@/types';
import { getWalletClient } from "@/blockchain-services/useFvkry";
import apiService from "@/backendServices/apiservices";

export default function AddSchedule({vaultData}:{vaultData:VaultData}) {
    const { toast } = useToast();

    const [userAddress,setUserAddress] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formValues, setFormValues] = useState<{amount: string, duration: string, unLockType: string}>({
        amount: '',
        duration: '',
        unLockType: 'after'
    })

    //get user wallet address
    useEffect(() => {
        const fetchData = async () => {
            const { address } = await getWalletClient();
            setUserAddress(address);
        }
        fetchData();
    }, [])

    // Calculate total lock duration in days
    const getTotalLockDays = () => {
        const startDate = new Date();
        const endDate = new Date(vaultData.end_time);
        return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    }

    // Generate next unlock timestamp
    const generateNextUnlock = () => {
        const currentDate = new Date();
        const unlockDate = new Date(currentDate.getTime() + (Number(formValues.duration) * 24 * 60 * 60 * 1000));
        return unlockDate.toISOString();
    }

    const amount = Number(formValues.amount);
    const duration = Number(formValues.duration);
    const totalLockDays = getTotalLockDays();
    const maxAmount = vaultData.amount / 3;
    let possibleUnlockAmount: number = 0
    if (formValues.amount && formValues.duration)
        possibleUnlockAmount = Number(formValues.amount) * totalLockDays / Number(formValues.duration);

    const validateForm = () => {
        // Basic number validation
        if (isNaN(amount) || amount <= 0) {
            throw new Error('Amount must be a positive number and greater than 0');
        }
        if (isNaN(duration) || duration <= 0) {
            throw new Error('Duration must be a positive number and greater than 0');
        }

        // Amount validation
        if (amount > vaultData.amount) {
            throw new Error('Unlock amount cannot exceed total locked amount');
        }
        if (amount > maxAmount) {
            throw new Error(`Unlock Amount Cannot Exceed ${maxAmount}`);
        }

        // Duration validation
        if (duration > totalLockDays) {
            throw new Error('Unlock period cannot exceed total lock duration');
        }

        // Minimum duration check
        if (duration < 1) {
            throw new Error('Unlock period must be at least 1 day');
        }

        // Check if unlock amount meets minimum threshold (example: 0.01)
        if (vaultData.asset_symbol === 'ETH' && amount < 0.001) {
            throw new Error(`Minimum unlock amount is 0.001 ${vaultData.asset_symbol}`);
        }
        if (vaultData.asset_symbol !== 'ETH' && amount < 1) {
            throw new Error(`Minimum unlock amount is 1 ${vaultData.asset_symbol}`);
        }

        // Additional check for 'every' type unlocks
        if (formValues.unLockType === 'every') {
            const totalUnlocks = Math.floor(totalLockDays / duration);
            const totalUnlockAmount = amount * totalUnlocks;
            if (totalUnlockAmount > vaultData.amount) {
                throw new Error(`Total unlocks (${totalUnlocks} × ${amount} ${vaultData.asset_symbol}) would exceed locked amount`);
            }
        }

        return true;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            validateForm();
            //get next unlock time
            const nextUnlockTime = generateNextUnlock();

            const scheduleData = {
                amount: Number(formValues.amount),
                duration: Number(formValues.duration),
                unlockType: formValues.unLockType,
                nextUnlock: nextUnlockTime,
                userAddress: userAddress,
                lockTitle: vaultData.title,
                lockAmount: vaultData.amount,
                assetSymbol: vaultData.asset_symbol,
                chainId: vaultData.chainId
            };

            const resp = await apiService.addSchedule(scheduleData);

            if(resp.status) {
                toast({
                    title: "Success",
                    description: "Unlock schedule has been set successfully"
                });
            }

            setFormValues({
                amount: '',
                duration: '',
                unLockType: 'after'
            });

        } catch (error: any) {
            console.error("Failed to create schedule:", error.message);
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="m-2 p-2 flex flex-col justify-center items-center rounded-lg">
                <h2 className="text-center text-lg font-semibold">Set Unlock Schedule</h2>
                <span className="text-sm text-gray-400 my-2">{`Remaining Lock Days: ${totalLockDays} | Locked Amount: ${vaultData.amount} ${vaultData.asset_symbol}`}</span>
                <span className={`text-sm text-gray-400 my-2 ${possibleUnlockAmount > vaultData.amount && 'text-red-600'}`}>{`Scheduled Unlock Amount: ${possibleUnlockAmount}`}</span>
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
                                placeholder={vaultData.asset_symbol === 'ETH' ? "0.001" : "1"} 
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center justify-between gap-2 font-semibold text-amber-600">
                            <select 
                                onChange={handleChange} 
                                value={formValues.unLockType} 
                                name="unLockType" 
                                className="bg-transparent outline-none border-none dark:text-white text-gray-700"
                            >
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
                                placeholder="1" 
                                required
                            />
                            Days
                        </label>
                    </div>
                    <div className="p-1 flex justify-center mt-2">
                        <button 
                            type="submit" 
                            className="btn bg-amber-500 w-1/2 text-white text-base border border-amber-500 hover:bg-amber-600"
                            disabled={isLoading || possibleUnlockAmount > vaultData.amount}
                        >
                            {isLoading ? (<span className="loading loading-ring loading-xs"></span>) : 'SET'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}