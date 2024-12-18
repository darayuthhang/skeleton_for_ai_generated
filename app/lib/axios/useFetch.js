import axios from '@/app/lib/axios/Axios';
import useSWR from 'swr';
const fetcher = url => axios.get(url).then(res => res.data)

const useFetch = (url) => {

    const { data, error, isLoading } = useSWR(url, fetcher)

    return {
        data: data,
        isLoading,
        isError: error
    }
}
export default useFetch;
