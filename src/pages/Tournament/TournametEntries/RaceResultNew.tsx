import Header from "@/components/Header";
import { useParams } from "react-router-dom";

export default function RaceResultNew() {
    const {entry_id} = useParams();
    
    return(
        <>
          <Header/>

          <div>
            <form></form>
          </div>
        </>
    )
}