import { Plus } from "lucide-react";
import post from './post'

export default function CreatePost() {
  return <>
    <div style={{position: 'fixed', bottom: '1em', left: 'calc(50% - 2.5em)'}}>
      <div style={{ padding: '0.5em', width: '5em', height: '5em', borderRadius: '50%', backgroundColor: 'white', boxShadow: '0.25em 0.25em 0.5em rgba(0, 0, 0, 30% )' }}>
        <Plus size={'4em'} color="#959595" />
      </div>
    </div>
  </>
}