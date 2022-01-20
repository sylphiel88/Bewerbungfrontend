import axios from "axios";
import React, { useState, useEffect } from "react";
function ChangeBw(props) {
    const [id, setId] = useState(props.id)
    const [bw, setBw] = useState({})

    useEffect(() => {
        setId(props.id)
    })

    useEffect(async () => {
        if (id != "") {
            await axios.post(
                'http://localhost:5000/api/v1/bewerbungen/getId',
                { id: id },
                { header: { contentType: "application/json" } }
            )
                .then(res => setBw(res.data.bw))
        }
    }, [id])

    useEffect(async() => {
        if (bw.hasOwnProperty('_id')) {
            const copy = { ...bw }
            delete copy['_id']
            setBw({
                ...copy
            })
        }
        if (bw!={}){
        await axios.post(
            'http://localhost:5000/api/v1/bewerbungen/update',
            {bw:bw,id:id},
            {header: { contentType:"application/json"}}
        )
        props.handler()
        }
    }, [bw])

    async function changeAnmerkungen(e) {
        setBw(prevState => ({
            ...prevState,
            anmerkungen: e.target.value
        })
        )
    }

    async function changeBeworben(e) {
        setBw(prevState => ({
            ...prevState,
            beworben: e.target.checked
        })
        )
    }

    async function changeStatus(e) {
        setBw(prevState => ({
            ...prevState,
            status: e.target.value
        })
        )
    }

    function makeOptions(x){
        const bool = x==bw.status
        return(
            bool?<option value={x} selected>{x}</option>:<option value={x}>{x}</option>
        )
    }

    return (
        <div>
            {
                bw != {} &&
                <div>
                    <p>{bw.compName}<br />{bw.compStreet}<br />{bw.compTown}</p>
                    Anmerkungen:
                    <textarea value={bw.anmerkungen} onChange={changeAnmerkungen}></textarea>
                    <input type="checkbox" checked={bw.beworben} onChange={changeBeworben}></input>
                    Status:
                    <select id="status" onChange={changeStatus}>
                        {['offen','beworben','Absage','Bewerbungsgespräch','Zusage'].map(makeOptions)}
                    </select>
                </div>
            }
        </div>
    )
}

export default ChangeBw