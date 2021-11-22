import React, {useEffect, useState} from 'react';
import Pagination from "./components/Pagination";
import axios from "axios";
interface IAirline{
    id:number
    name:string
    country:string
    logo:string
    slogan:string
    head_quaters: string
    website: string
    established: string
}
interface IPassenger{
    _id: string
    name: string
    trips: number
    airline: IAirline
    __v: number
}
interface IResponse{
    totalPassengers: number
    totalPages: number
    data: Array<IPassenger>
}
function App() {
    const [page, setPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [items, setItems] = useState<IPassenger[]>([]);

    const handlePageChange = (currentPage:number):void => {
        setPage(currentPage);
    }

    useEffect(() => {
        const fetch = async () => {
            const params = { page, size: 10};
            const { data: { totalPages, data }} = await axios.get<IResponse>('https://api.instantwebtools.net/v1/passenger', { params });
            setTotalPages(totalPages);
            setItems(data);
        }
        fetch();
    }, [page])

    return (
        <div>
          <ul>
              {
                  items.map(item => (
                      <li key={item._id}>{item.name}</li>
                  ))
              }
          </ul>
            <Pagination count={totalPages} page={page} onPageChange={handlePageChange}/>
        </div>
    );
}

export default App;
