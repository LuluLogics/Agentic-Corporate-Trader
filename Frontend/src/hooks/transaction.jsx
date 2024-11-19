import { useState } from 'react';
import axios from 'axios';

export const useTransaction = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const transaction = async (user, payload) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(`https://act-production-5e24.up.railway.app/api/transaction`, {
                userId: user.id,
                ...payload,
            });

            setIsLoading(false);
            return response.data; // Success response
        } catch (err) {
            setIsLoading(false);
            setError(err.response?.data?.error || 'Transaction failed');
            throw err;
        }
    };

    return { transaction, error, isLoading };
};
